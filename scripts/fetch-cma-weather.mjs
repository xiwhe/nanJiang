import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { setDefaultResultOrder } from "node:dns";

// GitHub 托管 runner 上 IPv6 不可出站，而 Node 18+ 默认 DNS 顺序为 verbatim（优先 AAAA），
// 会导致 fetch 直接失败且拿不到任何 HTTP 状态码。强制优先 IPv4。
setDefaultResultOrder("ipv4first");

const stationIds = ["51463", "Y9199", "51804", "51811", "51377"];
const outputPath = resolve("data/cma-weather.json");
const requestTimeout = 20000;
const maxAttempts = 3;

async function loadExisting() {
  try {
    const existing = JSON.parse(await readFile(outputPath, "utf8"));
    return { generatedAt: existing.generatedAt ?? null, stations: existing.stations ?? {} };
  } catch {
    return { generatedAt: null, stations: {} };
  }
}

function describeError(error) {
  const cause = error.cause ? ` [${error.cause.code || error.cause.message || error.cause}]` : "";
  return `${error.message}${cause}`;
}

async function fetchStation(stationId) {
  const url = `https://weather.cma.cn/api/weather/view?stationid=${stationId}`;
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          Referer: `https://weather.cma.cn/web/weather/${stationId}.html`,
          "User-Agent": "Mozilla/5.0 GitHub-Actions-CMA-Weather-Sync"
        },
        signal: AbortSignal.timeout(requestTimeout)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.code !== 0 || !Array.isArray(result.data?.daily) || !result.data.daily.length) {
        throw new Error(result.msg || "预报数据不可用");
      }
      return result.data.daily;
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        const delay = attempt * 2000;
        console.warn(`气象站 ${stationId} 第 ${attempt} 次失败（${describeError(error)}），${delay}ms 后重试`);
        await new Promise(resolveTimer => setTimeout(resolveTimer, delay));
      }
    }
  }
  throw new Error(describeError(lastError));
}

// CMA 只发布 7 天预报，窗口逐日滑动。若每次整体替换，已过去的行程日期会永久变成“尚未发布”，
// 因此按 date 归并：同日期用新值覆盖（越临近越准），窗口外的历史日期保留。
// 保留窗口用于给长期运行的定时任务兜底，避免文件无限增长；30 天足以覆盖整个行程。
const retentionDays = 30;

function retentionCutoff() {
  // date 形如 2026/09/02，为零填充格式，可直接按字典序比较。按北京时间（UTC+8）取当天日期。
  const shifted = new Date(Date.now() + 8 * 3600000 - retentionDays * 86400000);
  return shifted.toISOString().slice(0, 10).replaceAll("-", "/");
}

function mergeForecasts(previous, next) {
  const cutoff = retentionCutoff();
  const byDate = new Map();
  for (const item of Array.isArray(previous) ? previous : []) {
    if (item?.date && item.date >= cutoff) byDate.set(item.date, item);
  }
  for (const item of next) {
    if (item?.date) byDate.set(item.date, item);
  }
  return [...byDate.values()].sort((left, right) => left.date.localeCompare(right.date));
}

const { generatedAt: previousGeneratedAt, stations } = await loadExisting();
const failures = [];
let updated = 0;

for (const stationId of stationIds) {
  try {
    const daily = await fetchStation(stationId);
    stations[stationId] = mergeForecasts(stations[stationId], daily);
    updated++;
    console.log(`已同步气象站 ${stationId}（本次 ${daily.length} 天，合并后 ${stations[stationId].length} 天）`);
  } catch (error) {
    failures.push(`${stationId}: ${error.message}`);
    console.error(`气象站 ${stationId} 同步失败: ${describeError(error)}`);
  }
}

// 只有本次确实更新过站点才刷新 generatedAt，否则沿用上一次，避免时间戳与陈旧数据不符。
const generatedAt = updated > 0 ? new Date().toISOString() : previousGeneratedAt;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({
  generatedAt,
  source: "https://weather.cma.cn/",
  stations
}, null, 2)}\n`);

console.log(`本次更新 ${updated}/${stationIds.length} 个气象站，当前共 ${Object.keys(stations).length} 个站点有数据`);

// 天气同步失败不应阻断静态站点部署：失败的站点沿用上一次成功数据。
if (failures.length) {
  for (const failure of failures) {
    console.warn(`::warning::气象站同步失败，沿用上次数据：${failure}`);
  }
}
if (Object.keys(stations).length === 0) {
  console.warn("::warning::当前没有任何气象站数据，页面的中国气象局天气预报将显示“尚未发布”");
}

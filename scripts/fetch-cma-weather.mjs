import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const stationIds = ["51463", "Y9199", "51804", "51811", "51377"];
const outputPath = resolve("data/cma-weather.json");

async function loadExistingStations() {
  try {
    const existing = JSON.parse(await readFile(outputPath, "utf8"));
    return existing.stations ?? {};
  } catch {
    return {};
  }
}

async function fetchStation(stationId) {
  const response = await fetch(`https://weather.cma.cn/api/weather/view?stationid=${stationId}`, {
    headers: {
      Accept: "application/json",
      Referer: `https://weather.cma.cn/web/weather/${stationId}.html`,
      "User-Agent": "Mozilla/5.0 GitHub-Actions-CMA-Weather-Sync"
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const result = await response.json();
  if (result.code !== 0 || !Array.isArray(result.data?.daily)) {
    throw new Error(result.msg || "预报数据不可用");
  }
  return result.data.daily;
}

const stations = await loadExistingStations();
const failures = [];

for (const stationId of stationIds) {
  try {
    stations[stationId] = await fetchStation(stationId);
    console.log(`已同步气象站 ${stationId}`);
  } catch (error) {
    failures.push(`${stationId}: ${error.message}`);
    console.error(`气象站 ${stationId} 同步失败: ${error.message}`);
  }
}

if (failures.length) {
  throw new Error(`天气同步不完整，保留上一次部署：${failures.join("; ")}`);
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  source: "https://weather.cma.cn/",
  stations
}, null, 2)}\n`);
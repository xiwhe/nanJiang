# 旅行攻略静态站点

这是一个可部署到 GitHub Pages 的旅行攻略站点，包含每日行程、交互地图、天气预报、共享账单和消费结算。

## 结构

- `index.html`：攻略入口页。
- `南疆10日游攻略.html`：当前旅行的页面文案、版式与行程详情。
- `data/nanjiang-trip.mjs`：当前旅行的运行配置，是迁移到新目的地时优先修改的文件。
- `data/cma-weather.json`：由工作流生成和缓存的中国气象局预报数据。
- `scripts/fetch-cma-weather.mjs`：读取旅行配置中的气象站 ID 并更新天气缓存。
- `.github/workflows/deploy-pages.yml`：同步天气并部署 GitHub Pages。

## 新建一份旅行攻略

1. 复制 `南疆10日游攻略.html`，改为新旅行的页面名；入口页新增链接。
2. 复制 `data/nanjiang-trip.mjs`，例如命名为 `data/kyoto-trip.mjs`，并在新页面的模块脚本中改 `import` 路径。
3. 在新配置中更新 `id`、`name`、日期、地图地点、POI 别名、每日路线和天气站点。
4. 修改新页面中的英雄区、概览、行前准备、每日行程、伴手礼及参考来源文案。
5. 按需要调整 `expenses`：付款人、固定支出、每日分类，以及 Supabase 的旅行 ID 和缓存键。
6. 运行 `node scripts/validate-trip-config.mjs`；GitHub Pages 工作流也会在部署前自动执行该检查。
7. 用本地 HTTP 服务或 GitHub Pages 打开页面测试。模块脚本不能稳定地通过双击 `file://` 页面运行。

## 配置约定

`data/*-trip.mjs` 中的地图坐标使用 `[纬度, 经度]`；只有已使用 GCJ-02 坐标的数据才填写 `mapCoords`，格式为 `[经度, 纬度]`。

天气配置的 `locations` 与日期数组顺序必须一致，一天对应一个天气地点。`cmaStation` 是中国气象局站点 ID；天气同步脚本会自动去重后抓取这些站点。

账单的 `id`、`storageKey`、地图与天气缓存键应在每次旅行中使用新的唯一值，避免浏览器复用旧旅行数据。

## Supabase

共享账单使用 `expenses` 表，以 `(trip_id, day, category)` 为唯一键。新旅行可以复用同一张表，但配置中的 `id` 必须不同。页面前端只能使用 Supabase 的 `publishable`/`anon` key，不能放入 `service_role` 或 secret key。

多人同时编辑时，不同消费类别独立写入；同时编辑同一类别时，以最后一次成功写入为准。

## 部署

推送到 GitHub 后，工作流会使用 Node 22 运行天气同步脚本并部署到 GitHub Pages。首次部署或天气服务暂时不可用时，页面仍会保留已有缓存，并显示可用的 Open-Meteo 预报。
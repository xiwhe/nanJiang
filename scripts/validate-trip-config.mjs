import tripConfig from "../data/nanjiang-trip.mjs";

const errors = [];
const { dates, map, weather, expenses } = tripConfig;
const dayCount = dates.display.length;

if (!tripConfig.id) errors.push("缺少 tripConfig.id");
if (dates.iso.length !== dayCount) errors.push("dates.display 与 dates.iso 的天数不一致");
if (weather.locations.length !== dayCount) errors.push("weather.locations 必须与行程天数一一对应");

weather.locations.forEach((location, index) => {
  if (!location.placeKey || !map.places[location.placeKey]) {
    errors.push(`第 ${index + 1} 天天气地点的 placeKey 无法在 map.places 中找到`);
  }
  if (!location.cmaStation) errors.push(`第 ${index + 1} 天缺少 cmaStation`);
});

const routeDays = new Set();
map.dayRoutes.forEach(route => {
  if (!Number.isInteger(route.day) || route.day < 1 || route.day > dayCount) {
    errors.push(`路线 ${route.label || "未命名"} 的 day 必须在 1 到 ${dayCount} 之间`);
  }
  if (routeDays.has(route.day)) errors.push(`第 ${route.day} 天存在重复路线配置`);
  routeDays.add(route.day);
  [...(route.points || []), ...(route.pathPoints || []), ...(route.roadPoints || [])].forEach(placeKey => {
    if (!map.places[placeKey]) errors.push(`第 ${route.day} 天路线引用了不存在的地点：${placeKey}`);
  });
});

const payerKeys = new Set(expenses.payers.map(payer => payer.key));
expenses.fixedExpenses.forEach(expense => {
  if (!payerKeys.has(expense.payer)) errors.push(`固定支出“${expense.label}”引用了不存在的付款人`);
  if (!Number.isFinite(expense.amount) || expense.amount < 0) errors.push(`固定支出“${expense.label}”金额必须为非负数`);
});

if (errors.length) {
  console.error("旅行配置校验失败：");
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`旅行配置校验通过：${tripConfig.name}，${dayCount} 天，${map.dayRoutes.length} 条路线，${new Set(weather.locations.map(location => location.cmaStation)).size} 个气象站。`);
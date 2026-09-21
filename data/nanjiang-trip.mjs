const tripConfig = {
  id: "nanjiang-2026",
  name: "南疆10日游",
  dates: {
    display: ["9月4日 · 周五", "9月5日 · 周六", "9月6日 · 周日", "9月7日 · 周一", "9月8日 · 周二", "9月9日 · 周三", "9月10日 · 周四", "9月11日 · 周五", "9月12日 · 周六", "9月13日 · 周日"],
    iso: ["2026-09-04", "2026-09-05", "2026-09-06", "2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11", "2026-09-12", "2026-09-13"]
  },
  map: {
    amap: {
      key: "a7ea08f9c789238fc59421b63888c867",
      securityCode: "77cc4034d7ce04b90e04b95264ae047d"
    },
    cacheKeys: {
      poiStatus: "nanjiang-poi-status-v1",
      roadPaths: "nanjiang-road-paths-v2"
    },
    places: {
      urumqi: { name: "乌鲁木齐", coords: [43.8256, 87.6168], note: "9月4日、11日至13日住宿或停留" },
      hangzhouAirport: { name: "杭州萧山国际机场", coords: [30.236, 120.434], note: "GJ8967 出发、GS7517 抵达" },
      urumqiAirport: { name: "乌鲁木齐机场", coords: [43.9071, 87.4742], note: "GJ8967、CZ6805、CA9656、GS7517 衔接" },
      urumqiAirportHotel: { name: "如家酒店·neo（乌鲁木齐天山国际机场店）", coords: [43.932216, 87.531168], mapCoords: [87.531168, 43.932216], note: "9月4日住宿；北京北路3366号" },
      kashgar: { name: "喀什", coords: [39.4704, 75.9898], note: "9月5日、9日至11日住宿或停留" },
      kashgarOldTownHotel: { name: "宜必思·尚品酒店（喀什古城景区店）", coords: [39.473521, 75.994331], mapCoords: [75.994331, 39.473521], note: "9月5日住宿；欧尔达希克路3号" },
      kashgarMuseum: { name: "喀什地区博物馆", coords: [39.486, 76.047], note: "9月5日下午参观，需确认预约与开放时间" },
      oldTown: { name: "喀什古城", coords: [39.4747, 75.9941], note: "9月5日与11日步行游览" },
      idKah: { name: "艾提尕尔广场", coords: [39.472403, 75.985595], note: "9月5日可选景点" },
      idKahMosque: { name: "艾提尕尔清真寺", coords: [39.4720, 75.9851], note: "9月5日按现场要求决定是否入内" },
      highPlatform: { name: "高台民居", coords: [39.470237, 76.00043], note: "9月5日可选，开放状态需复核" },
      oytagh: { name: "奥依塔克红山谷", coords: [39.101, 75.558], note: "9月6日安全短停" },
      baisha: { name: "白沙湖", coords: [38.650, 75.044], note: "9月6日主要停靠点" },
      karakul: { name: "喀拉库勒湖", coords: [38.438, 75.057], note: "9月6日主要停靠点" },
      glacier: { name: "慕士塔格冰川公园", coords: [38.277, 75.106], note: "9月7日高海拔活动" },
      taghman: { name: "塔合曼湿地", coords: [37.950, 75.354], note: "9月7日天气不佳时的备选景点" },
      tashkurgan: { name: "塔县", coords: [37.773, 75.229], note: "9月6日至8日住宿，9月9日返程" },
      tashkurganHotel: { name: "云竟酒店（塔县奇石广场店）", coords: [37.780451, 75.226952], mapCoords: [75.226952, 37.780451], note: "9月6日至8日住宿；红其拉甫路" },
      bandir: { name: "班迪尔蓝湖", coords: [37.808, 75.374], note: "9月8日从塔县往返" },
      stoneCity: { name: "石头城遗址", coords: [37.786391, 75.234484], note: "9月8日傍晚游览" },
      goldenGrassland: { name: "金草滩湿地", coords: [37.786391, 75.234484], note: "9月8日与石头城连游" },
      shache: { name: "莎车", coords: [38.414, 77.240], note: "9月10日火车一日游" },
      tomb: { name: "叶尔羌汗国王陵", coords: [38.416, 77.246], note: "9月10日人文主景点" },
      shacheOldTown: { name: "莎车老城", coords: [38.414, 77.240], note: "9月10日可选街区" },
      heritagePark: { name: "莎车县非物质文化遗产博览园", coords: [38.414, 77.240], note: "9月10日按开放与演出场次选择" },
      xinjiangMuseum: { name: "新疆维吾尔自治区博物馆", coords: [43.817, 87.581], note: "9月12日天气不佳时的市区备选" },
      grandBazaar: { name: "新疆国际大巴扎", coords: [43.776, 87.617], note: "9月12日天气不佳时的市区备选" },
      tianchi: { name: "天山天池景区", coords: [43.884, 88.128], note: "9月12日一日游主景点" },
      kashgarAirport: { name: "喀什机场", coords: [39.543, 76.020], note: "9月5日抵达、9月11日返乌鲁木齐" }
    },
    poiSearchAliases: {
      kashgarMuseum: ["喀什地区博物馆", "喀什博物馆"],
      taghman: ["塔合曼湿地公园", "塔合曼湿地"],
      bandir: ["班迪尔蓝湖", "下坂地水库"],
      stoneCity: ["塔什库尔干石头城", "石头城下金草滩"],
      goldenGrassland: ["金草滩湿地", "石头城下金草滩"],
      shacheOldTown: ["莎车老城", "老城景区喀赞其街"],
      heritagePark: ["莎车县非物质文化遗产博览园", "莎车非遗博览园"],
      xinjiangMuseum: ["新疆维吾尔自治区博物馆", "新疆博物馆"],
      grandBazaar: ["新疆国际大巴扎", "新疆大巴扎"],
      tianchi: ["天山天池风景区", "新疆天山天池"]
    },
    dayRoutes: [
      { day: 1, color: "#b6412f", label: "GJ8967 杭州 → 乌鲁木齐", road: false, transport: "flight", points: ["hangzhouAirport", "urumqiAirport", "urumqiAirportHotel"] },
      { day: 2, color: "#c99132", label: "CZ6805 + 喀什取车自驾", road: false, transport: "flight", points: ["urumqiAirportHotel", "urumqiAirport", "kashgarAirport", "kashgarOldTownHotel", "kashgarMuseum", "oldTown", "idKah", "highPlatform"], pathPoints: ["urumqiAirport", "kashgarAirport"], roadPoints: ["kashgarAirport", "kashgarOldTownHotel", "kashgarMuseum", "oldTown", "idKah", "highPlatform"] },
      { day: 3, color: "#246c84", label: "喀什 → 塔县", road: true, points: ["kashgarOldTownHotel", "oytagh", "baisha", "karakul", "tashkurganHotel"] },
      { day: 4, color: "#315c4c", label: "冰川往返", road: true, points: ["tashkurganHotel", "glacier", "tashkurganHotel"] },
      { day: 5, color: "#8b4f72", label: "蓝湖 + 石头城金草滩", road: true, points: ["tashkurganHotel", "bandir", "tashkurganHotel", "stoneCity", "tashkurganHotel"] },
      { day: 6, color: "#5d6f94", label: "塔县 → 喀什", road: true, points: ["tashkurganHotel", "karakul", "baisha", "oytagh", "kashgar"] },
      { day: 7, color: "#795548", label: "喀什 ⇄ 莎车（火车）", road: false, transport: "train", points: ["kashgar", "shache", "tomb", "shache", "kashgar"] },
      { day: 8, color: "#a45a3a", label: "CA9656 喀什 → 乌鲁木齐", road: false, transport: "flight", points: ["oldTown", "kashgarAirport", "urumqiAirport", "urumqi"] },
      { day: 9, color: "#46756a", label: "天池旅行团大巴往返", road: false, transport: "tour", points: ["urumqi", "tianchi", "urumqi"] },
      { day: 10, color: "#6f6657", label: "GS7517 08:10 → 14:50", road: false, transport: "flight", points: ["urumqi", "urumqiAirport", "hangzhouAirport"] }
    ]
  },
  weather: {
    cmaDataPath: "./data/cma-weather.json",
    cacheKeys: { openMeteo: "nanjiang-weather-forecast-v2", cma: "nanjiang-cma-weather-forecast-v1" },
    locations: [
      { key: "urumqi", name: "乌鲁木齐", placeKey: "urumqi", cmaStation: "51463", cmaName: "乌鲁木齐站" },
      { key: "kashgar", name: "喀什", placeKey: "kashgar", cmaStation: "Y9199", cmaName: "喀什站" },
      { key: "tashkurgan", name: "塔县", placeKey: "tashkurgan", cmaStation: "51804", cmaName: "塔什库尔干站" },
      { key: "glacier", name: "慕士塔格冰川", placeKey: "glacier", elevation: 4500, cmaStation: "51804", cmaName: "邻近塔什库尔干站" },
      { key: "tashkurgan", name: "塔县", placeKey: "tashkurgan", cmaStation: "51804", cmaName: "塔什库尔干站" },
      { key: "kashgar", name: "喀什", placeKey: "kashgar", cmaStation: "Y9199", cmaName: "喀什站" },
      { key: "shache", name: "莎车", placeKey: "shache", cmaStation: "51811", cmaName: "莎车站" },
      { key: "urumqi", name: "乌鲁木齐", placeKey: "urumqi", cmaStation: "51463", cmaName: "乌鲁木齐站" },
      { key: "tianchi", name: "天山天池", placeKey: "tianchi", cmaStation: "51377", cmaName: "邻近阜康站" },
      { key: "urumqi", name: "乌鲁木齐", placeKey: "urumqi", cmaStation: "51463", cmaName: "乌鲁木齐站" }
    ]
  },
  expenses: {
    storageKey: "nanjiang-daily-expenses-v1",
    supabase: {
      url: "https://thqqaqvvbinnzvzlavoo.supabase.co",
      publishableKey: "sb_publishable_c5V0Z9ZtZ65aZAXhTAmYXA_fi7n17Nb",
      channel: "nanjiang-expenses"
    },
    payers: [
      { key: "", label: "选择付款人" },
      { key: "personA", label: "XW" },
      { key: "personB", label: "MW" }
    ],
    fixedExpenses: [{ label: "租车", amount: 864, payer: "personB" }],
    baseCategories: [
      { key: "stay", label: "住宿" },
      { key: "breakfast", label: "早餐" },
      { key: "lunch", label: "午餐" },
      { key: "dinner", label: "晚餐" },
      { key: "lateSnack", label: "夜宵" },
      { key: "fuel", label: "油费/交通费" },
      { key: "other", label: "其他支出" }
    ],
    ticketCategories: {
      2: [{ key: "ticketIdKahMosque", label: "艾提尕尔清真寺门票（参考30/人）" }],
      3: [{ key: "ticketBaisha", label: "白沙湖南岸门票（参考40/人）" }, { key: "ticketKarakul", label: "喀拉库勒湖门票（参考45/人）" }],
      4: [{ key: "ticketGlacier", label: "慕士塔格冰川门票+区间车" }],
      5: [{ key: "ticketStoneCity", label: "石头城+金草滩联票（参考80/人）" }],
      7: [{ key: "ticketTomb", label: "叶尔羌汗国王陵门票（如收费）" }, { key: "ticketHeritagePark", label: "非遗博览园/演出门票（如收费）" }],
      9: [{ key: "ticketTianchi", label: "天池门票+区间车（团费未含时）" }]
    }
  }
};

export default tripConfig;
/* Sortable / filterable catalog of self-improving Physical AI systems.
   Renders into #catalog (table), #filters (buttons), #count. Needs #q (search).
   Metadata is best-effort; unlinked rows fall back to a web search. */
(function () {
  var DOMAINS = [
    { k: "cap",      label: "Code-as-policy",    color: "#3b82f6" },
    { k: "vla",      label: "VLA (foil)",        color: "#0ea5a2" },
    { k: "reward",   label: "Reward/curriculum", color: "#e0871e" },
    { k: "skill",    label: "Skill libraries",   color: "#8b5cf6" },
    { k: "transfer", label: "Transfer",          color: "#db2777" },
    { k: "bench",    label: "Benchmarks",        color: "#22a06b" }
  ];
  var DMAP = {}; DOMAINS.forEach(function (d) { DMAP[d.k] = d; });

  // mech: F = execution/feedback substrate · S = search operator · M = memory / skill library
  //  (VLAs and benchmarks have no code-agent loop → blank → "—")
  var DATA = [
    // §3.1 code-as-policy for robots
    ["Code-as-Policies", "cap", "F", 2023, "real+sim tabletop", "2209.07753"],
    ["ProgPrompt", "cap", "", 2023, "VirtualHome·real", "2209.11302"],
    ["VoxPoser", "cap", "F", 2023, "real Franka·sim", "2307.05973"],
    ["RoboCodeX", "cap", "F", 2024, "RLBench·real", "2402.16117"],
    ["Instruct2Act", "cap", "", 2023, "VIMA-Bench", "2305.11176"],
    ["RoboPro", "cap", "F", 2025, "sim manipulation", "2501.04268"],
    ["RoboCoder", "cap", "FM", 2024, "sim tasks", "2406.03757"],
    ["CaP-X", "cap", "F", 2026, "MuJoCo Playground", "2603.22435"],
    ["RoboClaw", "cap", "F", 2026, "long-horizon", "2603.11558"],
    ["ASPIRE", "cap", "FSM", 2026, "LIBERO·Robosuite·BEHAVIOR-1K", "2607.00272"],
    ["ENPIRE", "cap", "FM", 2026, "real robot", null],
    // §3.2 end-to-end VLA / generalist policies (the foil)
    ["RT-1", "vla", "", 2022, "real kitchen", "2212.06817"],
    ["RT-2", "vla", "", 2023, "real manipulation", "2307.15818"],
    ["Octo", "vla", "", 2024, "Open X-Embodiment", "2405.12213"],
    ["OpenVLA", "vla", "", 2024, "Open X-Embodiment", "2406.09246"],
    ["RoboFlamingo", "vla", "", 2024, "CALVIN", "2311.01378"],
    ["CogACT", "vla", "", 2024, "real+sim", "2411.19650"],
    ["SpatialVLA", "vla", "", 2025, "1.1M real episodes", "2501.15830"],
    ["π0", "vla", "", 2025, "real dexterous", "2410.24164"],
    ["π0.5", "vla", "", 2025, "open-world homes", "2504.16054"],
    ["GR00T N1", "vla", "", 2025, "humanoid", "2503.14734"],
    ["Gemini Robotics", "vla", "", 2025, "real world", "2503.20020"],
    // §3.3 rewards / curricula / sim
    ["Eureka", "reward", "S", 2024, "Isaac Gym (29 tasks)", "2310.12931"],
    ["DrEureka", "reward", "S", 2024, "sim2real Go1", "2406.01967"],
    ["Text2Reward", "reward", "F", 2024, "ManiSkill·Meta-World", "2309.11489"],
    ["Language-to-Rewards", "reward", "F", 2023, "locomotion·manip", "2306.08647"],
    ["Eurekaverse", "reward", "S", 2024, "parkour curriculum", "2411.01775"],
    ["RoboGen", "reward", "", 2024, "generative tasks", "2311.01455"],
    ["Auto MC-Reward", "reward", "S", 2024, "Minecraft", "2312.09238"],
    // §3.4 robot skill libraries & lifelong
    ["Voyager", "skill", "FM", 2023, "Minecraft", "2305.16291"],
    ["LOTUS", "skill", "M", 2023, "LIBERO lifelong", "2311.02058"],
    ["LRLL", "skill", "M", 2024, "manipulation library", "2406.18746"],
    ["BOSS", "skill", "M", 2023, "ALFRED·kitchen", "2310.10021"],
    ["SPRINT", "skill", "M", 2023, "ALFRED", "2306.11886"],
    ["Uni-Skill", "skill", "M", 2026, "manipulation", "2603.02623"],
    ["SkillFlow", "skill", "M", 2026, "lifelong agents", "2604.17308"],
    // §3.5 sim-to-real & cross-embodiment transfer
    ["Open X-Embodiment", "transfer", "", 2024, "22 embodiments", "2310.08864"],
    ["CrossFormer", "transfer", "", 2024, "20 embodiments", "2408.11812"],
    ["RoboCat", "transfer", "FM", 2024, "self-improving", "2306.11706"],
    ["Mirage", "transfer", "", 2024, "zero-shot transfer", "2402.19249"],
    // §3.6 embodied benchmarks & simulators
    ["LIBERO", "bench", "", 2023, "130 lifelong tasks", "2306.03310"],
    ["Robosuite", "bench", "", 2020, "contact-rich sim", "2009.12293"],
    ["BEHAVIOR-1K", "bench", "", 2024, "1,000 activities", null],
    ["Meta-World", "bench", "", 2020, "50 tasks", "1910.10897"],
    ["RLBench", "bench", "", 2020, "100 tasks", "1909.12271"],
    ["ManiSkill2", "bench", "", 2023, "generalizable", "2302.04659"],
    ["CALVIN", "bench", "", 2022, "long-horizon lang", "2112.03227"]
  ].map(function (r) {
    return { name: r[0], dom: r[1], mech: r[2], year: r[3], bench: r[4], url: r[5] };
  });

  var MECH = { F: "feedback substrate", S: "search operator", M: "memory / skill library" };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function href(row) {
    if (!row.url) return "https://www.google.com/search?q=" + encodeURIComponent(row.name + " robot arxiv");
    if (/^https?:/.test(row.url)) return row.url;
    return "https://arxiv.org/abs/" + row.url;
  }

  var state = { filter: "all", q: "", key: "dom", dir: 1 };

  var fbox = document.getElementById("filters");
  if (fbox) {
    var html = '<button class="fbtn" data-f="all" aria-pressed="true">All <b style="margin-left:4px">' + DATA.length + "</b></button>";
    DOMAINS.forEach(function (d) {
      var n = DATA.filter(function (r) { return r.dom === d.k; }).length;
      html += '<button class="fbtn" data-f="' + d.k + '"><i style="background:' + d.color + '"></i>' + d.label + " " + n + "</button>";
    });
    fbox.innerHTML = html;
    fbox.addEventListener("click", function (e) {
      var b = e.target.closest(".fbtn"); if (!b) return;
      state.filter = b.getAttribute("data-f");
      Array.prototype.forEach.call(fbox.querySelectorAll(".fbtn"), function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      render();
    });
  }

  var q = document.getElementById("q");
  if (q) q.addEventListener("input", function () { state.q = q.value.toLowerCase(); render(); });

  function sortBy(key) {
    if (state.key === key) state.dir *= -1; else { state.key = key; state.dir = 1; }
    render();
  }

  function render() {
    var rows = DATA.filter(function (r) {
      if (state.filter !== "all" && r.dom !== state.filter) return false;
      if (state.q && (r.name + " " + r.bench + " " + DMAP[r.dom].label).toLowerCase().indexOf(state.q) < 0) return false;
      return true;
    });
    rows.sort(function (a, b) {
      var av, bv;
      if (state.key === "name") { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
      else if (state.key === "year") { av = a.year; bv = b.year; }
      else { av = DMAP[a.dom].label + a.name; bv = DMAP[b.dom].label + b.name; }
      return (av < bv ? -1 : av > bv ? 1 : 0) * state.dir;
    });

    var caret = function (k) { return state.key === k ? (state.dir > 0 ? " ▲" : " ▼") : " ↕"; };
    var thead = "<thead><tr>"
      + '<th class="sortable" data-k="name">System<span class="caret">' + caret("name") + "</span></th>"
      + '<th class="sortable" data-k="dom">Domain<span class="caret">' + caret("dom") + "</span></th>"
      + "<th>Mechanism</th>"
      + '<th class="sortable" data-k="year">Year<span class="caret">' + caret("year") + "</span></th>"
      + "<th>Benchmark / note</th></tr></thead>";

    var tb = "<tbody>";
    rows.forEach(function (r) {
      var d = DMAP[r.dom];
      var mech = r.mech ? r.mech.split("").map(function (m) {
        return '<span class="mtag ' + m + '" title="' + MECH[m] + '">' + m + "</span>";
      }).join("") : '<span class="none">—</span>';
      tb += "<tr>"
        + '<td class="k"><a class="lnk" href="' + href(r) + '" target="_blank" rel="noopener">' + esc(r.name) + (r.mech === "FSM" ? " ★" : "") + "</a></td>"
        + '<td class="sys"><span class="ddot" style="background:' + d.color + '"></span>' + d.label + "</td>"
        + "<td>" + mech + "</td>"
        + '<td class="mono">' + r.year + "</td>"
        + '<td class="sys">' + esc(r.bench) + "</td></tr>";
    });
    tb += "</tbody>";

    var t = document.getElementById("catalog");
    t.innerHTML = thead + tb;
    Array.prototype.forEach.call(t.querySelectorAll("th.sortable"), function (th) {
      th.addEventListener("click", function () { sortBy(th.getAttribute("data-k")); });
    });
    var c = document.getElementById("count");
    if (c) c.textContent = rows.length + " / " + DATA.length + " systems";
  }

  render();
})();

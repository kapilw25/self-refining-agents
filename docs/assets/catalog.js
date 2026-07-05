/* Sortable / filterable catalog of code-generating self-refining agents.
   Renders into #catalog (table), #filters (buttons), #count. Needs #q (search).
   Metadata is best-effort; unlinked rows fall back to a web search. */
(function () {
  var DOMAINS = [
    { k: "sw",        label: "Software eng",      color: "#3b82f6" },
    { k: "robot",     label: "Robotics",          color: "#0ea5a2" },
    { k: "reward",    label: "Reward/curriculum", color: "#e0871e" },
    { k: "discovery", label: "Discovery",         color: "#8b5cf6" },
    { k: "skill",     label: "Skill libraries",   color: "#db2777" },
    { k: "data",      label: "Data science",      color: "#22a06b" }
  ];
  var DMAP = {}; DOMAINS.forEach(function (d) { DMAP[d.k] = d; });

  // mech: F = execution/feedback substrate · S = search operator · M = memory / skill library
  // url: arXiv id, full URL, or null (→ web search fallback)
  var DATA = [
    // software engineering
    ["SWE-agent", "sw", "F", 2024, "SWE-bench", "2405.15793"],
    ["OpenHands", "sw", "FM", 2024, "SWE-bench", "2407.16741"],
    ["AutoCodeRover", "sw", "F", 2024, "SWE-bench Lite", "2404.05427"],
    ["Agentless", "sw", "F", 2024, "SWE-bench Lite", "2407.01489"],
    ["CodeR", "sw", "F", 2024, "SWE-bench", "2406.01304"],
    ["Moatless", "sw", "F", 2024, "SWE-bench", null],
    ["MASAI", "sw", "F", 2024, "SWE-bench Lite", "2406.11638"],
    ["MapCoder", "sw", "FS", 2024, "HumanEval·CodeContests", "2405.11403"],
    ["Self-Debug", "sw", "F", 2023, "MBPP·Spider", "2304.05128"],
    ["Reflexion", "sw", "FM", 2023, "HumanEval·ALFWorld", "2303.11366"],
    ["Self-Refine", "sw", "F", 2023, "code·reasoning", "2303.17651"],
    ["CRITIC", "sw", "F", 2023, "QA·code", "2305.11738"],
    ["RCI", "sw", "F", 2023, "MiniWoB++", "2303.17491"],
    ["LDB", "sw", "F", 2024, "HumanEval·MBPP", "2402.16906"],
    ["LeDex", "sw", "F", 2024, "code repair", "2405.18649"],
    ["CYCLE", "sw", "F", 2024, "code self-refine", null],
    // robotics
    ["Code-as-Policies", "robot", "F", 2022, "real+sim tabletop", "2209.07753"],
    ["ProgPrompt", "robot", "", 2023, "VirtualHome·real", "2209.11302"],
    ["VoxPoser", "robot", "F", 2023, "real Franka·sim", "2307.05973"],
    ["RoboCodeX", "robot", "F", 2024, "RLBench·real", "2402.16117"],
    ["Instruct2Act", "robot", "", 2023, "VIMA-Bench", "2305.11176"],
    ["RoboPro", "robot", "F", 2025, "sim manipulation", "2501.04268"],
    ["RoboCoder", "robot", "FM", 2024, "sim tasks", "2406.03757"],
    ["CaP-X", "robot", "F", 2026, "MuJoCo Playground", "2603.22435"],
    ["RoboClaw", "robot", "F", 2026, "long-horizon", "2603.11558"],
    ["ASPIRE", "robot", "FSM", 2026, "LIBERO·Robosuite·BEHAVIOR-1K", "2607.00272"],
    ["ENPIRE", "robot", "FM", 2026, "real robot", null],
    ["Uni-Skill", "robot", "M", 2026, "manipulation", "2603.02623"],
    // reward / curriculum / env
    ["Eureka", "reward", "S", 2023, "Isaac Gym (29 tasks)", "2310.12931"],
    ["DrEureka", "reward", "S", 2024, "sim2real Go1", "2406.01967"],
    ["Text2Reward", "reward", "F", 2023, "ManiSkill·Meta-World", "2309.11489"],
    ["Language-to-Rewards", "reward", "F", 2023, "locomotion·manip", "2306.08647"],
    ["Eurekaverse", "reward", "S", 2024, "parkour curriculum", "2411.01775"],
    ["RoboGen", "reward", "", 2023, "generative tasks", "2311.01455"],
    ["Auto MC-Reward", "reward", "S", 2023, "Minecraft", "2312.09238"],
    // discovery
    ["FunSearch", "discovery", "SM", 2023, "cap-set·bin-packing", "https://www.nature.com/articles/s41586-023-06924-6"],
    ["AlphaEvolve", "discovery", "SM", 2025, "matrix-mult·kernels", "2506.13131"],
    ["CodeEvolve", "discovery", "S", 2025, "algorithm opt", "2510.14150"],
    ["ShinkaEvolve", "discovery", "S", 2025, "sample-efficient evo", null],
    ["K-Search", "discovery", "S", 2026, "GPU kernels", "2602.19128"],
    ["EvoEngineer", "discovery", "S", 2025, "CUDA kernels", "2510.03760"],
    ["SeaEvo", "discovery", "S", 2026, "algorithm discovery", "2604.24372"],
    // skill libraries
    ["Voyager", "skill", "FM", 2023, "Minecraft", "2305.16291"],
    ["LRLL", "skill", "M", 2024, "manipulation library", "2406.18746"],
    ["SkillFlow", "skill", "M", 2026, "lifelong agents", "2604.17308"],
    ["Generative Agents", "skill", "M", 2023, "sandbox sim", "2304.03442"],
    ["VistaWise", "skill", "M", 2025, "Minecraft (EMNLP)", null],
    // data science / ML engineering
    ["Data Interpreter", "data", "F", 2024, "ML/data tasks", "2402.18679"],
    ["AIDE", "data", "FS", 2025, "MLE-bench·Kaggle", null],
    ["PyBench", "data", "F", 2024, "real coding tasks", "2407.16732"]
  ].map(function (r) {
    return { name: r[0], dom: r[1], mech: r[2], year: r[3], bench: r[4], url: r[5] };
  });

  var MECH = { F: "feedback substrate", S: "search operator", M: "memory / skill library" };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function href(row) {
    if (!row.url) return "https://www.google.com/search?q=" + encodeURIComponent(row.name + " arxiv");
    if (/^https?:/.test(row.url)) return row.url;
    return "https://arxiv.org/abs/" + row.url;
  }

  var state = { filter: "all", q: "", key: "dom", dir: 1 };

  // filter buttons
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

    var caret = function (k) { return state.key === k ? (state.dir > 0 ? " ▲" : " ▼") : ""; };
    var thead = "<thead><tr>"
      + '<th class="sortable" data-k="name"' + (state.key === "name" ? ' aria-sort="x"' : "") + '>System<span class="caret">' + (caret("name") || " ↕") + "</span></th>"
      + '<th class="sortable" data-k="dom"' + (state.key === "dom" ? ' aria-sort="x"' : "") + '>Domain<span class="caret">' + (caret("dom") || " ↕") + "</span></th>"
      + "<th>Mechanism</th>"
      + '<th class="sortable" data-k="year"' + (state.key === "year" ? ' aria-sort="x"' : "") + '>Year<span class="caret">' + (caret("year") || " ↕") + "</span></th>"
      + "<th>Benchmark / task</th></tr></thead>";

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

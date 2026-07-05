/* Renders the capability matrix (#matrix) and related-surveys table (#surveys)
   on the survey page. One exemplar per camp: ASPIRE (code+skills) vs π0 (VLA
   weights) vs Code-as-Policies (code, no learning) vs Eureka (reward+RL). */
(function () {
  var U = {
    aspire: "https://arxiv.org/abs/2607.00272",
    pi0: "https://arxiv.org/abs/2410.24164",
    cap: "https://arxiv.org/abs/2209.07753",
    eureka: "https://arxiv.org/abs/2310.12931"
  };

  var methods = [
    { key: "aspire", name: "🤖 ASPIRE", url: U.aspire, sub: "NVIDIA GEAR · 2026", cite: "0", cnote: "code + skills" },
    { key: "pi0", name: "🧠 π0", url: U.pi0, sub: "Physical Intelligence · 2025", cite: "flagship", cnote: "VLA weights" },
    { key: "cap", name: "📝 Code-as-Policies", url: U.cap, sub: "Google · ICRA 2023", cite: "1,644", cnote: "code, no learning" },
    { key: "eureka", name: "🏆 Eureka", url: U.eureka, sub: "NVIDIA+UPenn · ICLR 2024", cite: "655", cnote: "reward + RL" }
  ];

  // each cell: [status, text]  status: yes | no | warn | na | info
  // Concise: 12 argument rows (info/catalog rows live in the sortable catalog).
  var rows = [
    { lab: "What it outputs", em: "🎯", cells: [["info", "🐍 executable control programs"], ["info", "🎛️ continuous action tokens"], ["info", "🐍 policy code"], ["info", "🎁 reward code → RL policy"]] },
    { lab: "How it learns / improves", em: "🧠", cells: [["yes", "Evolutionary program search + debugging"], ["yes", "Imitation on cross-embodiment data"], ["no", "No learning — one-shot generation"], ["yes", "Reward evolution, then RL"]] },
    { lab: "Gradient training?", em: "📉", cells: [["no", "None — skills are code, not weights"], ["yes", "Yes — end-to-end policy training"], ["no", "None — prompting only"], ["yes", "Yes — reward code trains RL"]] },
    { lab: "Persistent skill library?", em: "📚", cells: [["yes", "Yes — ever-growing reusable library"], ["no", "No — competence baked into weights"], ["no", "None — each task from scratch"], ["no", "None — rewards not stored"]] },
    { lab: "Reuses past experience", em: "🔁", cells: [["yes", "Retrieves prior debugged fixes"], ["no", "Static after training"], ["no", "None across tasks"], ["no", "Restarts search per task"]] },
    { lab: "Failure feedback signal", em: "👀", cells: [["yes", "Per-primitive multimodal traces"], ["no", "None — open-loop at inference"], ["no", "None — open-loop execution"], ["yes", "Reward reflection on RL stats"]] },
    { lab: "Search strategy", em: "🔍", cells: [["yes", "Population of K candidate programs"], ["no", "None — single forward pass"], ["no", "None — one program sampled"], ["yes", "Parallel reward sampling"]] },
    { lab: "Real-robot validation", em: "🔬", cells: [["yes", "Yes — bimanual YAM station"], ["yes", "Yes — extensive real deployment"], ["yes", "Yes — multiple real arms"], ["no", "No — sim only (DrEureka later)"]] },
    { lab: "Continual / open-ended?", em: "➕", cells: [["yes", "Yes — indefinitely compounding"], ["no", "No — static after training"], ["no", "No — one-shot"], ["no", "No — isolated per-task"]] },
    { lab: "Beyond fixed primitive APIs?", em: "🧩", cells: [["no", "No — bounded by primitive set"], ["yes", "Yes — end-to-end motor control"], ["no", "No — given primitives"], ["yes", "Yes — low-level reward shaping"]] },
    { lab: "Interpretable / editable?", em: "🔎", cells: [["yes", "Yes — readable, editable programs"], ["no", "No — black-box weights"], ["yes", "Yes — readable code"], ["warn", "Reward readable; policy opaque"]] },
    { lab: "Signature result", em: "🥇", cells: [["info", "Handover 20% → 92%; sim→real skills"], ["info", "Dexterous real-world laundry folding"], ["info", "LLMs write deployable robot policies"], ["info", "Shadow Hand pen-spinning"]] }
  ];

  var SYM = { yes: "✓", no: "✕", warn: "~", na: "–", info: "" };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var mt = document.getElementById("matrix");
  if (mt) {
    var thead = "<thead><tr><th class='corner'><div class='corner-in'>Dimension</div></th>";
    methods.forEach(function (m) {
      var cls = m.key === "aspire" ? " col-aspire" : "";
      thead += '<th class="' + cls + '"><div class="mhead"><span class="mname"><a href="' + m.url + '" target="_blank" rel="noopener">' + m.name + '</a></span><span class="msub">' + m.sub + '</span><span class="cite"><b>' + m.cite + '</b> · ' + m.cnote + "</span></div></th>";
    });
    thead += "</tr></thead>";
    var tb = "<tbody>";
    rows.forEach(function (r) {
      tb += '<tr><th class="rowlab"><span class="lem">' + r.em + "</span>" + r.lab + "</th>";
      r.cells.forEach(function (c, i) {
        var st = c[0], asp = methods[i].key === "aspire" ? " aspire" : "";
        var sym = SYM[st] ? '<span class="stat">' + SYM[st] + "</span>" : "";
        tb += '<td class="cell s-' + st + asp + '"><div class="cinner">' + sym + "<span>" + esc(c[1]) + "</span></div></td>";
      });
      tb += "</tr>";
    });
    tb += "</tbody>";
    mt.innerHTML = thead + tb;
  }

  var surveys = [
    { n: "🧩 FMs for Manipulation", u: "https://arxiv.org/abs/2404.18201", v: "IJRR 2025 · Li et al.", c: 38, scope: "FMs across 8 manipulation modules", nov: "Auto-driving-like multi-model framework", fut: ["≥99% success", "dexterity", "sim2real", "TAMP"], repo: null, rel: "Frames code-as-policy for robots (§3.1)" },
    { n: "🎮 VLA Systematic Review", u: "https://arxiv.org/abs/2507.10672", v: "arXiv 2025 · systematic review", c: 43, scope: "102 VLA models, 26 datasets, 12 sims", nov: "2-D dataset map: richness × alignment", fut: ["pretraining", "modular", "alignment", "generalist"], repo: null, rel: "Maps the VLA foil (§3.2)" },
    { n: "🌐 FM-Driven Robotics", u: "https://arxiv.org/abs/2507.10087", v: "arXiv 2025 · review", c: 15, scope: "System-level FM strategies, 4 domains", nov: "Integrated system view, not isolated", fut: ["compute", "data", "tactile", "safety", "continual"], repo: null, rel: "Stresses continual + sim2real (§3.5)" },
    { n: "🧭 Unified Manipulation", u: "https://arxiv.org/abs/2510.10903", v: "arXiv 2025 · Bai et al. (18)", c: 30, scope: "Perception/planning/control + benchmarks", nov: "Planning: language/code/motion/affordance/3D", fut: ["robot brain", "data", "multimodal", "safety"], repo: { l: "Awesome-Robotics-Manipulation", u: "https://github.com/BaiShuanghao/Awesome-Robotics-Manipulation" }, rel: "Its code-as-planning axis overlaps §3.1" },
    { n: "🗣️➡️🦾 Lang-Conditioned", u: "https://arxiv.org/abs/2312.10807", v: "arXiv 2023 · Zhou et al.", c: 21, scope: "Language integration: 4 methods × 5 axes", nov: "Language roles: state/policy/planning/VLA", fut: ["generalization", "safety", "debates"], repo: { l: "hk-zh list", u: "https://github.com/hk-zh/language-conditioned-robot-manipulation-models" }, rel: "Instruction grounding for robots" },
    { n: "📦 VLA Datasets & Benchmarks", u: "https://arxiv.org/abs/2604.23001", v: "arXiv 2026 · survey", c: "—", scope: "VLA datasets, benchmarks, data engines", nov: "Data-centric view of the VLA landscape", fut: ["data scale", "standardization", "sim2real"], repo: null, rel: "Maps §3.6 benchmarks for VLAs" },
    { n: "🏭 Robotic FMs for Industry", u: "https://arxiv.org/abs/2603.06749", v: "arXiv 2026 · survey", c: "—", scope: "FMs for industrial robot control", nov: "Readiness-assessment framework", fut: ["deployment", "safety", "reliability"], repo: null, rel: "Physical-AI deployment lens" }
  ];

  var sv = document.getElementById("surveys");
  if (sv) {
    var sh = "<thead><tr><th>📄 Survey</th><th>🏛️ Venue</th><th>📊 Cites</th><th>🎯 Scope</th><th>💡 Novelty</th><th>🔮 Future work</th><th>📂 Repo</th><th>🔗 vs this survey</th></tr></thead><tbody>";
    surveys.forEach(function (s) {
      var repo = s.repo ? '<a class="lnk" href="' + s.repo.u + '" target="_blank" rel="noopener">✅ ' + s.repo.l + "</a>" : '<span class="none">➖ none found</span>';
      sh += '<tr><td class="k"><a class="lnk" href="' + s.u + '" target="_blank" rel="noopener">' + s.n + "</a></td>"
        + '<td class="sys">' + s.v + '</td><td class="hl">' + s.c + "</td><td>" + esc(s.scope) + "</td><td>" + esc(s.nov) + "</td>"
        + '<td><div class="tags">' + s.fut.map(function (t) { return '<span class="pill">' + t + "</span>"; }).join("") + "</div></td>"
        + "<td>" + repo + '</td><td class="sys">' + esc(s.rel) + "</td></tr>";
    });
    sh += "</tbody>";
    sv.innerHTML = sh;
  }
})();

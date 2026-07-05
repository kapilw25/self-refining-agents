/* Renders the capability matrix (#matrix) and related-surveys table (#surveys)
   on the survey page. No-ops gracefully if those elements are absent. */
(function () {
  var U = {
    aspire: "https://arxiv.org/abs/2607.00272",
    cap: "https://arxiv.org/abs/2209.07753",
    vox: "https://arxiv.org/abs/2307.05973",
    eureka: "https://arxiv.org/abs/2310.12931"
  };

  var methods = [
    { key: "aspire", name: "🤖 ASPIRE", url: U.aspire, sub: "NVIDIA GEAR · 2026", cite: "0", cnote: "brand-new" },
    { key: "cap", name: "📝 Code-as-Policies", url: U.cap, sub: "Google · ICRA 2023", cite: "1,644", cnote: "most-cited" },
    { key: "vox", name: "🧊 VoxPoser", url: U.vox, sub: "Stanford · CoRL 2023", cite: "986", cnote: "influential" },
    { key: "eureka", name: "🏆 Eureka", url: U.eureka, sub: "NVIDIA+UPenn · ICLR 2024", cite: "655", cnote: "popular" }
  ];

  // each cell: [status, text]  status: yes | no | warn | na | info
  var rows = [
    { lab: "Origin & team", em: "🏛️", cells: [["info", "NVIDIA GEAR + UMich, Berkeley, CMU (2026)"], ["info", "Google Research robotics, Liang et al."], ["info", "Stanford, Fei-Fei Li group, W. Huang"], ["info", "NVIDIA + UPenn, Yecheng Jason Ma"]] },
    { lab: "Venue", em: "📖", cells: [["info", "arXiv preprint, not yet peer-reviewed"], ["info", "IEEE ICRA 2023 conference paper"], ["info", "Conf. on Robot Learning (CoRL) 2023"], ["info", "ICLR 2024, widely-cited paper"]] },
    { lab: "Citations (S2·Jul’26)", em: "📊", cells: [["info", "0 — brand-new July 2026 release"], ["info", "1,644 — foundational, most-cited baseline"], ["info", "986 — highly influential value-map work"], ["info", "655 — popular LLM reward-design method"]] },
    { lab: "Backbone LLM", em: "🔤", cells: [["info", "Claude Opus 4.6 frontier coding agent"], ["info", "OpenAI Codex / GPT-3 code models"], ["info", "GPT-4 for code + OWL-ViT vision"], ["info", "GPT-4 generates and mutates rewards"]] },
    { lab: "What the LLM writes", em: "🎯", cells: [["info", "Python control programs over primitives"], ["info", "Python policy code calling APIs"], ["info", "Code building 3D value/constraint maps"], ["info", "Dense reward functions in Python"]] },
    { lab: "How it learns / improves", em: "🧠", cells: [["yes", "Evolutionary program search + iterative debugging"], ["no", "No learning — one-shot code generation"], ["no", "No learning — zero-shot map synthesis"], ["yes", "Reward evolution, then RL trains policy"]] },
    { lab: "Gradient training?", em: "📉", cells: [["no", "None — skills are code, not weights"], ["no", "None — prompting only at inference"], ["no", "None — plan over generated maps"], ["yes", "Yes — reward code trains RL policy"]] },
    { lab: "Persistent skill library?", em: "📚", cells: [["yes", "Yes — ever-growing reusable library"], ["no", "None — each task from scratch"], ["no", "None — nothing accumulated"], ["no", "None — rewards never stored"]] },
    { lab: "Reuses past experience", em: "🔁", cells: [["yes", "Retrieves prior debugged fixes as guidance"], ["no", "None carried across tasks"], ["no", "Each instruction fully independent"], ["no", "Search restarts every task"]] },
    { lab: "Failure feedback signal", em: "👀", cells: [["yes", "Per-primitive traces localize failures"], ["no", "None — open-loop code execution"], ["warn", "Visual feedback for replanning only"], ["yes", "Reward reflection on training stats"]] },
    { lab: "Search strategy", em: "🔍", cells: [["yes", "Population of K candidate programs"], ["no", "None — one program sampled directly"], ["no", "None — deterministic map-then-plan"], ["yes", "Parallel sampling + reflection mutation"]] },
    { lab: "Benchmarks / envs", em: "🕹️", cells: [["info", "LIBERO, Robosuite, BEHAVIOR-1K, real robots"], ["info", "Real tabletop + simulated drawing"], ["info", "SAPIEN/RLBench sim + real Franka"], ["info", "Isaac Gym GPU sim, 29 envs"]] },
    { lab: "Real-robot validation", em: "🔬", cells: [["yes", "Yes — bimanual YAM station"], ["yes", "Yes — multiple real arms"], ["yes", "Yes — real Franka Panda"], ["no", "No — sim only (DrEureka later)"]] },
    { lab: "Scale / coverage", em: "🔢", cells: [["info", "150+ tasks, 90+ self-taught skills"], ["info", "Dozens of tabletop commands"], ["info", "Open-set tasks and objects"], ["info", "29 tasks, 10 robots, beats humans 83%"]] },
    { lab: "“Trained model” artifact", em: "💾", cells: [["info", "Repository of readable skill code"], ["info", "Disposable per-command script"], ["info", "Disposable per-task value maps"], ["info", "Opaque neural RL policy weights"]] },
    { lab: "Sim-to-real approach", em: "🌉", cells: [["yes", "Ships know-how; re-practices in real"], ["na", "N/A — runs on real hardware"], ["na", "N/A — deploys directly, no sim2real"], ["warn", "Ships weights; needs domain randomization"]] },
    { lab: "Cross-embodiment transfer", em: "🦾", cells: [["yes", "Skills transfer across arms / APIs"], ["warn", "Rewrite prompts/APIs per embodiment"], ["warn", "Re-specify perception + planner"], ["warn", "Retrain reward + policy per morphology"]] },
    { lab: "Continual / open-ended?", em: "➕", cells: [["yes", "Yes — indefinitely compounding growth"], ["no", "No — static one-shot generation"], ["no", "No — nothing accumulates"], ["no", "No — isolated per-task runs"]] },
    { lab: "Beyond fixed primitive APIs?", em: "🧩", cells: [["no", "No — bounded by primitive set"], ["no", "No — composes given primitives"], ["no", "No — bounded by planner primitives"], ["yes", "Yes — invents low-level reward shaping"]] },
    { lab: "Scaling to many tasks", em: "📈", cells: [["yes", "Amortizes; reuses earlier skills"], ["warn", "Linear — full rewrite each task"], ["warn", "Linear — fresh synthesis each task"], ["warn", "Costly — retrain reward + RL each"]] },
    { lab: "Open-source", em: "💻", cells: [["yes", "Full stack promised on release"], ["yes", "Yes — code + prompts released"], ["yes", "Yes — full GitHub implementation"], ["yes", "Yes — official repo, MIT license"]] },
    { lab: "Compute / cost profile", em: "💸", cells: [["no", "High — many LLM calls per loop"], ["yes", "Low — few LLM calls per command"], ["warn", "Moderate — LLM + VLM per task"], ["no", "High — LLM calls + GPU RL"]] },
    { lab: "Signature result", em: "🥇", cells: [["info", "Handover success: 20% → 92%"], ["info", "LLMs write deployable robot policies"], ["info", "Zero-shot open-set language manipulation"], ["info", "Shadow Hand pen-spinning at human speed"]] }
  ];

  var SYM = { yes: "✓", no: "✕", warn: "~", na: "–", info: "" };

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var mt = document.getElementById("matrix");
  if (mt) {
    var thead = "<thead><tr><th class='corner'><div class='corner-in'>Dimension</div></th>";
    methods.forEach(function (m) {
      var cls = m.key === "aspire" ? " col-aspire" : "";
      thead += '<th class="' + cls + '"><div class="mhead"><span class="mname"><a href="' + m.url + '" target="_blank" rel="noopener">' + m.name + '</a></span><span class="msub">' + m.sub + '</span><span class="cite"><b>' + m.cite + '</b> cites · ' + m.cnote + "</span></div></th>";
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
    { n: "🧩 FMs for Manipulation", u: "https://arxiv.org/abs/2404.18201", v: "IJRR 2025 · Li et al.", c: 38, scope: "FMs across 8 manipulation modules", nov: "Auto-driving-like multi-model framework", fut: ["≥99% success", "dexterity", "sim2real", "TAMP"], repo: null, rel: "Frames the code-as-policy engine" },
    { n: "🗣️ LLMs for Robotics", u: "https://arxiv.org/abs/2311.07226", v: "arXiv 2023 · Zeng et al.", c: 238, scope: "LLMs: perception/decision/control/interaction", nov: "LLM as central decision module", fut: ["security", "transfer", "unified modality"], repo: null, rel: "Maps the LLM-as-planner role" },
    { n: "🌐 FM-Driven Robotics", u: "https://arxiv.org/abs/2507.10087", v: "arXiv 2025 · review", c: 15, scope: "System-level FM strategies, 4 domains", nov: "Integrated system view, not isolated", fut: ["compute", "data", "tactile", "continual"], repo: null, rel: "Stresses continual + sim2real" },
    { n: "🎮 VLA Systematic Review", u: "https://arxiv.org/abs/2507.10672", v: "arXiv 2025 · systematic review", c: 43, scope: "102 VLA models, 26 datasets, 12 sims", nov: "2-D dataset map: richness × alignment", fut: ["pretraining", "modular", "alignment", "generalist"], repo: null, rel: "VLA weight-shipping = ASPIRE's foil" },
    { n: "🗣️➡️🦾 Lang-Conditioned", u: "https://arxiv.org/abs/2312.10807", v: "arXiv 2023 · Zhou et al.", c: 21, scope: "Language integration: 4 methods × 5 axes", nov: "Language roles: state/policy/planning/VLA", fut: ["generalization", "safety", "debates"], repo: { l: "hk-zh list", u: "https://github.com/hk-zh/language-conditioned-robot-manipulation-models" }, rel: "Instruction grounding ASPIRE needs" },
    { n: "🧭 Unified Manipulation", u: "https://arxiv.org/abs/2510.10903", v: "arXiv 2025 · Bai et al. (18)", c: 30, scope: "Perception/planning/control + benchmarks", nov: "Planning: language/code/motion/affordance/3D", fut: ["robot brain", "data", "multimodal", "safety"], repo: { l: "Awesome-Robotics-Manipulation", u: "https://github.com/BaiShuanghao/Awesome-Robotics-Manipulation" }, rel: "Code-as-planning axis overlaps directly" },
    { n: "🤖 LLM Agent Survey", u: "https://arxiv.org/abs/2503.21460", v: "arXiv 2025 · Luo et al.", c: 184, scope: "329 papers on agent methodology", nov: "Unified arch: design ↔ emergent behavior", fut: ["self-evolution", "collaboration", "evaluation"], repo: { l: "awesome-agent-papers", u: "https://github.com/luo-junyu/awesome-agent-papers" }, rel: "Self-evolving loop underpins ASPIRE" },
    { n: "🌱 Self-Evolving Agents Survey", u: "https://arxiv.org/abs/2507.21046", v: "arXiv 2025 · what/when/how/where", c: 0, scope: "General self-evolving agents (not robot-specific)", nov: "What/when/how/where-to-evolve framework", fut: ["robot grounding", "safety", "evaluation"], repo: null, rel: "⚠️ closest prior framing — the incumbent to beat" }
  ];

  var sv = document.getElementById("surveys");
  if (sv) {
    var sh = "<thead><tr><th>📄 Survey</th><th>🏛️ Venue</th><th>📊 Cites</th><th>🎯 Scope</th><th>💡 Novelty</th><th>🔮 Future work</th><th>📂 Repo</th><th>🔗 vs ASPIRE</th></tr></thead><tbody>";
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

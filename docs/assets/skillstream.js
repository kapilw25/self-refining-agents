/* Renders the SkillStream leaderboard (#leaderboard). Placeholder baseline rows;
   fill values as runs land (mirror skillstream/leaderboard/leaderboard.json). */
(function () {
  // succ = Success@k (sim) · aulc = compounding area-under-curve ⭐ · eff = tokens-to-first-success
  // xemb = cross-embodiment success · reuse = library reuse rate · "—" = to be measured
  var rows = [
    { m: "ASPIRE-style skill-library agent", sec: "§3.1.3–5", camp: "code + skills ★", succ: "—", aulc: "—", eff: "—", xemb: "—", reuse: "—", url: "https://arxiv.org/abs/2607.00272", exp: "◥ rising" },
    { m: "Self-repair (REFLECT-style)", sec: "§3.1.2", camp: "code + feedback", succ: "—", aulc: "—", eff: "—", xemb: "—", reuse: "—", url: "https://arxiv.org/abs/2306.15724", exp: "◹ small rise" },
    { m: "Zero-shot CaP", sec: "§3.1.1", camp: "code, no memory", succ: "—", aulc: "—", eff: "—", xemb: "—", reuse: "—", url: "https://arxiv.org/abs/2209.07753", exp: "▬ flat" },
    { m: "Eureka (reward-synth) · DIAYN (RL-discovery)", sec: "§3.3·§3.4.1", camp: "cross-paradigm", succ: "—", aulc: "—", eff: "—", xemb: "—", reuse: "—", url: "https://arxiv.org/abs/2310.12931", exp: "cross-paradigm" },
    { m: "OpenVLA (fine-tuned)", sec: "§3.2", camp: "weights (foil)", succ: "—", aulc: "—", eff: "—", xemb: "—", reuse: "—", url: "https://arxiv.org/abs/2406.09246", exp: "▬ flat" }
  ];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var el = document.getElementById("leaderboard");
  if (!el) return;
  var h = "<thead><tr><th>#</th><th>Method</th><th>§</th><th>Camp</th>"
    + "<th>Success@k</th><th>⭐ AULC</th><th>Efficiency</th><th>X-embod</th><th>Reuse</th><th>Expected</th></tr></thead><tbody>";
  rows.forEach(function (r, i) {
    var star = /★/.test(r.camp);
    h += "<tr>"
      + '<td class="num">' + (i + 1) + "</td>"
      + '<td class="k"><a class="lnk" href="' + r.url + '" target="_blank" rel="noopener">' + esc(r.m) + "</a></td>"
      + '<td class="mono">' + r.sec + "</td>"
      + '<td class="sys">' + esc(r.camp) + "</td>"
      + '<td class="mono">' + r.succ + "</td>"
      + '<td class="mono' + (star ? " hl" : "") + '">' + r.aulc + "</td>"
      + '<td class="mono">' + r.eff + "</td>"
      + '<td class="mono">' + r.xemb + "</td>"
      + '<td class="mono">' + r.reuse + "</td>"
      + '<td class="sys">' + esc(r.exp) + "</td></tr>";
  });
  h += "</tbody>";
  el.innerHTML = h;
})();

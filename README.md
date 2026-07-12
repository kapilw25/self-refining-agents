# How Robots Learn — A Survey of Robot-Learning Techniques

A survey and **living catalog** of robot-learning techniques for **Physical AI** — vision-language-action policies, code-as-policy, reward synthesis, self-evolving skill libraries, and cross-embodiment transfer — anchored on [ASPIRE](https://arxiv.org/abs/2607.00272) (NVIDIA GEAR, 2026).

The thesis: two ways to build a generalist robot — **ship weights** (end-to-end VLA) vs **ship code + skills**. ASPIRE is the frontier of the second camp, the one system that writes, debugs, and *compounds* its own skills.

🔗 **Live site:** `https://kapilw25.github.io/self-refining-agents/`

## What's inside (`docs/`)

| Page | Contents |
|---|---|
| `index.html` | **The survey** — opens with the canonical **taxonomy tree** (~47 physical-AI systems in 6 branches §3.1–§3.6, the hero figure), then the loop, the ship-weights-vs-code thesis table, mechanism taxonomy, a capability matrix (one exemplar per camp), and the related-survey landscape |
| `catalog.html` | Sortable / filterable catalog of ~47 systems, tagged by domain × mechanism (**F** feedback · **S** search · **M** memory) × year × benchmark |

Everything is a **self-contained static site** — no build step, no server. Plain HTML/CSS/vanilla JS with light/dark themes.

## `/survey` — one command, full survey for any new topic

```
/survey "tactile sensing for dexterous manipulation"   # example topic
```

Artifacts generated in `survey_<slug>/`:

- `novelty_gap.md` — websearch-confirmed gap no existing survey covers
- `refs.bib` — 60+ web-verified references (title/author/year/arXiv checked)
- `figures/` — fig_taxonomy_main (hero grouped-cell taxonomy, 40+ systems), fig_survey_timeline, fig_architectures
- `tables/` — tab_survey_compare, tab_definitions, tab_compare_main + per-branch, tab_branch_limits, tab_capability_matrix, tab_landscape (200+ works)
- `sections/` — abstract → conclusion + limitations, future_work, appendix_landscape
- `main.tex` → `main.pdf`, flattened `main_flat.tex`
- `audit_report.md` — the exit ticket

**LOOP engineering:** a Stop hook blocks the agent from ending its turn while any gate G1–G8
fails (novelty → refs → taxonomy → compile → render → eyeball → completeness → audit), feeding
the failing gates back as its next prompt. Exit requires `audit_report.md` to say
`ALL AUDITS CLEAN`; any later source edit voids it. Escape: delete `.claude/state/survey_loop.json`.

**AUDIT agents:** each phase ends with a fresh adversarial agent that tries to REFUTE the result
(hallucinated reference = automatic fail); mistakes are fixed and re-audited until `ACHIEVED`.
The final fleet is 5 auditors (fabrication / tags / consistency / tone / build), looped until all
say `CLEAN`.

## View locally

Open `docs/index.html` directly in a browser, or serve it:

```bash
cd docs && python3 -m http.server 8000   # → http://localhost:8000
```

## Publish on GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. **Branch: `main`, Folder: `/docs`** → Save. Live in ~1 minute.

## Notes

- Citation counts are Semantic Scholar snapshots (drift daily; lower than Google Scholar).
- Catalog metadata is best-effort — unlinked rows fall back to a web search; **verify before citing**.
- The full text of source papers is **not** redistributed here; all systems link to their original sources.

# Surveys

Interactive companions to a series of survey papers on AI systems. Each survey ships as two artefacts: a **static-site** set of pages under `docs/`, and its **LaTeX source** under `overleaf_draft/`.

🔗 **Live site:** https://kapilw25.github.io/surveys/

## Projects

| # | Project | Live pages | LaTeX source |
|---|---|---|---|
| **P1** | **Weights or Skills?** — robot-learning techniques for **Physical AI** (VLA policies, code-as-policy, reward synthesis, self-evolving skill libraries, cross-embodiment transfer), anchored on [ASPIRE](https://arxiv.org/abs/2607.00272) (NVIDIA GEAR, 2026). *Thesis:* two ways to build a generalist robot — **ship weights** (end-to-end VLA) vs **ship code + skills**. | [`p1_weights_or_skills/`](https://kapilw25.github.io/surveys/p1_weights_or_skills/) | `overleaf_draft/p1_weights_or_skills/` |
| **P2** | **Cross-Modal Evaluation Validity** — *pass the benchmark, fail reality*: generative, agentic, and embodied AI cheat the same five ways (leakage, saturation, judge-gaming, sim-to-real). One validity-threat taxonomy across all three. | [`p2_eval_validity/`](https://kapilw25.github.io/surveys/p2_eval_validity/) | `overleaf_draft/p2_eval_validity/` *(stub)* |

## What's inside (`docs/`)

- **`index.html`** — portal linking the two projects.
- **`p1_weights_or_skills/`**
  - `index.html` — the survey: canonical **taxonomy tree** (~47 physical-AI systems in 6 branches §3.1–§3.6) → the loop → ship-weights-vs-code thesis table → mechanism taxonomy → capability matrix → related-survey landscape.
  - `catalog.html` — sortable / filterable catalog of ~47 systems, tagged by domain × mechanism (**F** feedback · **S** search · **M** memory) × year × benchmark.
  - `benchmark.html` — the self-improving-robot benchmark.
- **`p2_eval_validity/`**
  - `index.html` — project hub.
  - `eval_validity_cross_modal.html` — coverage grid (8 validity surveys × 3 AI domains), the five recurring threats, and cross-modal positioning.

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

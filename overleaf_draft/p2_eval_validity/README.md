# P2 — Cross-Modal Evaluation Validity (LaTeX source)

**Status:** not started. This folder is the LaTeX home for the second survey,
*"Pass the Benchmark, Fail Reality"* — one validity-threat taxonomy across
generative, agentic, and embodied AI.

The web companion already exists at `docs/p2_eval_validity/`
(live: <https://kapilw25.github.io/surveys/p2_eval_validity/>). This folder will
hold its paper the same way `p1_weights_or_skills/` holds Phase 1:
self-contained — `main.tex`, `refs.bib`, `sections/`, `tables/`, `figures/`,
`styles/`, plus a local `.latexmkrc` routing build output to `no_upload/build/`.

## To scaffold it

From the repo root, run the pipeline with the Phase-2 topic:

```
/survey "cross-modal evaluation validity across generative, agentic, and embodied AI"
```

It generates `novelty_gap.md → refs.bib → figures/ → tables/ → sections/ →
main.tex → main.pdf → audit_report.md`, mirroring the P1 manifest.

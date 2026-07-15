# Audit report — reviewer feedbacks F1/F2/F3 (2026-07-13)

Full 5-agent adversarial audit fleet over the 35-page CSUR draft, run twice (fix + re-verify).

## Artifacts built (all render in main.pdf)

| Feedback | Artifact | Type / number | Page | Source |
|---|---|---|---|---|
| F1 methodology | "Survey methodology" prose (sources, window, search strings, include/exclude) | §2.1 | 5 | `sections/2_taxonomy.tex` |
| F1 methodology | PRISMA-2020-style corpus-construction flow (237→12→225; 77+225=302; 310 refs; honest "not logged" box) | Figure 3 | 6 | `figures/fig_prisma.tex` |
| F2 comparison | Family spec-sheet: 5 families × 6 axes (data needs, task horizon, transfer, interpretability, safety, failure mode) | Table 8 | 14 | `tables/tab_branch_limits.tex` |
| F3 future work | Metrics protocol: 4 metrics × definition × testbed × family (LIBERO + Open-X) | Table 9 | 16 | `tables/tab_future_metrics.tex` |
| F3 future work | Future Directions rewritten, each direction tied to its metric | §6 | 15 | `sections/future_work.tex` |

## Audit verdicts

| Dimension | Round 1 | Round 2 |
|---|---|---|
| Fabrication (web-verified, incl. prisma2020 = Page et al. BMJ 2021) | **CLEAN** | — |
| Consistency (counts 77/225/302/310, cross-refs, no §-renumber) | **CLEAN** | — |
| Metric-tag accuracy (30 spec cells + landscape + testbeds) | **CLEAN** | — |
| Build + visual (0 err/undef/overfull; PRISMA no overlap; house-style marks) | **CLEAN** | — |
| Tone / COI / em-dash / British | ISSUES | **CLEAN** |

## Fixes applied

- Depersonalised 7 source header comments that revealed reviewer/rebuttal tags (F1/F2/F3/F5/F6/F7/F8).
- Removed a rendered "reviewer-relevant" phrase from the `tab_definitions` caption (printed in PDF).
- `\usepackage{array}` added for ragged-right p-columns; family-matrix label column widened (fixed 6.7pt overfull); `library-reuse` → `skill-library reuse` wording aligned.
- `prisma2020` reference added (Page MJ et al., BMJ 2021, doi:10.1136/bmj.n71).

## Build

35 pages · latexmk EXIT 0 · 0 LaTeX errors · 0 undefined citations/references · 0 overfull >5pt ·
all figures carry `\Description` · 0 em-dashes · `main_flat.tex` regenerated (5870 lines).

## Knowledge base updated

`.claude/memory/survey_reviewer_artifacts.md` (project-local) + global memory + survey-pipeline
SKILL.md Lessons: every survey must ship the PRISMA methodology figure, the families×6-axes spec
matrix, and metric-anchored future work; plus the LaTeX pitfalls and the provenance-sweep rule.

ALL AUDITS CLEAN

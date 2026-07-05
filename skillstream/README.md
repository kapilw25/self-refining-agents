# SkillStream

A **standardized simulation benchmark + leaderboard** for self-improving code-as-policy robots — *SWE-bench for self-improvement*. A method practices on a fixed stream of sim tasks, carries a skill library forward, and is scored on frozen held-out suites: **held-out success vs. # tasks practiced** (the compounding curve).

> Companion to the survey → `../docs/` (§3.1). All sim — no video.

## Honest relationship to ASPIRE / ENPIRE (NVIDIA GEAR)

SkillStream is **not** a new way to measure self-improvement — ASPIRE already did. It **standardizes** ASPIRE's protocol into a shared arena.

| | 🟢 ASPIRE / ENPIRE (GEAR) | 📊 SkillStream |
|---|---|---|
| Type | self-improving **system** + own eval | shared **benchmark + leaderboard** |
| ⭐ Metric | Fig 5(b): success vs library size N | generalizes it → standard **AULC** harness |
| Suites | LIBERO-Pro · Robosuite · BEHAVIOR-1K | same, standardized splits + seeds |
| Comparability | own splits, vs CaP-Agent0 | fixed stream + frozen held-out + identical budget → head-to-head |
| Eval axes | library-size scaling + sim2real | **+ new**: compositional · cross-suite · forgetting |
| Who runs it | ASPIRE authors | anyone — ASPIRE is itself a (top) submission |

**Contribution = standardization + cross-paradigm comparison + new axes; not new science.** Credit: [ASPIRE 2607.00272](https://arxiv.org/abs/2607.00272) · [ENPIRE 2606.19980](https://arxiv.org/abs/2606.19980). ⚠️ Scooping risk: GEAR is the natural author.

## Layout

| Path | Contents |
|---|---|
| `data/schema.md`, `data/sample_manifest.jsonl` | task-stream manifest (sim tasks + splits) |
| `eval/metrics.py` | `aulc` · `success_at_k` · `catastrophic_forgetting` · `reuse_rate` · `tokens_to_first_success` |
| `eval/run.py` | streaming harness: practice → checkpoints → AULC |
| `baselines/` | `zero_shot_cap` · `self_repair` · `skill_library` (+ cross-paradigm track) |
| `leaderboard/leaderboard.json` | submissions (drives the web leaderboard) |
| `sim_mappings/` | task → LIBERO/Robosuite/ManiSkill env + success predicate |

## Quickstart

```bash
pip install -r requirements.txt          # numpy + your sim suites
python eval/run.py --agent baselines/skill_library --manifest data/sample_manifest.jsonl
```

## Submit to the leaderboard

Open a PR appending your run to `leaderboard/leaderboard.json` (schema in that file). Ranked by ⭐ **AULC** (self-improvement), not one-shot Success@k.

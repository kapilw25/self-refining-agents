# SkillStream

A streaming benchmark for **self-improving skill acquisition from video**. Watch a stream of human-manipulation clips → write executable robot skill code → measure whether the skill library **compounds** as the stream grows.

> First benchmark that scores **self-improvement over a stream** (feedback + memory + search), not one-shot accuracy. Companion to the survey → `../docs/` (§3.1).

## Task

| | |
|---|---|
| Input | short clip (human tabletop manipulation) + language label |
| Output | executable skill program (code-as-policy) |
| Metric ⭐ | **AULC** — held-out success vs. # clips practiced |

## Data (share URLs + code, not frames)

| Tier | Size | Scored by |
|---|---|---|
| sim-grounded | ~400 | run code in sim → Success@k |
| scale | ~15k | skill vs reference (AST + LLM-judge) |

## Layout

| Path | Contents |
|---|---|
| `data/schema.md`, `data/sample_manifest.jsonl` | manifest (URLs + timestamps) |
| `process_clips.py` | yt-dlp download + ffmpeg split (CPU) |
| `eval/metrics.py` | `success_at_k` · `aulc` · `reuse_rate` · `tokens_to_first_success` |
| `eval/run.py` | streaming harness: practice → eval → curve |
| `baselines/` | `zero_shot_cap` · `self_repair` · `skill_library` |
| `leaderboard/leaderboard.json` | submissions (drives the web leaderboard) |
| `sim_mappings/` | clip → LIBERO/Robosuite/ManiSkill task map |

## Quickstart

```bash
pip install -r requirements.txt          # yt-dlp, ffmpeg-python, numpy
python process_clips.py --manifest data/sample_manifest.jsonl --out clips/
python eval/run.py --agent baselines/zero_shot_cap --manifest data/sample_manifest.jsonl
```

## Submit to the leaderboard

Open a PR appending your run to `leaderboard/leaderboard.json` (schema in that file). Ranked by **AULC**, not one-shot Success@k.

## License / legal

We distribute **manifests (YouTube IDs + timestamps + annotations) and code only** — never video frames. Users re-download clips locally with `process_clips.py`. This mirrors Kinetics / HowTo100M / ActivityNet.

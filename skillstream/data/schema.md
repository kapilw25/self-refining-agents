# Manifest schema

One JSON object per line (`.jsonl`). We ship **URLs + timestamps + annotations only** — never frames.

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | str | ✓ | stable clip id, e.g. `ss_000123` |
| `youtube_id` | str | ✓ | 11-char YouTube id |
| `start_ts` | float | ✓ | clip start (s) |
| `end_ts` | float | ✓ | clip end (s) |
| `task_verb` | enum | ✓ | one of 30 (pour, open, stack, insert, wipe, fold, cut, …) |
| `objects` | list[str] | ✓ | e.g. `["kettle","cup"]` |
| `tier` | enum | ✓ | `sim` \| `scale` |
| `split` | enum | ✓ | `practice` \| `heldout` |
| `sim_task` | str | sim only | sim env id, e.g. `libero_pour_v0` |
| `sim_embodiment` | str | sim only | `franka` \| `ur5` \| `bimanual` |
| `ref_skill` | path | sim only | reference program, e.g. `refs/pour_0001.py` |

Splits are **disjoint by task instance**; `heldout` is never seen during the practice stream.

#!/usr/bin/env python3
"""SkillStream streaming harness (skeleton).

Streams the `practice` split one clip at a time; at each checkpoint evaluates on
the frozen `heldout` split and records the held-out success rate. Produces the
compounding curve + AULC — the benchmark's signature.

    python eval/run.py --agent baselines/zero_shot_cap --manifest data/sample_manifest.jsonl
"""
import argparse
import importlib
import json

from metrics import aulc, success_at_k, reuse_rate  # noqa: E402

CHECKPOINTS = [0, 25, 50, 100]  # #practice clips at which to eval held-out


def load(path):
    with open(path) as f:
        return [json.loads(l) for l in f if l.strip()]


def load_agent(spec):
    """spec = 'baselines/zero_shot_cap' → import its Agent class.
    An Agent implements: .watch(clip) -> skill_code ; .library (optional)."""
    mod = importlib.import_module(spec.replace("/", ".") + ".agent")
    return mod.Agent()


def evaluate_heldout(agent, heldout):
    """Run the agent's current library/policy over held-out clips in sim.
    Returns (success_rate, reuse_rate_value). TODO: wire the sim executor."""
    succ, reused = [], []
    for clip in heldout:
        code = agent.solve(clip)                 # uses library if present
        ok = run_in_sim(code, clip)              # TODO: LIBERO/Robosuite/ManiSkill
        succ.append(ok)
        reused.append(getattr(agent, "last_used_stored_skill", False))
    return success_at_k(succ), reuse_rate(succ, reused)


def run_in_sim(code, clip):
    """TODO: execute `code` against clip['sim_task'] and return success bool."""
    raise NotImplementedError("wire sim executor (LIBERO / Robosuite / ManiSkill)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--agent", required=True)
    ap.add_argument("--manifest", required=True)
    args = ap.parse_args()

    data = load(args.manifest)
    practice = [c for c in data if c["split"] == "practice"]
    heldout = [c for c in data if c["split"] == "heldout" and c["tier"] == "sim"]
    agent = load_agent(args.agent)

    seen, curve = [], []
    for n in CHECKPOINTS:
        while len(seen) < n and len(seen) < len(practice):
            agent.watch(practice[len(seen)])     # refine library from this clip
            seen.append(practice[len(seen)])
        sr, _ = evaluate_heldout(agent, heldout)
        curve.append(sr)
        print(f"[{args.agent}] clips={len(seen):>4}  heldout_success={sr:.3f}")

    print(f"AULC = {aulc(CHECKPOINTS, curve):.3f}")


if __name__ == "__main__":
    main()

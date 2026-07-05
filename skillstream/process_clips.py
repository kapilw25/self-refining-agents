#!/usr/bin/env python3
"""Download + split SkillStream clips from a manifest (CPU only).

Ships no frames: users re-materialize clips locally from YouTube IDs.
    python process_clips.py --manifest data/sample_manifest.jsonl --out clips/
Requires: yt-dlp, ffmpeg on PATH.
"""
import argparse
import json
import os
import subprocess


def load_manifest(path):
    with open(path) as f:
        return [json.loads(line) for line in f if line.strip()]


def download(youtube_id, cache_dir):
    """Download the source video once (cached). Returns local path or None."""
    out = os.path.join(cache_dir, youtube_id + ".mp4")
    if os.path.exists(out):
        return out
    url = "https://www.youtube.com/watch?v=" + youtube_id
    try:
        subprocess.run(
            ["yt-dlp", "-f", "mp4", "-o", out, url],
            check=True, capture_output=True,
        )
        return out
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None  # link rot / unavailable → report in coverage


def split(src, start_ts, end_ts, out_path):
    """Cut [start_ts, end_ts] into out_path with ffmpeg."""
    subprocess.run(
        ["ffmpeg", "-y", "-ss", str(start_ts), "-to", str(end_ts),
         "-i", src, "-c", "copy", out_path],
        check=True, capture_output=True,
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--out", default="clips")
    ap.add_argument("--cache", default=".cache")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    os.makedirs(args.cache, exist_ok=True)

    ok, missing = 0, []
    for row in load_manifest(args.manifest):
        src = download(row["youtube_id"], args.cache)
        if src is None:
            missing.append(row["id"])
            continue
        split(src, row["start_ts"], row["end_ts"],
              os.path.join(args.out, row["id"] + ".mp4"))
        ok += 1

    # coverage report (link-rot mitigation)
    total = ok + len(missing)
    print(f"coverage: {ok}/{total} clips ({100 * ok / max(total,1):.1f}%)")
    if missing:
        with open(os.path.join(args.out, "missing.txt"), "w") as f:
            f.write("\n".join(missing))


if __name__ == "__main__":
    main()

"""Build 05-publication-copy.md from a week's sourced drafts, with fact IDs removed.

Usage (from the repo root):  python3 -I .claude/skills/content-pack/publication_copy.py content-agent/packs/2026-W47
Reads 03-content-pack.md and (if present) 04-blog.md. Writes 05-publication-copy.md and prints checks.
The sourced files are never changed.
"""
import re, sys, os

folder = sys.argv[1]
week = os.path.basename(os.path.normpath(folder))
strip = lambda t: re.sub(r" ?\[(?:F\d+(?:, )?)+\]", "", t)
wc = lambda t: len(re.findall(r"[A-Za-z0-9’']+", re.sub(r"(?m)^#\w.*$", "", t)))

pack = open(os.path.join(folder, "03-content-pack.md")).read()
sec = {p.split("\n", 1)[0]: p.split("\n", 1)[1] for p in re.split(r"(?m)^## ", pack)[1:]}

def body(name):
    t = re.sub(r"(?s)^\s*\*\*Topic:\*\*[^\n]*\n", "", sec[name]).split("**CTA used")[0]
    return strip(t).strip()

posts = ["LinkedIn post", "Facebook post", "Instagram caption"]
rows = re.findall(r"(?m)^\| (\d) \| ([^|]*) \| ([^|]*) \|$", sec["Carousel (Instagram and LinkedIn)"])

out = [f"# Publication copy: {week}\n",
       "Final copy for posting, with internal fact IDs removed. The sourced versions, with fact IDs, are in "
       "`03-content-pack.md` and `04-blog.md`, and the evidence is in `02-research-brief.md`.\n",
       "**Status: not yet published.** Before posting, complete the account check in `06-canva-instructions.md`, section 1.\n"]
for p in posts:
    out += ["---\n", f"## {p}\n", body(p) + "\n"]
out += ["---\n", f"## Carousel text ({len(rows)} slides)\n"]
out += [f"**Slide {n}: {h.strip()}**\n{strip(b).strip()}\n" for n, h, b in rows]

blog_path = os.path.join(folder, "04-blog.md")
bbody = ""
if os.path.exists(blog_path):
    blog = open(blog_path).read()
    meta = re.search(r"\*\*Suggested meta description[^:]*:\*\* (.*)", blog)
    bbody = strip(blog.split("---", 1)[1].rsplit("---", 1)[0]).strip()
    out += ["---\n", "## Blog article\n", f"**Title:** {blog.splitlines()[0][2:]}\n",
            f"**Meta description:** {meta.group(1) if meta else ''}\n", bbody + "\n"]

text = "\n".join(out)
open(os.path.join(folder, "05-publication-copy.md"), "w").write(text)

print("Fact IDs left:", re.findall(r"\[F\d+", text) or "none")
for p in posts:
    print(f"{p}: {wc(body(p))} words")
print(f"Carousel: {len(rows)} slides, longest {max(wc(strip(b)) for _, _, b in rows)} words")
if bbody:
    print(f"Blog: {wc(bbody)} words")
for ch, name in [("—", "em dash"), (";", "semicolon"), ("…", "ellipsis"), ("...", "ellipsis")]:
    if ch in text:
        print("Found", name)

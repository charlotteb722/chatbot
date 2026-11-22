"""Quality and consistency checks for a week's content pack.

Usage (from the repo root):  python3 -I .claude/skills/content-pack/checks.py content-agent/packs/<week>
Reads 02-research-brief.md, 03-content-pack.md, optional 04-blog.md, 05-publication-copy.md and content-agent/brand.md.
Prints one PASS/FAIL line per check and exits 1 if any check fails. Changes no files.
"""
import os, re, sys

folder = sys.argv[1]
root = os.path.dirname(os.path.dirname(os.path.normpath(folder)))  # content-agent
read = lambda name: open(os.path.join(folder, name)).read() if os.path.exists(os.path.join(folder, name)) else ""
brief, pack, blog, pub = read("02-research-brief.md"), read("03-content-pack.md"), read("04-blog.md"), read("05-publication-copy.md")
brand = open(os.path.join(root, "brand.md")).read()
results = []

def check(name, ok, detail=""):
    results.append((ok, name, detail))

strip = lambda t: re.sub(r" ?\[(?:F\d+(?:, )?)+\]", "", t)
words = lambda t: len(re.findall(r"[A-Za-z0-9’']+", re.sub(r"(?m)^#\w.*$", "", t)))
sections = {p.split("\n", 1)[0]: p.split("\n", 1)[1] for p in re.split(r"(?m)^## ", pack)[1:]} if pack else {}
POSTS = ["LinkedIn post", "Facebook post", "Instagram caption"]
CAROUSEL = "Carousel (Instagram and LinkedIn)"

def post_body(name):
    t = re.sub(r"(?s)^\s*\*\*Topic:\*\*[^\n]*\n", "", sections.get(name, "")).split("**CTA used")[0]
    return strip(t).strip()

# Files and structure
for f in ["02-research-brief.md", "03-content-pack.md", "05-publication-copy.md"]:
    check(f"File present: {f}", bool(read(f)))
check("All three posts and the carousel present", all(n in sections for n in POSTS + [CAROUSEL]))

# Facts
valid = set(re.findall(r"\| (F\d+) \|", brief))
check("Research brief has at least 5 verified facts", len(valid) >= 5, f"{len(valid)} facts")
drafts = re.sub(r"(?s)## (Review note|Test in a real UK account).*?(?=\n## |\Z)", "", pack) + blog.split("**Blog review")[0]
used = set(re.findall(r"F\d+", drafts))
check("Every fact ID used in the drafts exists in the brief", used <= valid, f"unknown: {sorted(used - valid)}" if used - valid else "")
check("No fact IDs left in the publication copy", not re.search(r"\[(F|B)\d+", pub))

# Publication copy matches the sourced drafts
for n in POSTS:
    check(f"Publication {n} matches the sourced draft", bool(post_body(n)) and post_body(n) in pub)
if blog:
    bb = strip(blog.split("---", 1)[1].rsplit("---", 1)[0]).strip()
    check("Publication blog matches the sourced blog", bb in pub)

body = pub.split("Status: not yet published")[-1]
# Style
check("No em dashes, semicolons or ellipses", not re.search(r"—|;|…|\.\.\.", body))
unquoted = re.sub(r"\"[^\"]*\"|“[^”]*”", "", body)
us = sorted({w for w in re.findall(r"\b\w*(?:iz(?:e|es|ed|ing|ation)|yz(?:e|ed)|color|center|favorite|behavior|program(?:me)?s?)\b", unquoted, re.I)
             if w.lower() not in ("formalize", "programme", "programmes", "program", "programs",
                                "size", "sized", "sizes", "seize", "seized", "prize", "prized", "capsize", "downsized", "oversized")})
check("British spelling outside quoted interface labels", not us, ", ".join(us))
avoid = ["game-changer", "game changer", "revolutionise", "unlock", "supercharge", "fast-paced", "dive in",
         "harness the power", "the future is here", "10x"]
hits = [a for a in avoid if a in body.lower()]
check("No avoid-list phrases", not hits, ", ".join(hits))

# Limits
limits = {"LinkedIn post": (120, 220), "Facebook post": (60, 140), "Instagram caption": (60, 120)}
for n, (lo, hi) in limits.items():
    w = words(post_body(n))
    check(f"{n} length {lo}-{hi} words", lo <= w <= hi, f"{w} words")
rows = re.findall(r"(?m)^\| (\d) \| ([^|]*) \| ([^|]*) \|$", sections.get(CAROUSEL, ""))
check("Carousel has exactly 8 slides", len(rows) == 8, f"{len(rows)} slides")
longest = max([words(strip(b)) for _, _, b in rows] or [0])
check("Every carousel slide under 30 words", longest < 30, f"longest {longest}")
if blog:
    w = words(strip(blog.split("---", 1)[1].rsplit("---", 1)[0]))
    check("Blog length 600-850 words", 600 <= w <= 850, f"{w} words")

# Commercial and claims
check("No prices or trial offers", not re.search(r"£\s?\d|\$\s?\d|per user|free trial|\d+-day trial", body))
first_person = re.findall(r"\b(I've used|I have used|my clients?|a client of mine|when I (?:helped|worked))\b", body, re.I)
check("No invented first-person experience or client stories", not first_person, ", ".join(first_person))
if re.search(r"(?i)\billustration\b|made-up", pack + blog):
    check("Illustrative examples are labelled as made up", "made-up example" in pub or "illustration" in pub.lower())
check("No universal-availability wording", not re.search(r"\bEveryone:|all Gmail users|any Gmail account|available to everyone|works for everyone", body))

# Calls to action
ctas = [re.sub(r"^\d+\.\s*", "", l.strip()).strip("\"“”") for l in brand.split("## Calls to action")[1].split("\n## ")[0].splitlines() if re.match(r"\s*\d+\.", l)]
for n in ["LinkedIn post", "Facebook post", "Instagram caption", "Blog article"]:
    seg = pub.split("## " + n)[1].split("\n---")[0] if "## " + n in pub else ""
    count = sum(c in seg for c in ctas)
    if seg:
        check(f"{n}: at most one approved CTA", count <= 1, f"{count} found")
check("Brief records verification before drafting", "Accessed" in brief and "opened" in brief.lower())

failed = [r for r in results if not r[0]]
for ok, name, detail in results:
    print(("PASS  " if ok else "FAIL  ") + name + (f"  ({detail})" if detail else ""))
print(f"\n{len(results) - len(failed)}/{len(results)} passed")
sys.exit(1 if failed else 0)

#!/usr/bin/env bash
# Read-only page reader for the content-pack agent.
# GET only, HTTPS only, allowlisted hosts only, prints page text to the screen.
# Writes no files and sends no data.
set -euo pipefail
[[ $# -eq 1 ]] || { echo "usage: fetch.sh https://host/path" >&2; exit 2; }
url="$1"
[[ "$url" =~ ^https://([A-Za-z0-9.-]+)(/|$) ]] || { echo "https URLs only" >&2; exit 2; }
host="${BASH_REMATCH[1],,}"
allowed=(
  openai.com help.openai.com www.anthropic.com support.claude.com
  learn.microsoft.com www.microsoft.com techcommunity.microsoft.com support.microsoft.com
  blog.google support.google.com workspaceupdates.googleblog.com workspace.google.com
  www.gov.uk assets.publishing.service.gov.uk ico.org.uk www.ons.gov.uk www.fsb.org.uk
  www.british-business-bank.co.uk www.britishchambers.org.uk www.canva.com
)
ok=0; for h in "${allowed[@]}"; do [[ "$host" == "$h" ]] && ok=1; done
[[ $ok -eq 1 ]] || { echo "host not allowed: $host" >&2; exit 3; }
curl --silent --show-error --fail --location --max-redirs 3 --max-time 30 \
     --proto =https --proto-redir =https "$url" |
python3 -I -c 'import sys,re,html
t=sys.stdin.read()
t=re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>"," ",t)
t=re.sub(r"(?i)<br\s*/?>|</(p|li|h[1-6]|tr|div)>","\n",t)
t=html.unescape(re.sub(r"<[^>]+>"," ",t))
t=re.sub(r"[ \t]+"," ",t); t=re.sub(r"\n\s*\n+","\n\n",t)
print(t.strip()[:60000])'

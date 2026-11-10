#!/usr/bin/env bash
set -euo pipefail
: "${CHROME:?Defina CHROME com Chromium headless isolado}"
BASE=${BASE:-http://127.0.0.1:8089}; OUT=${OUT:-/workspace/brasa-shots/polish/after}
mkdir -p "$OUT"; profile=$(mktemp -d /tmp/brasa-perf.XXXXXX)
timeout 60 "$CHROME" --no-sandbox --disable-dev-shm-usage --no-proxy-server --user-data-dir="$profile" --dump-dom "$BASE/tests/perf-browser.html" > "$OUT/perf-dom.log" 2> "$OUT/perf-browser.log"
python3 - "$OUT" <<'PY'
from pathlib import Path
import re,json,html,sys
p=Path(sys.argv[1]);s=(p/'perf-dom.log').read_text();r=re.search(r'<pre id="report">(.*?)</pre>',s,re.S);assert r,'No report';data=json.loads(html.unescape(r.group(1)));print(data);assert data['ok'],data
(p/'perf-results.json').write_text(json.dumps(data,indent=2))
PY

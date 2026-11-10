#!/usr/bin/env bash
set -euo pipefail
: "${CHROME:?Defina CHROME com Chromium headless isolado}"
BASE=${BASE:-http://127.0.0.1:8089}; OUT=${OUT:-/workspace/brasa-shots/polish/after}
mkdir -p "$OUT"; profile=$(mktemp -d /tmp/brasa-polish.XXXXXX)
timeout 60 "$CHROME" --no-sandbox --disable-dev-shm-usage --no-proxy-server --user-data-dir="$profile" --window-size=1280,800 --screenshot="$OUT/06-animacoes.png" --virtual-time-budget=6000 --dump-dom "$BASE/tests/polish-browser.html" > "$OUT/polish-dom.log" 2> "$OUT/polish-browser.log"
python3 - "$OUT" <<'PY'
import json,re,sys,html,base64
from pathlib import Path
p=Path(sys.argv[1]);s=(p/'polish-dom.log').read_text();data=json.loads(html.unescape(re.search(r'<pre id="report">(.*?)</pre>',s,re.S).group(1)));print(data);assert data['ok'],data
(p/'polish-results.json').write_text(json.dumps(data,indent=2))
a=re.search(r'<pre id="png">data:image/png;base64,(.*?)</pre>',s,re.S).group(1);(p/'spritebook.png').write_bytes(base64.b64decode(a))
PY

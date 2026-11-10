#!/usr/bin/env bash
set -euo pipefail
: "${CHROME:?Defina CHROME com o executável Chromium headless de testes}"
BASE=${BASE:-http://127.0.0.1:8087}
OUT=${OUT:-/workspace/brasa-shots}
mkdir -p "$OUT"
for pair in menu:01-hangar mangrove:02-mangue channels:03-canais boss:04-chefe finish:05-epilogo; do
 scene=${pair%%:*}; name=${pair#*:}; profile=$(mktemp -d /tmp/brasa-qa.XXXXXX)
 timeout 30 "$CHROME" --no-sandbox --disable-dev-shm-usage --no-proxy-server --user-data-dir="$profile" --window-size=1280,800 --screenshot="$OUT/$name.png" --virtual-time-budget=1800 --dump-dom "$BASE/tests/browser.html?scene=$scene" > "$OUT/$scene-dom.log" 2> "$OUT/$scene-browser.log"
done
python3 - "$OUT" <<'PY'
import sys,re,json,html
from pathlib import Path
root=Path(sys.argv[1]); reports=[]
for name in ['menu','mangrove','channels','boss','finish']:
    text=(root/(name+'-dom.log')).read_text()
    result=re.search(r'<pre id="report">(.*?)</pre>',text,re.S)
    assert result, f'Missing report: {name}'
    data=json.loads(html.unescape(result.group(1)))
    assert data['ok'], data
    reports.append(data)
(root/'browser-results.json').write_text(json.dumps(reports,indent=2))
print('5 cenários Chromium aprovados; sem erros runtime/recursos detectados.')
PY

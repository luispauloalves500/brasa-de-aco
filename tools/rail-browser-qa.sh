#!/usr/bin/env bash
set -euo pipefail
: "${CHROME:?Defina CHROME com Chromium headless isolado}"
BASE=${BASE:-http://127.0.0.1:8087}; OUT=${OUT:-/workspace/brasa-shots/m2}
mkdir -p "$OUT"
for pair in village:01-vila roofs:02-telhados truck:03-mula boss:04-moloch finish:05-continuar; do
 scene=${pair%%:*}; name=${pair#*:}; profile=$(mktemp -d /tmp/brasa-m2.XXXXXX)
 timeout 40 "$CHROME" --no-sandbox --disable-dev-shm-usage --no-proxy-server --user-data-dir="$profile" --window-size=1280,800 --screenshot="$OUT/$name.png" --virtual-time-budget=1800 --dump-dom "$BASE/tests/rail-browser.html?scene=$scene" > "$OUT/$scene-dom.log" 2> "$OUT/$scene-browser.log"
done
python3 - "$OUT" <<'PY'
import sys,re,json,html
from pathlib import Path
root=Path(sys.argv[1]); reports=[]
for name in ['village','roofs','truck','boss','finish']:
    result=re.search(r'<pre id="report">(.*?)</pre>',(root/(name+'-dom.log')).read_text(),re.S)
    assert result, f'Missing report: {name}'
    data=json.loads(html.unescape(result.group(1)))
    print(name,data)
    assert data['ok'],data
    reports.append(data)
(root/'browser-results.json').write_text(json.dumps(reports,indent=2))
print('5 cenários M2 Chromium aprovados.')
PY

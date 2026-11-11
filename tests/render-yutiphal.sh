#!/bin/sh
# E2 render-output test: sensitive pair (सूर्य-शनि, 15.7 grief-sentence omission)
# must render with generic count-only notice and no category-label leaks.
# Run from repo root: sh tests/render-yutiphal.sh  (needs google-chrome)
set -e
DOM=/tmp/e2-render-dom.html
google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=20000 \
  --dump-dom "file://$PWD/kundli-auto.html#date=2001-05-25" > "$DOM" 2>/dev/null
python3 - "$DOM" <<'PY'
import re,sys
dom=open(sys.argv[1]).read()
m=re.search(r'द्वि-ग्रह युति: परंपरा-वर्णित पंक्तियाँ.*?(?=<section class="astro-panel"><h3>गणना)',dom,re.S)
if not m: print('FAIL: E2 panel missing'); sys.exit(1)
seg=m.group(0); bad=False
if 'सूर्य-शनि' not in seg: print('FAIL: sensitive pair row missing'); bad=True
if '1 वाक्य सुरक्षा-नीति से हटाया गया' not in seg: print('FAIL: generic notice missing'); bad=True
for leak in ['पत्नी-पुत्र','शोक-वाक्य','हिंसा/यातना','इन्द्रिय-दुर्बलता','शस्त्र/विष']:
    if leak in seg: print('FAIL: leak',leak); bad=True
if 'ch16' not in seg: print('FAIL: tri-graha ch16 note missing'); bad=True
print('render-yutiphal:', 'FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)
PY

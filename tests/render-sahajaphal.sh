#!/bin/sh
# E2 render-output test: ch14 sahaja/vikrama panel renders on both reference
# charts with count-only omission notice, limited-scope framing and no
# banned-content leaks. Run from repo root: sh tests/render-sahajaphal.sh (needs google-chrome)
set -e
BAD=0
run_chart(){
  D=$1; T=$2; LABEL=$3
  DOM=/tmp/e2-sahaja-dom-$LABEL.html
  google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=20000 \
    --dump-dom "file://$PWD/kundli-auto.html#date=$D&time=$T&city=3&tab=report" > "$DOM" 2>/dev/null
  python3 - "$DOM" "$LABEL" <<'PY'
import re,sys
dom=open(sys.argv[1]).read(); label=sys.argv[2]
m=re.search(r'भाव-फल: सहज/विक्रम भाव \(BPHS ch14\).*?(?=<section class="astro-panel")',dom,re.S)
if not m: print('FAIL',label,': ch14 panel missing'); sys.exit(1)
seg=m.group(0); bad=False
def need(s,why):
    global bad
    if s not in seg: print('FAIL',label,':',why); bad=True
need('BPHS 14.1','row ref missing')
need('पराक्रम','valor topic missing')
need('11 खंड','omission count missing')
need('जीवन-क्षय','life-loss category missing')
need('जन्म-क्रम','family-structure category missing')
need('परिमित दायरा','limited-scope framing missing')
need('अध्याय-पूर्णता का दावा नहीं','no-complete-claim framing missing')
need('14.5पूर्व','breadth 14.5-first missing')
need('14.15','breadth 14.15 missing')
need('राहु-युति','unmodeled Rahu-leg notice missing')
served='शर्त बनी' in seg.split('</summary>')[0]
print(label,'served=',served)
if served:
    need('परंपरा-कथन: पराक्रम की चर्चा है।','valor text missing when served')
for leak in ['भगिनी','बहन','भाई','सहोदर','भ्रातृ','मृत्यु','विनाश','हन्ति','अल्पायु','दीर्घायु','आयु','रोग','उपाय','मंत्र','रत्न']:
    if leak in seg: print('FAIL',label,': leak',leak); bad=True
print('render-sahajaphal',label+':','FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)
PY
  [ $? -eq 0 ] || BAD=1
}
run_chart 1990-06-15 10:30 ref1990
run_chart 1985-03-10 08:15 ref1985
exit $BAD

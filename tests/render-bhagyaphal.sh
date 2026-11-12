#!/bin/sh
# E2 render-output test: ch20 bhagya panel renders on both reference charts
# with count-only omission notice, limited-scope framing and no
# banned-content leaks. Run from repo root: sh tests/render-bhagyaphal.sh (needs google-chrome)
set -e
BAD=0
run_chart(){
  D=$1; T=$2; LABEL=$3
  DOM=/tmp/e2-bhagya-dom-$LABEL.html
  google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=20000 \
    --dump-dom "file://$PWD/kundli-auto.html#date=$D&time=$T&city=3&tab=report" > "$DOM" 2>/dev/null
  python3 - "$DOM" "$LABEL" <<'PY'
import re,sys
dom=open(sys.argv[1]).read(); label=sys.argv[2]
m=re.search(r'भाव-फल: भाग्य भाव \(BPHS ch20\).*?(?=<section class="astro-panel")',dom,re.S)
if not m: print('FAIL',label,': ch20 panel missing'); sys.exit(1)
seg=m.group(0); bad=False
def need(s,why):
    global bad
    if s not in seg: print('FAIL',label,':',why); bad=True
need('BPHS 20.9','row 20.9 ref missing')
need('BPHS 20.29','row 20.29 ref missing')
need('29 खंड','omission count missing')
need('भाग्य-कथन','fortune category missing')
need('पितृ-स्थिति-कथन','father-state category missing')
need('पितृ-जीवन-काल-कथन','father life-span category missing')
need('आचरण-कथन','conduct category missing')
need('परिमित','limited-scope framing missing')
need('अध्याय-पूर्णता का दावा नहीं','no-complete-claim framing missing')
need('20.32','breadth 20.32 missing')
need('परमोच्च','unmodeled degree notice missing')
need('चरित्र-मूल्यांकन या नैतिक निर्णय नहीं','conduct frame missing')
served9=re.search(r'BPHS 20\.9.*?</summary>',seg,re.S)
if served9 and 'शर्त बनी' in served9.group(0):
    need('पितृभक्ति की चर्चा','20.9 tradition-conditional framing absent when served')
for leak in ['माता','मातृ','जननी','दीर्घ','आयु','मूक','बधिर','वत्सर','मृत्यु','मरण','विनाश','हन्ति','रोग','व्याधि','उपाय','मंत्र','रत्न','भिक्षा']:
    if leak in seg: print('FAIL',label,': leak',leak); bad=True
print('render-bhagyaphal',label+':','FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)
PY
  [ $? -eq 0 ] || BAD=1
}
run_chart 1990-06-15 10:30 ref1990
run_chart 1985-03-10 08:15 ref1985
exit $BAD

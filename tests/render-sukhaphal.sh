#!/bin/sh
# E2 render-output test: ch15 sukha panel renders on both reference charts
# with count-only omission notice, limited-scope framing and no
# banned-content leaks. Run from repo root: sh tests/render-sukhaphal.sh (needs google-chrome)
set -e
BAD=0
run_chart(){
  D=$1; T=$2; LABEL=$3
  DOM=/tmp/e2-sukha-dom-$LABEL.html
  google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=20000 \
    --dump-dom "file://$PWD/kundli-auto.html#date=$D&time=$T&city=3&tab=report" > "$DOM" 2>/dev/null
  python3 - "$DOM" "$LABEL" <<'PY'
import re,sys
dom=open(sys.argv[1]).read(); label=sys.argv[2]
m=re.search(r'भाव-फल: सुख भाव \(BPHS ch15\).*?(?=<section class="astro-panel")',dom,re.S)
if not m: print('FAIL',label,': ch15 panel missing'); sys.exit(1)
seg=m.group(0); bad=False
def need(s,why):
    global bad
    if s not in seg: print('FAIL',label,':',why); bad=True
need('BPHS 15.2','row 15.2 ref missing')
need('BPHS 15.3','row 15.3 ref missing')
need('BPHS 15.4','row 15.4 ref missing')
need('BPHS 15.5','row 15.5 ref missing')
need('BPHS 15.8','row 15.8 ref missing')
need('7 खंड','omission count missing')
need('जीवन-अवधि','life-span category missing')
need('पारिवारिक सुख-कथन','family-happiness category missing')
need('शारीरिक-स्थिति','bodily-state category missing')
need('काल-निर्दिष्ट यान-योग','timed-yoga category missing')
need('परिमित','limited-scope framing missing')
need('अध्याय-पूर्णता का दावा नहीं','no-complete-claim framing missing')
need('15.14उत्तर','breadth 15.14-latter missing')
need('स्वांशक','unmodeled navamsha notice missing')
served55=re.search(r'BPHS 15\.5.*?</summary>',seg,re.S)
if served55 and 'शर्त बनी' in served55.group(0):
    need('बन्धुओं से पूज्यता की चर्चा','15.5 tradition-conditional framing absent when served')
for leak in ['माता','मातृ','जननी','दीर्घ','आयु','मूक','बधिर','वत्सर','मृत्यु','विनाश','हन्ति','रोग','व्याधि','उपाय','मंत्र','रत्न']:
    if leak in seg: print('FAIL',label,': leak',leak); bad=True
print('render-sukhaphal',label+':','FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)
PY
  [ $? -eq 0 ] || BAD=1
}
run_chart 1990-06-15 10:30 ref1990
run_chart 1985-03-10 08:15 ref1985
exit $BAD

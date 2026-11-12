#!/bin/sh
# E2 render-output test: ch17 ripu panel renders on both reference charts with
# the distinct all-omitted intro, count-only omission notice (13/12/1/1),
# limited-scope framing and no banned-content leaks. Zero-served chapter: no
# condition rows may appear. Run from repo root: sh tests/render-riputphal.sh (needs google-chrome)
set -e
BAD=0
run_chart(){
  D=$1; T=$2; LABEL=$3
  DOM=/tmp/e2-ripu-dom-$LABEL.html
  google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=20000 \
    --dump-dom "file://$PWD/kundli-auto.html#date=$D&time=$T&city=3&tab=report" > "$DOM" 2>/dev/null
  python3 - "$DOM" "$LABEL" <<'PY'
import re,sys
dom=open(sys.argv[1]).read(); label=sys.argv[2]
m=re.search(r'भाव-फल: रिपु भाव \(BPHS ch17\).*?(?=<section class="astro-panel")',dom,re.S)
if not m: print('FAIL',label,': ch17 panel missing'); sys.exit(1)
seg=m.group(0); bad=False
def need(s,why):
    global bad
    if s not in seg: print('FAIL',label,':',why); bad=True
def absent(s,why):
    global bad
    if s in seg: print('FAIL',label,':',why); bad=True
need('सभी शर्त-पंक्तियाँ सीमा-नीति से हटाई गई हैं','distinct all-omitted intro missing')
need('27 शर्त-खंड','total omission count missing')
need('13 शारीरिक-स्थिति-कथन','bodily-state category missing')
need('12 काल-निर्दिष्ट-कथन','time-specified category missing')
need('1 शत्रु-धन-हानि-कथन','opposition-loss category missing')
need('1 पारिवारिक-शत्रुता-कथन','family-opposition category missing')
need('17.2 से 17.14','bodily-state span missing')
need('17.15 से 17.25','time-specified span missing')
need('परिमित','limited-scope framing missing')
need('अध्याय-पूर्णता का दावा नहीं','no-complete-claim framing missing')
need('स्थायी निषेध नहीं','not-enduring framing missing')
need('17.1','breadth 17.1 missing')
need('पूर्ण क्रियान्वयन-अंतर','full implementation-gap notice missing')
need('मंदि','Mandi unmodeled disclosure missing')
absent('शर्त बनी','a served-row marker must never appear')
absent('<details>','no condition-row details elements may appear')
for leak in ['रोग','व्याधि','कुष्ठ','व्रण','गण्ड','ज्वर','गुल्म','मेह','स्फोटक','पित्त','वात','क्षय','मृत्यु','मरण','आयु','दीर्घा','अल्पा','मूक','बधिर','अन्ध','पंगु','नेत्र','कण्ठ','नाभि','कुक्षि','चर्म','रक्त','उपाय','मंत्र','रत्न','शत्रु से धन','पुत्र']:
    if leak in seg: print('FAIL',label,': leak',leak); bad=True
print('render-riputphal',label+':','FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)
PY
  [ $? -eq 0 ] || BAD=1
}
run_chart 1990-06-15 10:30 ref1990
run_chart 1985-03-10 08:15 ref1985
exit $BAD

#!/bin/sh
# E2 render-output test: ch19 randhra panel renders on both reference charts with
# the distinct all-omitted intro, count-only omission notice (10/3), limited-scope
# framing and no banned-content leaks. Zero-served chapter: no condition rows may
# appear. Run from repo root: sh tests/render-randhraphal.sh (needs google-chrome)
set -e
BAD=0
run_chart(){
  D=$1; T=$2; LABEL=$3
  DOM=/tmp/e2-randhra-dom-$LABEL.html
  google-chrome --headless --disable-gpu --no-sandbox --virtual-time-budget=20000 \
    --dump-dom "file://$PWD/kundli-auto.html#date=$D&time=$T&city=3&tab=report" > "$DOM" 2>/dev/null
  python3 - "$DOM" "$LABEL" <<'PY'
import re,sys
dom=open(sys.argv[1]).read(); label=sys.argv[2]
m=re.search(r'भाव-फल: रन्ध्र भाव \(BPHS ch19\).*?(?=<section class="astro-panel")',dom,re.S)
if not m: print('FAIL',label,': ch19 panel missing'); sys.exit(1)
seg=m.group(0); bad=False
def need(s,why):
    global bad
    if s not in seg: print('FAIL',label,':',why); bad=True
def absent(s,why):
    global bad
    if s in seg: print('FAIL',label,':',why); bad=True
need('सभी शर्त-पंक्तियाँ सीमा-नीति से हटाई गई हैं','distinct all-omitted intro missing')
need('13 शर्त-खंड','total omission count missing')
need('10 जीवन-काल-कथन','lifespan-domain category missing')
need('3 शिशु-काल-हानि-कथन','earliest-stage-loss category missing')
need('19.1','span start missing')
need('19.15','span end missing')
need('19.10','loss span missing')
need('परिमित','limited-scope framing missing')
need('अध्याय-पूर्णता का दावा नहीं','no-complete-claim framing missing')
need('स्थायी निषेध नहीं','not-enduring framing missing')
need('19.3','breadth 19.3 missing')
need('19.7','breadth 19.7 missing')
need('विधि-सूत्र','method-meta framing missing')
need('पूर्ण क्रियान्वयन-अंतर','full implementation-gap notice missing')
need('नवांश','navamsha unmodeled disclosure missing')
absent('शर्त बनी','a served-row marker must never appear')
absent('<details>','no condition-row details elements may appear')
for leak in ['मृत्यु','मरण','मृत','मारक','आयु','आयुष','दीर्घा','अल्पा','रोग','व्याधि','उपाय','मंत्र','रत्न','भिक्षा','शव']:
    if leak in seg: print('FAIL',label,': leak',leak); bad=True
print('render-randhraphal',label+':','FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)
PY
  [ $? -eq 0 ] || BAD=1
}
run_chart 1990-06-15 10:30 ref1990
run_chart 1985-03-10 08:15 ref1985
exit $BAD

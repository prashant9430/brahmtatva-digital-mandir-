#!/bin/sh
# E3 render-output test: real DOM via headless chrome on kundli-auto.html (local harness, not committed to deploy path)
# Chart A (2000-01-01 09:00 Patna): पाप-कर्तरि बनी -> generic count-only notice, sensitive sentences absent
# Chart B (1992-06-19 07:30 Patna): सुशुभ बनी -> 6.13 methodology note rendered
set -e
cd "$(dirname "$0")/.."
CHROME=${CHROME:-google-chrome}
A=$($CHROME --headless --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "file://$PWD/kundli-auto.html#date=2000-01-01&time=09:00" 2>/dev/null)
echo "$A" | grep -q "पाप-कर्तरि · स्थिति: बनी" || { echo "FAIL: kartari row"; exit 1; }
echo "$A" | grep -q "तकनीकी लोप: 3 वाक्य सुरक्षा-नीति से हटाए गए (ऑडिट दर्ज)" || { echo "FAIL: generic notice"; exit 1; }
PANEL=$(echo "$A" | perl -0777 -ne 'print $1 if /(लग्न\/सूर्य-आधारित योग.*?)(?=गणना-आधारित सार)/s')
for bad in दीर्घायु लघुायु रोग-मुक्त अंग-हीन वियोग अपंग; do
  echo "$PANEL" | grep -q "$bad" && { echo "FAIL: leak $bad"; exit 1; }
done
echo "$A" | grep -q "आंशिक-श्लोक उधार स्पष्ट" || { echo "FAIL: amala partial-verse label"; exit 1; }
B=$($CHROME --headless --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "file://$PWD/kundli-auto.html#date=1992-06-19&time=07:30" 2>/dev/null)
echo "$B" | grep -q "सुशुभ · स्थिति: बनी" || { echo "FAIL: susubha row"; exit 1; }
echo "$B" | grep -q "कोई संश्लेषण नहीं" || { echo "FAIL: 6.13 note"; exit 1; }
echo "$B" | grep -q "Saravali ch14" || { echo "FAIL: mat-bhed note"; exit 1; }
echo "render-lagnayoga: OK"

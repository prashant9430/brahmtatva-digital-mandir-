#!/bin/sh
# E4 render-output test: real DOM via headless chrome on kundli-auto.html (local harness, not committed to deploy path)
# Chart A (2000-01-01 09:00 Patna): all E4 rows नहीं/अमॉडल — gate invariants + source pin render
# Chart B (1991-02-08 11:45 Patna): वसुमत् बनी (लग्न-आधारित) — phal + sloka end-to-end
# Chart C (2001-05-25 13:50 Patna): लक्ष्मी बनी (9L=शुक्र merge) — generic count-only notice; अनिर्णीत rows render no phal
set -e
cd "$(dirname "$0")/.."
CHROME=${CHROME:-google-chrome}
A=$($CHROME --headless --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "file://$PWD/kundli-auto.html#date=2000-01-01&time=09:00" 2>/dev/null)
echo "$A" | grep -q "विशेष योग: महाभाग्य, वसुमत्, पुष्कल" || { echo "FAIL: e4 panel title"; exit 1; }
echo "$A" | grep -q "महाभाग्य · स्थिति: अमॉडल" || { echo "FAIL: mahabhagya अमॉडल row"; exit 1; }
echo "$A" | grep -q "फल-पंक्ति (6.15) नहीं दिखाई जाती" || { echo "FAIL: 6.15 no-render statement"; exit 1; }
echo "$A" | grep -q "upachaya = 3/6/10/11, BPHS 7.36 (vedicpupil) पिन" || { echo "FAIL: vasumat 7.36 pin"; exit 1; }
echo "$A" | grep -q "translation-anomaly" || { echo "FAIL: 6.21 anomaly note"; exit 1; }
PANELA=$(echo "$A" | perl -0777 -ne 'print $1 if /(विशेष योग: महाभाग्य.*?)(?=गणना-आधारित सार)/s')
for bad in दीर्घायु अस्सी रोग-मुक्त अरोगी वध आयुस्मान; do
  echo "$PANELA" | grep -q "$bad" && { echo "FAIL: e4 leak $bad"; exit 1; }
done
# no phal rendered in chart A (no बनी row): परंपरा में वर्णित must not appear inside e4 panel
echo "$PANELA" | grep -q "परंपरा में वर्णित</strong>" && { echo "FAIL: unexpected phal in all-नहीं chart"; exit 1; }
B=$($CHROME --headless --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "file://$PWD/kundli-auto.html#date=1991-02-08&time=11:45" 2>/dev/null)
echo "$B" | grep -q "वसुमत् · स्थिति: बनी" || { echo "FAIL: vasumat बनी row"; exit 1; }
echo "$B" | grep -q "सदैव गृह-स्थिति रखने वाला और प्रचुर धन वाला होने का वर्णन।" || { echo "FAIL: vasumat phal"; exit 1; }
C=$($CHROME --headless --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "file://$PWD/kundli-auto.html#date=2001-05-25&time=13:50" 2>/dev/null)
echo "$C" | grep -q "लक्ष्मी · स्थिति: बनी" || { echo "FAIL: lakshmi बनी row"; exit 1; }
echo "$C" | grep -q "दोनों भूमिका एक ही ग्रह में" || { echo "FAIL: 9L=Venus merge reason"; exit 1; }
echo "$C" | grep -q "तकनीकी लोप: 1 वाक्य/पद सुरक्षा-नीति से हटाए गए (ऑडिट दर्ज)" || { echo "FAIL: lakshmi generic count-only notice"; exit 1; }
echo "$C" | grep -q "वसुमत् · स्थिति: अनिर्णीत" || { echo "FAIL: vasumat अनिर्णीत row"; exit 1; }
# अनिर्णीत rows carry no phal: the three अनिर्णीत details blocks must not contain परंपरा में वर्णित
PANELC=$(echo "$C" | perl -0777 -ne 'print $1 if /(विशेष योग: महाभाग्य.*?)(?=गणना-आधारित सार)/s')
BAD=$(echo "$PANELC" | perl -0777 -ne 'while(/<details><summary>([^<]*अनिर्णीत[^<]*)<\/summary>(.*?)<\/details>/gs){print "$1\n" if $2=~/परंपरा में वर्णित/}')
[ -z "$BAD" ] || { echo "FAIL: phal leaked into अनिर्णीत row: $BAD"; exit 1; }
echo "render-visheshyoga: OK"

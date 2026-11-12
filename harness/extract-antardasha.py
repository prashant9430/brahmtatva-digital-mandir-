#!/usr/bin/env python3
"""Fetch jyotishvidya.com BPHS ch52-60 and extract all 81 antardasha pair
segments (mahaLord-antarLord) with sloka-range refs into JSON.

Source: same single unnamed online translation as ch47/48/3; print-verse
verification pending. Known source conditions (recorded in
docs/antardasha-ledger-draft.md):
  - ch58 Ketu pair (6-8½, 9-11, 12) has NO 'Antar Dasha of Ketu' intro
    phrase in the online text; ownership assigned positionally per the
    verified ch58 map.
  - Genuine verse gaps in the online text: ch58 verse 50, ch59 verse 66.
  - ch58 Mangal range printed as '3-44½' (OCR typo for 43-44½).
  - Typography variants handled: ch55 '54-55½,' (comma terminator),
    ch56 '23-24' (no period), ch60 title without period after 'Chapter 60'.

Ownership validation: every pair's first section must name its antar lord
in an 'Antar Dasha of X' phrase (80/81 pairs); intros must follow the
vimshottari wrap order from the mahadasha lord; section verse numbers must
be contiguous per chapter except the two known gaps.

Usage: python3 harness/extract-antardasha.py /tmp/ad-segments.json
"""
import re, html, json, sys, urllib.request

LORDS_S = {'Surya':'Sun','Candr':'Moon','Mangal':'Mars','Rahu':'Rahu',
           'Guru':'Jupiter','Sani':'Saturn','Budh':'Mercury','Ketu':'Ketu','Sukr':'Venus'}
VIM = ['Surya','Candr','Mangal','Rahu','Guru','Sani','Budh','Ketu','Sukr']
CH = {'52':'Surya','53':'Candr','54':'Mangal','55':'Rahu','56':'Guru',
      '57':'Sani','58':'Budh','59':'Ketu','60':'Sukr'}
MARKER = r'(\b\d+(?:\s*-\s*\d+)?(?:\s*[½¼¾])?[.,]?\s+(?=[A-Z“‘(]))'
KNOWN_GAPS = {'58': [(49, 51)], '59': [(65, 67)]}  # (prev_end, next_start)
CH58_MAP = [('Budh',['1-3½','4-5']),('Ketu',['6-8½','9-11','12']),
            ('Sukr',['13-15½','16-17½','18-19']),('Surya',['20-22','23-24','25']),
            ('Candr',['26-27','28-29½','30-31½','32-33','34-35']),
            ('Mangal',['36-38½','39-40½','41-42','3-44½','45-46']),
            ('Rahu',['47-49','51','52-53','54-55']),
            ('Guru',['56-58½','59-61','62-63½','64-64½','65-66']),
            ('Sani',['67-68½','69-70½','71-72'])]

def body(url):
    raw = urllib.request.urlopen(url, timeout=30).read().decode('cp1252', errors='replace')
    txt = re.sub(r'<script.*?</script>|<style.*?</style>', '', raw, flags=re.S|re.I)
    txt = re.sub(r'<[^>]+>', ' ', txt)
    txt = html.unescape(txt)
    return re.sub(r'\s+', ' ', txt).strip()

def rng(m):
    a = re.match(r'(\d+)(?:\s*-\s*(\d+))?', m)
    return int(a.group(1)), int(a.group(2) or a.group(1))

def extract(fetch=body):
    segments = {}
    for ch, maha in CH.items():
        t = fetch(f'http://jyotishvidya.com/ch{ch}.htm')
        h = re.search(r'Chapter\s+' + ch + r'\.?\s*Antar Dasa[s]? of (\w+)', t)
        assert h and (LORDS_S[maha] in h.group(0) or maha in h.group(0)), (ch, h and h.group(0))
        t = t[h.end():]
        parts = re.split(MARKER, t)
        secs = []
        for i in range(1, len(parts), 2):
            mk = parts[i].strip().rstrip('.,').strip()
            secs.append([mk, (parts[i+1] if i+1 < len(parts) else '').strip()])
        # verse contiguity (allow only known genuine gaps)
        for i in range(1, len(secs)):
            _, pe = rng(secs[i-1][0]); cs, _ = rng(secs[i][0])
            if secs[i][0] == '3-44½': cs = 43
            if cs != pe + 1:
                assert (pe, cs) in KNOWN_GAPS.get(ch, []), (ch, secs[i-1][0], secs[i][0])
        # ownership
        if ch == '58':
            owner = {m: l for l, ms in CH58_MAP for m in ms}
            assert set(owner) == {s[0] for s in secs}, (set(owner) ^ {s[0] for s in secs})
            for s in secs: s.append(owner[s[0]])
        else:
            pat = re.compile(r'Antar Dasha[s]? of (\w+)\b')
            start = VIM.index(maha); order = [VIM[(start+k) % 9] for k in range(9)]
            cur = None; nexti = 0; named = []
            for s in secs:
                m = pat.search(s[1])
                if m and m.group(1) in LORDS_S:
                    cand = m.group(1); exp = order[nexti] if nexti < 9 else None
                    if cand == exp and cand != cur:
                        cur = cand; nexti += 1; named.append(cand)
                assert cur, (ch, s[0])
                s.append(cur)
            assert named == order, (ch, named, order)
        for marker, txt, owner in secs:
            key = LORDS_S[maha] + '-' + LORDS_S[owner]
            p = segments.setdefault(key, {'maha': LORDS_S[maha], 'antar': LORDS_S[owner],
                                          'ch': ch, 'refs': [], 'text': ''})
            p['refs'].append(marker)
            p['text'] += (' ' if p['text'] else '') + (marker + '. ' + txt)
    return segments

def validate(segments):
    assert len(segments) == 81, f'expected 81 pairs, got {len(segments)}'
    s_of_e = {v: k for k, v in LORDS_S.items()}
    missing_intro = []
    for k, p in segments.items():
        assert p['refs'], f'no refs: {k}'
        assert re.search(r'[.!?]$', p['text']), f'bad tail: {k}'
        m = re.search(r'Antar Dasha[s]? of (\w+)\b', p['text'])
        if not (m and m.group(1) == s_of_e[p['antar']]):
            missing_intro.append(k)
    assert missing_intro == ['Mercury-Ketu'], missing_intro
    return missing_intro

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/tmp/ad-segments.json'
    seg = extract()
    validate(seg)
    json.dump(seg, open(out, 'w'), ensure_ascii=False, indent=1)
    print('OK 81 pairs ->', out, '(Mercury-Ketu: positional per verified ch58 map)')

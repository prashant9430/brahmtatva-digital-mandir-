#!/usr/bin/env python3
# Independent drik-bala derivation straight from BPHS ch26 slabs + 27.19.
# Written from the cached translations (/downloads/sources/): jyotishvidya ch26/27,
# siva.sh 26.6-8 + 27.19-20, vedicpupil chapter-26 (Sanskrit 26.6 decisive on
# orientation: drishyaat vishodhya drashtaaram = aspected MINUS aspecting).
# NOT ported from kundli-bala.js; comparison happens in the fixture report.
import json

def mod(d): return d % 360.0

def drishti_value(d, planet):
    d = mod(d)
    x = d % 30.0
    sg = int(d // 30)
    # Special aspecting-planet rules (26.9-12) take precedence for those planets
    if planet == 'Saturn':            # 26.9-10
        if sg == 1: return 2 * x
        if sg == 9: return 2 * (30 - x)
        if sg == 2: return 60 - x / 2
        if sg == 8: return x + 30
    if planet == 'Mars':              # 26.11
        if sg in (3, 7): return 60 - x
        if sg == 2: return 1.5 * x + 15
        if sg == 6: return 60.0
    if planet == 'Jupiter':           # 26.12
        if sg in (3, 7): return x / 2 + 45
        if sg in (4, 8): return 60 - x
    # General slabs (26.6-9)
    if d < 30:  return 0.0            # same sign: no slab given -> no aspect
    if d < 60:  return (d - 30) / 2   # >1 sign: degrees beyond halved
    if d < 90:  return d - 45         # >2 signs: degrees beyond + 15
    if d < 120: return 30 + (120 - d) / 2  # >3: (120-d)/2 + 30
    if d < 150: return 150 - d        # >4: 150 - d
    if d < 180: return 2 * (d - 150)  # >5: degrees beyond doubled
    if d < 300: return (300 - d) / 2  # >6: (300 - d)/2
    return 0.0

def sgn(lon): return int(mod(lon) // 30)

def benefic(p, L):
    # ch3.11 convention (recorded in bala ledger): waxing Moon benefic;
    # Mercury malefic only when sharing a sign with Sun/Mars/Saturn.
    if p == 'Moon':  return mod(L['Moon'] - L['Sun']) < 180
    if p == 'Mercury': return not any(sgn(L[g]) == sgn(L['Mercury']) for g in ('Sun', 'Mars', 'Saturn'))
    return p in ('Jupiter', 'Venus')

PL = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn']

def report(name, L):
    print(f'== {name}')
    for k in PL: print(f'  {k:8s} {mod(L[k]):9.4f}  sign {sgn(L[k])}')
    for me in PL:
        tot, tot_lit = 0.0, 0.0
        rows = []
        for o in PL:
            if o == me: continue
            v = drishti_value(L[me] - L[o], o)
            if v <= 0: continue
            ben = benefic(o, L)
            if o in ('Jupiter',): c, c_lit = v, v
            elif o == 'Mercury':   c = v if ben else -v / 4; c_lit = v   # Mercury-unconditional-full (still REPLACEMENT weighting, not literal 27.19 quarter-plus-superadd)
            else:                c = c_lit = (v / 4 if ben else -v / 4)
            tot += c; tot_lit += c_lit
            rows.append(f'    from {o:8s} d={mod(L[me]-L[o]):8.3f} sg={int(mod(L[me]-L[o])//30):2d} v={v:7.3f} {"ben" if ben else "mal"} -> {c:+8.3f}')
        print(f'  {me}: drik={tot:+.4f} (Mercury-unconditional-full, replacement model: {tot_lit:+.4f})')
        for r in rows: print(r)

if __name__ == '__main__':
    import sys
    fixtures = json.load(open(sys.argv[1]))
    for f in fixtures: report(f['name'], f['longitudes'])

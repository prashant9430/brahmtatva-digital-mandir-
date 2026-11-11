const S=require('../kundli-states.js');
let pass=0,fail=0;
function ck(id,actual,expected){const ok=JSON.stringify(actual)===JSON.stringify(expected);ok?pass++:fail++;console.log((ok?'PASS ':'FAIL ')+id+' | actual='+JSON.stringify(actual)+' expected='+JSON.stringify(expected));}
const nm=(g,lon)=>S.baladi(g,lon).name;
// BPHS 45.3 expected: odd signs (Mesha=1st) forward B,K,Y,V,M at 6-deg bands; even signs reversed
// exact band starts, odd sign Mesha (lon 0-30)
ck('odd 0.0',nm('Sun',0),'बाल'); ck('odd 6.0',nm('Sun',6),'कुमार'); ck('odd 12.0',nm('Sun',12),'युवा');
ck('odd 18.0',nm('Sun',18),'वृद्ध'); ck('odd 24.0',nm('Sun',24),'मृत'); ck('odd 29.999999',nm('Sun',29.999999),'मृत');
// just-below each boundary stays in lower band
ck('odd 5.999999',nm('Sun',5.999999),'बाल'); ck('odd 11.999999',nm('Sun',11.999999),'कुमार');
ck('odd 17.999999',nm('Sun',17.999999),'युवा'); ck('odd 23.999999',nm('Sun',23.999999),'वृद्ध');
// even sign Vrishabha (30-60): reversed
ck('even 30.0',nm('Sun',30),'मृत'); ck('even 36.0',nm('Sun',36),'वृद्ध'); ck('even 42.0',nm('Sun',42),'युवा');
ck('even 48.0',nm('Sun',48),'कुमार'); ck('even 54.0',nm('Sun',54),'बाल'); ck('even 59.999999',nm('Sun',59.999999),'बाल');
ck('even 35.999999',nm('Sun',35.999999),'मृत');
// sign-boundary wrap
ck('wrap 360',nm('Sun',360),'बाल'); ck('wrap -0.000001',nm('Sun',-0.000001),'बाल'); // 359.999999 -> Meena(even) 29.999999 -> reversed band4 -> Bala
ck('wrap 30.0',nm('Sun',30.0),'मृत'); // 30.0 is Vrishabha 0.0, not Mesha 30
ck('neg -6',nm('Sun',-6),'बाल'); // 354 = Meena 24.0 -> even reversed band4 -> Bala
// every sign forward/reverse orientation
const fwd=['बाल','कुमार','युवा','वृद्ध','मृत'],rev=[...fwd].reverse();
for(let s=0;s<12;s++)for(let b=0;b<5;b++)ck('grid s'+s+' b'+b,nm('Moon',s*30+b*6+3),(s%2===0?fwd:rev)[b]);
// FP-near-boundary snap (stated convention)
ck('snap 6-1e-13',nm('Sun',6-1e-13),'कुमार'); // within snap window -> treated as boundary
ck('nosnap 6-1e-9',nm('Sun',6-1e-9),'बाल');  // outside snap window -> lower band
// scope guards
ck('Rahu unavailable',S.baladi('Rahu',15).available,false);
ck('Asc unavailable',S.baladi('Ascendant',15).available,false);
let threw=0;for(const v of [NaN,Infinity,-Infinity,'15',null,undefined]){try{S.baladi('Moon',v);}catch(e){threw++;}}
ck('throws on bad longitude',threw,6);
// periodicity
let per=true;for(let lon=-700;lon<700;lon+=13)if(JSON.stringify(S.baladi('Mars',lon))!==JSON.stringify(S.baladi('Mars',lon+1080)))per=false;
ck('periodic mod 360',per,true);
// labels present
const r=S.baladi('Venus',100);
ck('labels',[r.source,r.boundaryConvention,typeof r.scope],['BPHS45.3','lower-inclusive, upper-exclusive','string']);
console.log('\n'+pass+'/'+(pass+fail)+' passed');process.exit(fail?1:0);

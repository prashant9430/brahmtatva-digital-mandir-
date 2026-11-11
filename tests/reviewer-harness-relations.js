const R=require('../kundli-relations.js');
let pass=0,fail=0;
function ck(id,a,e){const ok=JSON.stringify(a)===JSON.stringify(e);ok?pass++:fail++;if(!ok)console.log('FAIL '+id+' | actual='+JSON.stringify(a)+' expected='+JSON.stringify(e));}
// Independent 42-cell standard table (Santhanam reading of BPHS 3.55):
// f=1 friend, e=-1 enemy, n=0 neutral
const T={
Sun:    {Moon:1,Mars:1,Jupiter:1,Mercury:0,Venus:-1,Saturn:-1},
Moon:   {Sun:1,Mercury:1,Mars:0,Jupiter:0,Venus:0,Saturn:0},
Mars:   {Sun:1,Moon:1,Jupiter:1,Mercury:-1,Venus:0,Saturn:0},
Mercury:{Sun:1,Venus:1,Moon:-1,Mars:0,Jupiter:0,Saturn:0},
Jupiter:{Sun:1,Moon:1,Mars:1,Mercury:-1,Venus:-1,Saturn:0},
Venus:  {Mercury:1,Saturn:1,Sun:-1,Moon:-1,Mars:0,Jupiter:0},
Saturn: {Mercury:1,Venus:1,Sun:-1,Moon:-1,Mars:-1,Jupiter:0}};
for(const p of Object.keys(T))for(const q of Object.keys(T[p]))ck('natural '+p+'->'+q,R.natural(p,q),T[p][q]);
// Directional asymmetries explicitly
ck('asym Mercury/Moon',[R.natural('Mercury','Moon'),R.natural('Moon','Mercury')],[-1,1]);
ck('asym Jupiter/Venus',[R.natural('Jupiter','Venus'),R.natural('Venus','Jupiter')],[-1,0]);
ck('asym Saturn/Mars',[R.natural('Saturn','Mars'),R.natural('Mars','Saturn')],[-1,0]);
// Temporary: 2,3,4,10,11,12 friend; 1,5,6,7,8,9 enemy (whole-sign inclusive)
const exp={1:-1,2:1,3:1,4:1,5:-1,6:-1,7:-1,8:-1,9:-1,10:1,11:1,12:1};
for(let h=1;h<=12;h++){const r=R.relation('Sun','Moon',0,(h-1)*30+15);ck('temp h'+h,[r.relativeSign,r.temporary],[h,exp[h]]);}
// Temporary symmetric for all sign pairs
let sym=true;for(let a=0;a<12;a++)for(let b=0;b<12;b++)if(R.relation('Sun','Moon',a*30+5,b*30+5).temporary!==R.relation('Moon','Sun',b*30+5,a*30+5).temporary)sym=false;
ck('temp symmetric',sym,true);
// Compound: n+t additive with labels; all six combos
const combo=(n,lon)=>(r=>([r.natural,r.temporary,r.compound,r.compoundLabel]))(R.relation('Sun',['Moon','Mercury','Venus'][[1,0,-1].indexOf(n)],1,lon));
ck('cmp f+f',combo(1,31),[1,1,2,'अधिमित्र']);
ck('cmp n+f',combo(0,31),[0,1,1,'मित्र']);
ck('cmp e+f',combo(-1,31),[-1,1,0,'सम']);
ck('cmp f+e',combo(1,1),[1,-1,0,'सम']);
ck('cmp n+e',combo(0,1),[0,-1,-1,'शत्रु']);
ck('cmp e+e',combo(-1,1),[-1,-1,-2,'अधिशत्रु']);
// Sign boundaries
ck('b 29.999999 same',R.relation('Sun','Moon',0,29.999999).relativeSign,1);
ck('b 30.0 next',R.relation('Sun','Moon',0,30).relativeSign,2);
ck('b snap 30-1e-12',R.relation('Sun','Moon',0,30-1e-12).relativeSign,2);
ck('b nosnap 30-1e-8',R.relation('Sun','Moon',0,30-1e-8).relativeSign,1);
ck('b -1 -> 12th',R.relation('Sun','Moon',0,-1).relativeSign,12);
ck('b wrap 360=0',R.relation('Sun','Moon',359,360+29).relativeSign,2);
// Guards
let th=0;for(const p of ['Rahu','Ketu','Ascendant','Uranus','sun',null,7,{}]){try{R.natural(p,'Moon');}catch(e){th++;}}
ck('bad planet throws',th,8);
th=0;for(const v of [NaN,Infinity,-Infinity,'30',null,undefined,[],{}]){try{R.relation('Sun','Moon',v,0);}catch(e){th++;}try{R.relation('Sun','Moon',0,v);}catch(e){th++;}}
ck('bad longitude throws',th,16);
ck('self natural',R.natural('Sun','Sun'),null);
ck('self relation',R.relation('Sun','Sun',0,0).available,false);
// Row API
const fix={Sun:0,Moon:31,Mars:62,Mercury:93,Jupiter:124,Venus:155,Saturn:186};
ck('row length',R.row('Sun',fix).length,6);
ck('row entry',(()=>{const r=R.row('Sun',fix).find(x=>x.to==='Moon');return [r.natural,r.relativeSign,r.temporary,r.compoundLabel];})(),[1,2,1,'अधिमित्र']);
th=0;for(const x of [null,[],{},Object.assign({},fix,{Saturn:'186'}),Object.assign({},fix,{Saturn:undefined})]){try{R.row('Sun',x);}catch(e){th++;}}
ck('row bad map throws',th,5);
console.log(pass+'/'+(pass+fail)+' passed');process.exit(fail?1:0);

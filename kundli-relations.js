/* Original named-rule implementation. BPHS3.49,51-58, seven visible planets.
   Natural friendship is directional. No personal/social inference or strength score. */
(function(root){'use strict';
const planets=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const lord=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
const moola={Sun:4,Moon:1,Mars:0,Mercury:5,Jupiter:8,Venus:6,Saturn:10};
const exalt={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6};
const labels={natural:{'-1':'शत्रु','0':'सम','1':'मित्र'},compound:{'-2':'अधिशत्रु','-1':'शत्रु','0':'सम','1':'मित्र','2':'अधिमित्र'}};
const mod=(x,n)=>((x%n)+n)%n;
function checkPlanet(p){if(!planets.includes(p))throw new Error('Relationship requires one of seven visible classical planets');}
function sign(lon){if(typeof lon!=='number'||!Number.isFinite(lon))throw new Error('Finite numeric longitude required');let q=mod(lon,360)/30;const near=Math.round(q);if(Math.abs(q-near)<=1e-11)q=near;return mod(Math.floor(q),12);}
function natural(from,to){checkPlanet(from);checkPlanet(to);if(from===to)return null;const friends=new Set(),enemies=new Set();for(let i=0;i<12;i++){const h=mod(i-moola[from],12)+1;([2,4,5,8,9,12].includes(h)?friends:enemies).add(lord[i]);}friends.add(lord[exalt[from]]);return friends.has(to)?(enemies.has(to)?0:1):-1;}
function relation(from,to,fromLongitude,toLongitude){checkPlanet(from);checkPlanet(to);const a=sign(fromLongitude),b=sign(toLongitude);if(from===to)return {available:false,reason:'Self-relationship is not classified'};const n=natural(from,to),house=mod(b-a,12)+1,t=[2,3,4,10,11,12].includes(house)?1:-1,c=n+t;return {available:true,from,to,natural:n,naturalLabel:labels.natural[n],relativeSign:house,temporary:t,temporaryLabel:labels.natural[t],compound:c,compoundLabel:labels.compound[c],source:'BPHS3.55-58',counting:'inclusive whole-sign from first planet; lower-inclusive sign boundary; snap 1e-11 sign units',scope:'Seven visible classical planets. Traditional planetary categories, not claims about people, compatibility, health or outcomes.'};}
function row(from,positions){checkPlanet(from);if(!positions||typeof positions!=='object'||Array.isArray(positions))throw new Error('Planet longitude map required');for(const p of planets)sign(positions[p]);return planets.filter(p=>p!==from).map(to=>relation(from,to,positions[from],positions[to]));}
const api={planets:Object.freeze(planets.slice()),natural,relation,row};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmRelations=api;
})(typeof window!=='undefined'?window:globalThis);

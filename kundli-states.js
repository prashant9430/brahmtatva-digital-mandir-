/* Original degree-band implementation. BPHS45.3, not a health/age reading.
Sources: https://www.siva.sh/brihat-parashara-hora-shastra/45/1-5
http://jyotishvidya.com/ch45.htm
Boundary convention [lower,upper), with floating-point snap within1e-11.
Conservative scope: seven classical visible planets; no ascendant or nodes.
*/
(function(root){'use strict';
const grahas=new Set(['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']);
function baladi(graha,longitude){
 if(!grahas.has(graha))return {available:false,reason:'Not assigned to this body in this implementation'};
 if(typeof longitude!=='number'||!Number.isFinite(longitude))throw Error('Finite numeric longitude required');
 const lon=((longitude%360)+360)%360,sign=Math.floor(lon/30),degrees=lon%30,raw=degrees/6,near=Math.round(raw),snapped=Math.abs(raw-near)<1e-11?near:raw,band=Math.min(4,Math.floor(snapped)),index=sign%2===0?band:4-band;
 return {available:true,name:['बाल','कुमार','युवा','वृद्ध','मृत'][index],index,sign,band,source:'BPHS45.3',boundaryConvention:'lower-inclusive, upper-exclusive',distanceToBoundary:Math.min(degrees%6,6-degrees%6),scope:'Traditional degree-band name only; not the person\'s age, health or lifespan'};
}
const api={baladi};root.BrahmStates=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

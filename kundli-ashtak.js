/* Original transcription of contributor sets by house from BPHS66 online reading,
verses 44-60 and Lagna lists 61-68 at vedicpupil.in. Not copied from a program/table artifact.
S Sun, M Moon, A Mars, B Mercury, J Jupiter, V Venus, T Saturn, L Lagna.
Sthana/repha treated as a contributed point in the modern BAV convention. */
(function(root){'use strict';
const rows={
Sun:['TAS','TAS','BML','LS TA','JB','LVBJM','SATV','SAT','SATBJ','LS TABM','LS MABJT','LVB'],
Moon:['BMJ','AJ','BSMATLV','JVB','ABVT','SMATL','SMJBV','SBJ','VM','BSMA LJV','SBMAJ VTL',''],
Mars:['LTA','A','LBMS','TA','BS','BMJSLV','TA','TAV','T','ASJTL','SBMAJVTL','JV'],
Mercury:['LTAVB','LAMVT','VB','LMTVA','BSV','JBSML','AT','ATL MVJ','TASBV','LTABM','SBMAJVTL','JBS'],
Jupiter:['JLASB','JLASBMV','TJS','JLASB','VMLBT','VLBT','LAJSM','JSA','VSLMB','JBASVL','SBMAJVL','T'],
Venus:['LVM','LVM','LVMBTA','LV MTA','LBMJTV','BA','','VSMJLT','BMAJVTL','VJT','SBMAJVTL','AMS'],
Ascendant:['TBVJA','BJV','LSMATV','SBJVT','JV','LSMABJT','J','BV','JV','LSMABJT','LSMABJT','SM'],
Saturn:['SL','S','LMAT','LS','JTA','BMAJVTL','S','SB','B','SALB','SBMAJVTL','ABJV']
};
const key={S:'Sun',M:'Moon',A:'Mars',B:'Mercury',J:'Jupiter',V:'Venus',T:'Saturn',L:'Ascendant'};
function ashtakvarga(planets,lagna){if(typeof lagna!=='number'||!Number.isFinite(lagna)||lagna<0||lagna>=360)throw Error('Lagna must be a finite longitude in [0,360)');if(!Array.isArray(planets))throw Error('Planets must be an array');const signs={Ascendant:Math.floor(lagna/30)},required=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];for(const p of planets){if(!p||!required.includes(p.graha))continue;if(Object.hasOwn(signs,p.graha))throw Error('Duplicate contributor '+p.graha);if(typeof p.rashi!=='number'||!Number.isInteger(p.rashi)||p.rashi<0||p.rashi>11)throw Error('Invalid sign for '+p.graha+': expected integer 0..11');signs[p.graha]=p.rashi;}for(const name of required)if(!Object.hasOwn(signs,name))throw Error('Missing contributor '+name);const bav={},detail={};for(const [target,hs] of Object.entries(rows)){const values=Array(12).fill(0),contributors=Array.from({length:12},()=>[]);hs.forEach((letters,h)=>{for(const c of new Set(letters.replace(/\s/g,''))){const name=key[c],sign=signs[name];if(sign===undefined)throw Error('Missing contributor '+name);const dest=(sign+h)%12;values[dest]++;contributors[dest].push(name+' / '+(h+1));}});bav[target]=values;detail[target]=contributors;}const sav=Array.from({length:12},(_,i)=>Object.entries(bav).filter(([k])=>k!=='Ascendant').reduce((sum,[k,v])=>sum+v[i],0));return {bav,sav,detail};}
const api={ashtakvarga};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.BrahmAshtak=api;
})(typeof window!=='undefined'?window:globalThis);

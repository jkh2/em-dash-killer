const fs=require('fs'), E=require('./testable.js');
function gut(t){const a=t.indexOf('*** START');if(a>-1)t=t.slice(t.indexOf('\n',a));
  const b=t.indexOf('*** END');if(b>-1)t=t.slice(0,b);return t;}
function passages(text,limit){ // realistic paste-sized chunks
  const paras=text.split(/\n\s*\n/).map(p=>p.replace(/[ \t]+/g,' ').trim()).filter(p=>p.length>200);
  const out=[]; for(let i=0;i+3<=paras.length&&out.length<limit;i+=3) out.push(paras.slice(i,i+3).join('\n\n'));
  return out;
}
function scoreOf(t){ const s=E.splitSentences(t), w=E.wordCount(t);
  if(s.length<5||w<120) return null;
  return E.score(E.analyzeCadence(s), E.scanStructure(t,s,w).raw, w); }
function q(a,p){const s=a.slice().sort((x,y)=>x-y);return s[Math.floor((s.length-1)*p)];}

const groups={};
fs.readdirSync('corpus').forEach(f=>{ (groups.literary=groups.literary||[]).push(...passages(gut(fs.readFileSync('corpus/'+f,'utf8')),120)); });
fs.readdirSync('modern').forEach(f=>{const t=fs.readFileSync('modern/'+f,'utf8'); if(t.trim()) (groups.modern=groups.modern||[]).push(...passages(t,400));});

console.log('HUMAN-WRITTEN PASSAGES — overall flatness score distribution');
console.log('group        n     p50   p75   p90   p95   >=45 ("leaning flat")  >=65 ("flat")');
const all=[];
for(const g of Object.keys(groups)){
  const sc=groups[g].map(scoreOf).filter(Boolean).map(x=>x.overall);
  if(!sc.length) continue; all.push(...sc);
  const pc=v=>(sc.filter(x=>x>=v).length/sc.length*100).toFixed(1)+'%';
  console.log(g.padEnd(12)+String(sc.length).padStart(4)+'  '+
    [0.5,0.75,0.9,0.95].map(p=>String(q(sc,p)).padStart(5)).join('')+
    pc(45).padStart(14)+pc(65).padStart(16));
}
const pc=v=>(all.filter(x=>x>=v).length/all.length*100).toFixed(1)+'%';
console.log('\nCOMBINED (n='+all.length+'):  median '+q(all,0.5)+
  '   flagged "leaning flat" or worse: '+pc(45)+'   "flat" or worse: '+pc(65));

// component breakdown on human prose
const comps=groups.modern.map(scoreOf).filter(Boolean);
['cadence','punct','struct','vocab'].forEach(k=>{
  const v=comps.map(x=>x[k]);
  console.log('  '+k.padEnd(9)+' median '+String(q(v,0.5)).padStart(3)+'  p90 '+String(q(v,0.9)).padStart(3));
});

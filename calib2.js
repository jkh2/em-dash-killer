const fs=require('fs'), E=require('./testable.js');
function cv(a){const m=a.reduce((x,y)=>x+y,0)/a.length;return m?Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/a.length)/m:0;}
function q(a,p){const s=a.slice().sort((x,y)=>x-y);return s[Math.floor((s.length-1)*p)];}
function runs(L,win,min){const n=L.length;let out=[],i=0;
  while(i<n){let lo=L[i],hi=L[i],j=i;
    while(j+1<n){const nl=Math.min(lo,L[j+1]),nh=Math.max(hi,L[j+1]);if(nh-nl>win)break;lo=nl;hi=nh;j++;}
    if(j-i+1>=min)out.push([i,j]);i=(j>i)?j+1:i+1;}return out;}
function lens(text,limit){
  const paras=text.split(/\n\s*\n/).map(p=>p.replace(/\s+/g,' ').trim())
    .filter(p=>p.length>300 && (p.match(/"/g)||[]).length<4);
  const L=[]; paras.slice(0,limit).forEach(p=>E.splitSentences(p).forEach(s=>{if(s.words>=3&&s.words<=90)L.push(s.words);}));
  return L;
}
function gutClean(t){const a=t.indexOf('*** START');if(a>-1)t=t.slice(t.indexOf('\n',a));
  const b=t.indexOf('*** END');if(b>-1)t=t.slice(0,b);return t;}

const sets={literary:[],modern:[]};
fs.readdirSync('corpus').forEach(f=>sets.literary.push(...lens(gutClean(fs.readFileSync('corpus/'+f,'utf8')),400)));
fs.readdirSync('modern').forEach(f=>{const t=fs.readFileSync('modern/'+f,'utf8'); if(t.trim()) sets.modern.push(...lens(t,600));});

function win(L,s){const o=[];for(let i=0;i+s<=L.length;i+=s)o.push(L.slice(i,i+s));return o;}
console.log('corpus      sents   cv p05   p25   p50   p75');
const pools={};
for(const k of Object.keys(sets)){
  if(sets[k].length<200){console.log(k,'insufficient');continue;}
  const w=win(sets[k],10).map(cv); pools[k]=w;
  console.log(k.padEnd(12)+String(sets[k].length).padStart(5)+'   '+
    [0.05,0.25,0.50,0.75].map(p=>q(w,p).toFixed(3)).join(' '));
}
const combined=[].concat(...Object.values(pools));
console.log('\ncombined human baseline (n='+combined.length+' windows):');
[0.02,0.05,0.10,0.25,0.50].forEach(p=>console.log('  p'+String(Math.round(p*100)).padStart(2,'0')+'  '+q(combined,p).toFixed(3)));

console.log('\n=== flat-run false-positive rate on human prose ===');
console.log('win/min   literary   modern');
[[6,4],[5,4],[4,4],[6,5],[5,5],[4,5],[3,4]].forEach(([w,m])=>{
  const r=k=>{const ws=win(sets[k],10);let h=0;ws.forEach(x=>{if(runs(x,w,m).length)h++;});return (h/ws.length*100).toFixed(1)+'%';};
  console.log(('±'+w+' / '+m+'+').padEnd(10)+r('literary').padStart(8)+r('modern').padStart(10));
});

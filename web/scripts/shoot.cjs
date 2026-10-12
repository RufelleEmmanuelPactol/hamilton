// Screenshot helper for visual QA: BASE=http://localhost:PORT node scripts/shoot.cjs <outdir> </path/,/path2/?step=incident> [w] [h]
// usage: node shoot.js outdir path[,path...] [w] [h]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const [out,paths,w='1440',h='900']=process.argv.slice(2);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+h}});const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(String(e)));
for(const path of paths.split(',')){await p.goto((process.env.BASE||'http://localhost:3123')+path,{waitUntil:'networkidle'});await p.waitForTimeout(500);
await p.screenshot({path:out+'/'+(path.replace(/[\/?=&]/g,'_')||'root')+'.png',fullPage:true});}
console.log(errs.join('\n')||'no errors');await b.close();})();

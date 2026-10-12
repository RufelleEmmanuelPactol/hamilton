// End-to-end demo check. Serve web/out on :3123 first, then: node scripts/e2e.cjs <screenshot-dir>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const B='http://localhost:3123', O=process.argv[2];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900}});
const errs=[];const admin=await ctx.newPage();admin.on('pageerror',e=>errs.push('admin '+e));admin.on('console',m=>m.type()==='error'&&errs.push('admin '+m.text()));
const shot=async(p,n)=>{await p.waitForTimeout(400);await p.screenshot({path:`${O}/${n}.png`});};
const txt=async(p,sel)=>(await p.locator(sel).first().innerText()).replace(/\s+/g,' ');
await admin.goto(B+'/');await admin.click('text=Start the demo');await admin.waitForFunction(()=>location.pathname==='/app/'&&!location.search);await shot(admin,'01-overview-before');
console.log('before approvals badge:', await txt(admin,'nav[aria-label=Main] a[href^="/app/approvals"]'));
// driver in a second tab
const phone=await ctx.newPage();phone.on('pageerror',e=>errs.push('phone '+e));
await phone.goto(B+'/driver/');await shot(phone,'02-driver');
await phone.click('text=Report');await phone.waitForURL(/report/);await shot(phone,'03-report-form');
await phone.click('text=About 1 hour');await phone.click('text=Send report');await shot(phone,'04-report-sent');
await admin.waitForTimeout(500);await shot(admin,'05-overview-thinking');
await admin.waitForTimeout(2600);await shot(admin,'06-overview-incident');
console.log('incident approvals badge:', await txt(admin,'nav[aria-label=Main] a[href^="/app/approvals"]'));
await admin.click('nav[aria-label=Main] >> text=Approvals');await admin.waitForURL(/approvals/);await shot(admin,'07-approvals');
await admin.click('text=If you approve');await shot(admin,'08-approvals-after');
await admin.locator('button:has-text("Approve")').last().click();await shot(admin,'09-approved');
await admin.click('nav[aria-label=Main] >> text=Overview');await shot(admin,'10-overview-approved');
await admin.click('nav[aria-label=Main] >> text=Audit log');await shot(admin,'11-audit');
await phone.waitForTimeout(300);await shot(phone,'12-phone-after');
await admin.goto(B+'/customer/');await shot(admin,'13-customer');
await admin.keyboard.press('Shift+Alt+KeyR');await admin.goto(B+'/app/');await shot(admin,'14-after-reset');
console.log('after reset badge:', await txt(admin,'nav[aria-label=Main] a[href^="/app/approvals"]'));
console.log(errs.join('\n')||'no errors');await b.close();})().catch(e=>{console.error('FAIL',e.message);process.exit(1)});

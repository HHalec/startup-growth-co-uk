// Social preview for startup-growth.co.uk (30 Sep 2026): images/og.png, 2400x1260 (1200x630 at 2x).
// Run from this folder: node scripts/make-og.js (uses puppeteer from ~/Claudia/tools/node_modules).
const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '../../node_modules/puppeteer'));
const photo = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../images/alec.jpg')).toString('base64');
const html = `<html><head><link href="https://fonts.googleapis.com/css2?family=Lato:wght@700;900&family=Open+Sans:wght@600&display=swap" rel="stylesheet">
<style>html,body{margin:0}#o{width:1200px;height:630px;background:#0a1f33;position:relative;overflow:hidden;color:#fff}
.b{position:absolute;left:80px;top:72px;font:700 34px Lato;letter-spacing:.5px}.b span{color:#00c4cc}
.n{position:absolute;left:80px;top:170px;font:900 70px/1.05 Lato;width:640px}
.r{position:absolute;left:80px;top:265px;font:700 40px/1.25 Lato;color:#e2e6e8;width:620px}
.u{position:absolute;left:80px;top:520px;font:600 30px 'Open Sans';color:#00c4cc}
.p{position:absolute;right:90px;top:135px;width:360px;height:360px;border-radius:50%;border:6px solid #00c4cc;background:url(${photo}) center/cover}</style></head>
<body><div id="o"><div class="b">StartUp <span>Growth</span></div><div class="n">Alec Harden-Henry</div>
<div class="r">Interim Head of GTM, New Business and Sales</div><div class="u">startup-growth.co.uk</div><div class="p"></div></div></body></html>`;
(async () => {
  const b = await puppeteer.launch({ headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await p.setContent(html, { waitUntil: 'domcontentloaded' });
  await Promise.race([p.evaluate(() => document.fonts.ready.then(() => 1)), new Promise((r) => setTimeout(r, 8000))]);
  await new Promise((r) => setTimeout(r, 500));
  await (await p.$('#o')).screenshot({ path: path.join(__dirname, '../images/og.png') });
  await b.close();
})();

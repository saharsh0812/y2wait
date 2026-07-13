const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
    console.log("Loaded page.");
  } catch (err) {
    console.log("Goto error:", err.message);
  }
  
  await browser.close();
})();

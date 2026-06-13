import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'assets');

const targets = [
  {
    file: 'screenshot-flowops.png',
    url: 'https://flow-ops-systems.vercel.app/',
    wait: 3000,
    viewport: { width: 1280, height: 800 },
  },
  {
    file: 'screenshot-servicedesk.png',
    url: 'https://flow-ops-systems.vercel.app/',
    wait: 3000,
    viewport: { width: 1280, height: 800 },
  },
  {
    file: 'screenshot-weather.png',
    url: 'https://weather-app1r.netlify.app/',
    wait: 4000,
    viewport: { width: 1280, height: 800 },
  },
  {
    file: 'screenshot-quiz.png',
    url: 'https://quick-quiz-alpha-ten.vercel.app/',
    wait: 3000,
    viewport: { width: 1280, height: 800 },
  },
];

await mkdir(assetsDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 1 });

for (const target of targets) {
  const page = await context.newPage();
  await page.setViewportSize(target.viewport);
  try {
    await page.goto(target.url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(target.wait);
    const out = path.join(assetsDir, target.file);
    await page.screenshot({
      path: out,
      fullPage: false,
      type: 'png',
      timeout: 90000,
      animations: 'disabled',
    });
    console.log(`OK  ${target.file}`);
  } catch (err) {
    console.error(`FAIL ${target.file}: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await page.close();
  }
}

await browser.close();

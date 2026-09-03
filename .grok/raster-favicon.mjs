import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 280, height: 120 } });
await page.goto("file:///workspace/.grok/favicon-preview.html");
await page.screenshot({ path: "/workspace/.grok/favicon-preview.png" });

await page.setViewportSize({ width: 16, height: 16 });
await page.setContent(
  `<!doctype html><style>html,body,img{margin:0;padding:0;width:16px;height:16px;display:block}</style><img src="file:///workspace/.grok/favicon.svg">`,
);
await page.screenshot({ path: "/workspace/.grok/favicon-16.png" });

await page.setViewportSize({ width: 128, height: 128 });
await page.setContent(
  `<!doctype html><style>html,body,img{margin:0;padding:0;width:128px;height:128px;display:block}</style><img src="file:///workspace/.grok/favicon.svg">`,
);
await page.screenshot({ path: "/workspace/.grok/favicon-16-zoom.png" });

await browser.close();
console.log("rasterized");

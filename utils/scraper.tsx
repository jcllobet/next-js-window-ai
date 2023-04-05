import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export async function getAllVisibleText(url: string): Promise<string> {
  console.log('Starting getAllVisibleText with URL:', url);

  const browser = await puppeteer.launch({ headless: true });
  console.log('Browser launched.');

  const page = await browser.newPage();
  console.log('New page created.');

  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log('Page navigated to URL.');

  const visibleText = await page.evaluate(() => {
    const node = document.querySelector('body');
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!/^\s*$/.test(node.nodeValue)) {
          return NodeFilter.FILTER_ACCEPT;
        }
      },
    });

    const textContents = [];
    while (walker.nextNode()) {
      textContents.push(walker.currentNode.nodeValue.trim());
    }
    return textContents.join('\n');
  });

  console.log('Visible text extracted:');
  console.log(visibleText);

  await browser.close();
  console.log('Browser closed.');

  return visibleText;
}

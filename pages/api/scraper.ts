// pages/api/scraper.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAllVisibleText } from "../../utils/scraper";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const scraperHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.body.search;
  if (!url || typeof url !== "string") {
    console.log(req);
    console.log(url);
    res.status(400).json({
      error: `Invalid URL parameter: \n \n URL: ${JSON.stringify(
        url
      )} Type: ${typeof url}`,
    });
    return;
  }

  for (let i = 0; i < 10; i++) {
    try {
      const scrapedText = await getAllVisibleText(url);
      console.log(typeof scrapedText);
      console.log(scrapedText);
      res.status(200).json({ data: scrapedText });
      break;
    } catch (error) {
      // Wait for a random time between 1 and 2 seconds before trying again
      const waitTime = Math.random() * 1000 + 1000;
      await delay(waitTime);

      // If this is the last iteration, send an error response
      if (i === 9) {
        res.status(500).json({ error: "Error scraping the URL" });
      }
    }
  }
};

export default scraperHandler;

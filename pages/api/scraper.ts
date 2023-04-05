// pages/api/scraper.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAllVisibleText } from "../../utils/scraper";

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

  try {
    console.log("I am inside the try");
    const scrapedText = await getAllVisibleText(url);
    console.log(typeof scrapedText);
    console.log(scrapedText);
    res.status(200).json({ data: scrapedText });
  } catch (error) {
    res.status(500).json({ error: "Error scraping the URL" });
  }
};

export default scraperHandler;

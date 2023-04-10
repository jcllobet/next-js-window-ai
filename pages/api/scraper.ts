// pages/api/scraper.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAllVisibleText } from "../../utils/scraper";
import { Data } from "../../types";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const scraperHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const url = req.body.search;
  if (!url || typeof url !== "string") {
    console.log(req);
    console.log(url);
    res.status(400).json({
      name: "Invalid URL parameter",
      error: {
        content: `Invalid URL parameter: \n \n URL: ${JSON.stringify(
          url
        )} Type: ${typeof url}`,
      },
    });
    return;
  }
  try {
    const scrapedText = await getAllVisibleText(url);
    //console.log(typeof scrapedText);
    //console.log(scrapedText);
    res.status(200).json({ name: "Scraped Text", data: scrapedText });
    //return res;
  } catch (error) {
    console.error("Error scraping the URL:", error);
    res.status(500).json({
      name: "Scraping Error",
      error: { content: "Error scraping the URL" },
    });
  }
};

export default scraperHandler;

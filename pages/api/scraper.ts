// pages/api/scraper.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAllVisibleText } from "../../utils/scraper";
// import { Data } from "../../types";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const scraperHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.body.search;

  console.log("Request body:", req.body);

  if (!url || typeof url !== "string") {
    res.status(400).json({
      name: "Invalid URL parameter",
      error: {
        content: `Invalid URL parameter: \n \n URL: ${JSON.stringify(
          url
        )} Type: ${typeof url}`,
      },
    });
    console.log("Invalid URL parameter:", url, typeof url);
    return;
  }

  let scrapedText;
  try {
    scrapedText = await getAllVisibleText(url);
  } catch (error) {
    console.error("Error in getAllVisibleText:", error);
    res.status(500).json({
      name: "Scraping Error",
      error: { content: "Error in getAllVisibleText function" },
    });
    return;
  }

  console.log("Scraped text type:", typeof scrapedText);
  console.log("Scraped text content:", scrapedText);

  res.status(200).json({ name: "Scraped Text", data: scrapedText });
};

export default scraperHandler;

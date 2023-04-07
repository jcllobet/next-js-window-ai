import { useState, useCallback } from "react";

export const usePageData = () => {
  const [pageData, setPageData] = useState<any>(null);

  const fetchPageData = useCallback(async (url: string) => {
    const response = await fetch(`http://localhost:3000/api/scraper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: url }),
    });

    const data = await response.json();
    setPageData(data);
  }, []);

  return { pageData, fetchPageData };
};

// hooks/usePageData.ts
import { useState, useCallback } from "react";

export const usePageData = () => {
  const [pageData, setPageData] = useState<string>("");

  const fetchPageData = useCallback(async (url: string) => {
    const response = await fetch(`http://localhost:3000/api/scraper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: url }),
    });
    return response;
  }, []);

  return { pageData, fetchPageData };
};

// hooks/usePageData.ts
import { useState, useCallback } from "react";
import { Data } from "../types";

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
    if (response.ok) {
      const data = await response.json();
      setPageData(data.data);
    } else {
      console.error("Error:", response);
    }
  }, []);
  return { pageData, fetchPageData };
};

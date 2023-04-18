// hooks/usePageData.ts
import { useCallback } from "react";
//import { Data } from "../types";

export const usePageData = () => {
  const fetchPageData = useCallback(async (url: string) => {
    const response = await fetch(`/api/scraper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: url }),
    });
    console.log("Response:", response); //
    if (!response.ok) {
      console.error("Error:", response);
    }
    return response;
  }, []);
  return { fetchPageData };
};

import { RequestOptions } from "@/types";

export async function fetchPageData (url: string) {
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
    throw new Error('Failed fetch page data')
  }
  return await response.json();
}

export async function fetchSummary(requestOptions: RequestOptions) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestOptions),
  });
  
  console.log("Response:", response); // Add this line to log the response
  
  if (!response.ok) {
    console.error("Error:", response); // Add this line to log errors
    throw new Error('Failed fetch summary')
  }

  return await response.json();
}
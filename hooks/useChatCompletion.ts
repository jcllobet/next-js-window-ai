// hooks/useChatCompletion.ts
import { useCallback } from "react";
import { RequestOptions } from "../types";

export const useChatCompletion = () => {
  const fetchChatCompletion = useCallback(
    async (requestOptions: RequestOptions) => {
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
      }

      return response;
    },
    []
  );

  return { fetchChatCompletion };
};

// generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; //workaround to ensure we use the official OpenAI API
import { RequestOptions } from "../../types";

const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

async function createChatCompletion(requestOptions: RequestOptions) {
  try {
    const { model, ...rest } = requestOptions; // Destructure model and rest of requestOptions
    const response = await openai.post("/chat/completions", {
      model: model || "gpt-3.5-turbo", // Use model from requestOptions if available, otherwise use the default
      ...rest, // Spread the rest of requestOptions without the model property
    });

    console.log("OpenAI API Response:", response); // Add this line to log the API response

    if (response.status !== 200) {
      throw new Error("Error in OpenAI API response");
    }

    return response.data.choices;
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw error
  }
}

// Update openAIcall to accept RequestOptions parameter
async function openAIcall(requestOptions: RequestOptions) {
  // Remove messages and options variables

  // Pass requestOptions directly to createChatCompletion
  const choices = await createChatCompletion(requestOptions);
  console.log("Choices:", choices); // Add this line to log the choices

  return choices[0].message;
}

const chatCompletionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const requestOptions: RequestOptions = req.body;

  try {
    const message = await openAIcall(requestOptions);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Error generating chat completion:", error);
    res.status(500).json({ error: error.message });
  }
};

export default chatCompletionHandler;

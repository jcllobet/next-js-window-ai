// generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios"; //workaround to ensure we use the official OpenAI API
import { RequestOptions } from "../../types";
import { OpenAIApi, Configuration } from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;
//console.log("OpenAI API Key:", openaiApiKey);
//baseURL: "https://api.openai.com/v1",
// "Content-Type": "application/json",
// Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
// "https://api.openai.com/v1/chat/completions"

const openai = axios.create({
  headers: {
    Authorization: "Bearer " + openaiApiKey,
  },
});

async function createChatCompletion(requestOptions: RequestOptions) {
  try {

    // console.log("request Options: ")
    // console.log(requestOptions)
    const messages = requestOptions.messages
    const url = "https://api.openai.com/v1/chat/completions" 

    const { model, ...rest } = requestOptions; // Destructure model and rest of requestOptions

    const body = JSON.stringify({
      messages,
      model: 'gpt-3.5-turbo',
      stream: false,
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body,
    })
    const data = await response.json()
    /*const params = {
        prompt: "How are you?",
        model: "gpt-3.5-turbo",
        max_tokens: 10,
        temperature: 0,
    };
    const response = openai.post(
      "https://api.openai.com/v1/chat/completions",
       JSON.stringify(params),
      { headers: { "Content-Type": "application/json" } }
      )
      .then((result) => {
        console.log(result.data.choices[0].text);
      })
      .catch((error) => {
        console.error(error);
      }); */


    /*const response = await openai.post("https://api.openai.com/v1/completions", {
      model: model || "gpt-3.5-turbo", // Use model from requestOptions if available, otherwise use the default
      ...rest, // Spread the rest of requestOptions without the model property
    });*/


    console.log("OpenAI API Response data message:", data.choices[0].message.content); // Add this line to log the API response

    if (response.status !== 200) {
      throw new Error("Error in OpenAI API response");
    }

    return data.choices;
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

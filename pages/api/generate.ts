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

// const generateAction = async (request: any, response: any) => {
//   try {
//     console.log(`inside the OpenAI try: ${request.body.messages}`);
//     const { messages } = request.body;
//     const formattedMessages = messages.map((message: Message) => ({
//       role: message.role,
//       content: message.content,
//     }));

//     const result = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: formattedMessages,
//         temperature: 0.2,
//         max_tokens: 1000,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${openaiApiKey}`,
//         },
//       }
//     );

//     const generatedMessage = result.data.choices[0].message.content;
//     response.status(200).json({ output: generatedMessage });
//     console.log(`generatedMessage: ${generatedMessage}`);
//   } catch (error) {
//     console.error(`Error in fetching from OpenAI`);
//     (error as any).message = `Error in fetching from OpenAI`;
//     response.status(400).json({ error: (error as any).message });
//   }
// };

//export default generateAction;

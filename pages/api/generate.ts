// generate.ts
import { Configuration, OpenAIApi } from "openai";
import { Message } from "../../types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (request: any, response: any) => {
  try {
    const { messages } = request.body;
    const prompt = messages
      .map((message: Message) => `${message.role}: ${message.content}`)
      .join("\n");
    const result = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${prompt}\nassistant:`,
      temperature: 0.2,
      max_tokens: 1000,
    });

    const generatedMessage = result.data.choices[0].text;
    response.status(200).json({ output: generatedMessage });
  } catch (error) {
    console.error(`Error in fetching from OpenAI`);
    (error as any).message = `Error in fetching from OpenAI`;
    response.status(400).json({ error: (error as any).message });
  }
};

export default generateAction;

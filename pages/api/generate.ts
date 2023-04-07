// generate.ts
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "";

const generateAction = async (request: any, response: any) => {
  try {
    console.log(`API: ${basePromptPrefix}${request.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
      model: "text-ada-001",
      prompt: `${basePromptPrefix}${request.body.userInput}`,
      temperature: 0.2,
      max_tokens: 1000,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    response.status(200).json({ output: basePromptOutput });
  } catch (error) {
    console.error(`Error in fetching from OpenAI`);
    (error as any).message = `Error in fetching from OpenAI`;
    response.status(400).json({ error: (error as any).message });
  }
};

export default generateAction;

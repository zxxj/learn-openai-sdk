import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  input: "介绍一下自己",
});

console.log(response.output_text);

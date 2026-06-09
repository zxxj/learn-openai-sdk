import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const stream = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  input: [{ role: "user", content: "说十遍你真帅" }],
  stream: true,
});

for await (const chunk of stream) {
  console.log(chunk);
}

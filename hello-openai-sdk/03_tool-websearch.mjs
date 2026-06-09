import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  tools: [{ type: "web_search" }], // 网络搜索
  input: "今天天气怎么样?",
});

console.log(response.output_text);

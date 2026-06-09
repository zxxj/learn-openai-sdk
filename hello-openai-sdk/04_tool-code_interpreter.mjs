import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  instructions: "你是一个天才数学家", // 系统指令,给模型设定了一个天才数学家的人设,并明确要求它在遇到数学问题时必须编写并运行代码来回答.
  tools: [{ type: "code_interpreter", container: "auto" }], // 代码解释器
  input: "你擅长什么? 1+1等于几?", // 用户提问
});

console.log(response.output_text);

import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const tools = [
  {
    type: "function",
    name: "get_weather",
    description: "获取指定城市的天气.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "城市名称,例如河北的石家庄市,北京的朝阳区.",
        },
      },
      required: ["location"],
      additionalProperties: false, // 限制模型输出的格式
    },
    strict: true, // 严格模式
  },
];

const getWeather = (location) => {
  return `${location}现在温度是25度!`;
};

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  input: [{ role: "user", content: "今天遵化市的天气怎么样?" }],
  tools,
});

const toolCall = response.output.find((t) => t.type === "function_call");

const args = JSON.parse(toolCall.arguments);

const result = await getWeather(args.location);

console.log(result); // 工具执行后得到的结果

const finalResponse = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  previous_response_id: response.id,
  input: [
    { type: "function_call_output", call_id: toolCall.id, output: result },
  ],
});

console.log(finalResponse);

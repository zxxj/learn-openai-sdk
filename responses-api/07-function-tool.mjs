import { client, model } from "./client.mjs";

// 练习 07：函数工具调用 Function calling
//
// 工具调用流程：
// 1. 你定义 tools
// 2. 模型返回 function_call
// 3. 你的 JS 代码执行本地函数
// 4. 你把结果作为 function_call_output 回传给模型
// 5. 模型组织最终自然语言回答

// TODO 1: 定义一个 function tool。
const tools = [
  {
    type: "function", // 告诉模型这是一个函数工具,不是web_search,mcp之类的内置工具
    name: "get_weather", // 工具名称
    description: "这是一个查询天气的工具,用户如果想查询天气就调用我吧", // 工具描述
    strict: true, // 让模型更严格地按 parameters 的 JSON Schema 生成函数参数
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "地区名称,例如河北省石家庄市,北京市朝阳区",
        },
      },
      required: ["location"], // 告诉模型哪些字段是必须传的
      additionalProperties: false, // 禁止模型乱加字段
    },
  },
];

// TODO 2: 写一个本地函数，返回假数据。
const getWeather = (location) => {
  return `${location}是25度`;
};

// TODO 3: 第一次请求，让模型决定是否调用工具。
const response = await client.responses.create({
  model,
  input: "帮我查询一下遵化市的天气",
  tools,
});

console.log(`模型第一次被调用: ${JSON.stringify(response.output, null, 2)}`);

// TODO 4: 从 first.output 中找 function_call。
const toolCall = response.output.find((item) => item.type === "function_call");

if (!toolCall) {
  console.log(response.output_text);
  process.exit(0);
}

// toolCall.arguments 是模型生成的 JSON 字符串，需要 parse 成 JS 对象
const args = JSON.parse(toolCall.arguments);
const result = getWeather(args.location);

const finalResponse = await client.responses.create({
  model,
  previous_response_id: response.id,
  input: [
    {
      type: "function_call_output",
      call_id: toolCall.call_id, // call_id 用来告诉模型：这份 function_call_output 对应刚才哪一次工具调用
      output: result,
    },
  ],
});

console.log(
  `模型第二次被调用: ${JSON.stringify(finalResponse.output, null, 2)}`,
);

console.log(`最终回复: ${finalResponse.output_text}`);

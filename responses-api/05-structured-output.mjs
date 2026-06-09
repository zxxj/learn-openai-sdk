import { client, model } from "../client.mjs";

// 练习 05：结构化输出 Structured Outputs
//
// 目标：
// 1. 在 responses.create 里配置 text.format
// 2. format.type 使用 "json_schema"
// 3. strict: true
// 4. 用 JSON.parse(response.output_text) 得到对象
//
// 建议 schema：
// {
//   goal: string,
//   total_days: number,
//   milestones: [{ day_range: string, topic: string, deliverable: string }]
// }

// TODO: 写一个带 text.format.json_schema 的请求。
const response = await client.responses.create({
  model: model,
  instructions: "你必须只返回 JSON，不要输出任何解释文字",
  input:
    '请返回一个json,格式为{"username":string, "isLogin":boolean, "height":number}',

  // text是接口级别的约束,模型应该按照schema返回
  text: {
    format: {
      type: "json_schema",
      name: "xxxxx",
      strict: true,
      schema: {
        type: "object",
        properties: {
          username: { type: "string" },
          isLogin: { type: "boolean" },
          height: { type: "number" },
        },
        required: ["username, isLogin, height"],
        additionalProperties: false,
      },
    },
  },
});

// TODO: 打印原始 JSON 字符串，再 parse。
// console.log(response.output_text);
// const data = JSON.parse(response.output_text);
// console.log(data);

console.log(response.output_text);
const data = JSON.parse(response.output_text);
console.log(data);

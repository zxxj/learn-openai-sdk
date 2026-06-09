import { client, model } from "./client.mjs";

// 练习 02：instructions 和消息角色
//
// 第一段目标：
// - 用 instructions 规定模型的回答风格
// - 用 input 提供用户问题
const response = await client.responses.create({
  model: model,
  instructions:
    "你是一个恋爱高手,阅女无数,擅长帮用户解答情感问题,回答不要超过一句话.",
  input: "你擅长什么?",
});

console.log(response.output_text);

// 第二段目标：
// - 把 input 写成消息数组
// - 放入一个 developer 消息和一个 user 消息
const response2 = await client.responses.create({
  model: model,
  input: [
    {
      role: "developer",
      content:
        "你是一个高冷的数学天才,擅长解答数学相关的问题,回答从不超过一句话.",
    },
    { role: "user", content: "你擅长什么?" },
  ],
});

console.log(response2.output_text);

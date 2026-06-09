import { client, model } from "../client.mjs";

// 练习 01：最小 Responses API 请求
//
// 目标：
// 1. 调用 client.responses.create()
// 2. 传入 model 和 input
// 3. 打印 response.output_text
//
// 文档关键词：
// - responses.create()
// - input
// - output_text

// TODO: 把下面这一行删掉，然后自己写 create 请求。

const response = await client.responses.create({
  model: model,
  input: "用三句话解释 Responses API 和 Chat Completions API 的区别。",
});

console.log(response.output_text);

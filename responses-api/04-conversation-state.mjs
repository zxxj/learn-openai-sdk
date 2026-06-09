import { client, model } from "./client.mjs";

// 练习 04：用 previous_response_id 做多轮对话
//
// 目标：
// 1. 第一轮请求拿到 first.id
// 2. 第二轮请求传 previous_response_id: first.id
// 3. 观察第二轮是否记得第一轮内容

// TODO 1: 写第一轮请求。
const firstResponse = await client.responses.create({
  model: model,
  instructions:
    "你是一个恋爱大师,阅女无数,擅长回答情感问题,但回答从不超过一句话.",
  input:
    "你觉得我还要追回前女友吗?我已经和她4年没见面没联系了,并且我没有她的联系方式了,但我记得她的QQ号,你觉得我加她我能成功吗?",
});

console.log(firstResponse.output_text);

// TODO 2: 写第二轮请求，使用 previous_response_id。
const twoResponse = await client.responses.create({
  model: model,
  instructions:
    "你是一个恋爱大师,阅女无数,擅长回答情感问题,但回答从不超过一句话.",
  input: "到底要怎么办...",
  previous_response_id: firstResponse.id,
});

console.log(twoResponse.output_text);

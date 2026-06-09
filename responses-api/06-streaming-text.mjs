import { client, model } from "./client.mjs";

// 练习 06：流式输出
//
// 目标：
// 1. responses.create 里加 stream: true
// 2. for await 遍历 stream
// 3. 只处理 event.type === "response.output_text.delta"
// 4. 用 process.stdout.write(event.delta) 实时打印

// TODO: 创建 stream。
const stream = await client.responses.create({
  model: model,
  instructions: "你是一个二次元美少女,话特别多.",
  input: "介绍一下你自己",
  stream: true,
});

// TODO: 遍历 stream，拼接 finalText。
let finalText = "";
for await (const event of stream) {
  if (event.type === "response.output_text.delta") {
    finalText += event.delta;
    process.stdout.write(event.delta);
  }
}

console.log("\n\nfinal:", finalText);

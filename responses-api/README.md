# Responses API 练习路线

这组文件现在是练习模板，不是完整答案。每个 `.mjs` 里都有 TODO，你先自己补代码；卡住时把报错或文件发给我，我只给你下一小步提示。

官方文档入口：

- Responses API Overview: https://developers.openai.com/api/reference/responses/overview
- Text inputs and outputs: https://developers.openai.com/api/docs/guides/text?api-mode=responses
- Conversation state: https://developers.openai.com/api/docs/guides/conversation-state?api-mode=responses
- Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Streaming responses: https://developers.openai.com/api/docs/guides/streaming-responses
- Function calling: https://developers.openai.com/api/docs/guides/function-calling

## 先记住 5 个关键词

1. `client.responses.create()` 是 Responses API 的主要入口。
2. `input` 可以是字符串，也可以是消息数组。
3. `instructions` 是本次请求的高优先级开发者指令。
4. `response.output` 是数组，里面可能有文本消息、工具调用、推理项等。
5. `response.output_text` 是 SDK 提供的快捷字段，适合快速读取所有文本输出。

官方文档特别提醒：不要假设文本一定在 `response.output[0].content[0].text`，因为 `output` 里可能混有工具调用和其他项目。

## 怎么练

每次只做一个文件：

1. 先读本 README 对应概念。
2. 打开当前练习文件，看 TODO。
3. 自己补代码。
4. 运行对应 `pnpm responses:xx`。
5. 把输出、报错或你的理解发给我，我们一起复盘。

## 推荐学习顺序

1. `01-basic-response.mjs`
   目标：写出最小 `client.responses.create()` 请求，并打印 `response.output_text`。

2. `02-instructions-and-roles.mjs`
   目标：对比 `instructions` 和 `input`，再试一次 `developer` / `user` 消息数组。

3. `03-output-shape.mjs`
   目标：打印 `response.id`、`response.status`、`response.output`，理解为什么不要硬取 `output[0]`。

4. `04-conversation-state.mjs`
   目标：第一轮拿到 `response.id`，第二轮用 `previous_response_id` 接上上下文。

5. `05-structured-output.mjs`
   目标：用 `text.format.json_schema` 让模型返回 JSON，并用 `JSON.parse()` 解析。

6. `06-streaming-text.mjs`
   目标：设置 `stream: true`，只处理 `response.output_text.delta`。

7. `07-function-tool.mjs`
   目标：让模型产生 `function_call`，你的代码执行函数，再回传 `function_call_output`。

## 运行方式

在项目根目录运行：

```bash
node responses-api/01-basic-response.mjs
node responses-api/02-instructions-and-roles.mjs
node responses-api/03-output-shape.mjs
node responses-api/04-conversation-state.mjs
node responses-api/05-structured-output.mjs
node responses-api/06-streaming-text.mjs
node responses-api/07-function-tool.mjs
```

如果你的 `.env` 里用了第三方 `OPENAI_BASE_URL`，有些 OpenAI 官方内置能力可能不支持。基础文本、多轮、结构化输出和函数工具一般最适合先练。

## 我们的配合方式

你负责写代码，我负责：

- 帮你读官方文档，把概念翻成中文。
- 在你卡住时给提示，不直接贴完整答案。
- 看你的代码和报错，帮你定位问题。
- 每完成一个练习，帮你总结这个 API 点真正要记住什么。

import { model, client } from "./client.mjs";

const tools = [
  {
    type: "function",
    name: "get_study_progress",
    description: "查询用户在某个 OpenAI SDK 学习主题上的当前进度和下一步建议。",
    parameters: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description:
            "学习的主题,学习的阶段,例如我想学习openai-sdk的responses-api",
        },
      },
      additionalProperties: false,
      required: ["topic"],
    },
    strict: true,
  },
];

const getStudyProgress = (topic) => {
  return {
    completed: topic,
    next: "下一阶段我们来学习openai-sdk的xxxx",
  };
};

const response = await client.responses.create({
  instructions: "你的回答简短又犀利,从不超过两句话.",
  model,
  input: "我想继续学习responses-api",
  tools,
});

console.log("第一次调用模型: ", JSON.stringify(response, null, 2));
console.log(`----------------------------------------------------------------`);

const toolCall = response.output.find((item) => item.type === "function_call");

if (toolCall) {
  const args = JSON.parse(toolCall.arguments);
  const result = getStudyProgress(args.topic);

  const stream = await client.responses.create({
    model,
    instructions: "给我3条建议,并制定学习路线.",
    previous_response_id: response.id,
    input: [
      {
        type: "function_call_output",
        output: JSON.stringify(result),
        call_id: toolCall.call_id,
      },
    ],
    stream: true,
  });

  let finalText = "";
  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      finalText += event.delta;
      process.stdout.write(event.delta);
    }
  }
}

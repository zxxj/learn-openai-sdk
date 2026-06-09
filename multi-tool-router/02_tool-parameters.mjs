// 工具参数设计
// 你刚才已经会“多工具选择”了，但工具能不能稳定，关键在 parameters 写得好不好。今天重点练这些：
/**
  required
  enum
  additionalProperties
  strict
  number / string / boolean
 */

import { client, model } from "../client.mjs";

// 目标：做一个 create_study_task 工具，让模型根据用户输入创建学习任务。

const createStudyTaskTool = {
  type: "function",
  name: "create_study_task",
  description: "根据用户要求创建一个 OpenAI SDK 学习任务。",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "学习任务标题",
      },
      topic: {
        type: "string",
        description: "学习主题,例如 responses-api, function-calling, streaming",
      },
      difficulty: {
        type: "string",
        enum: ["简单", "中等", "高难度"],
        description: "任务难度,只能是简单,中等,高难度",
      },
      minutes: {
        type: "number",
        description: "预计完成时间,单位分钟,例如30",
      },
      needs_review: {
        type: "boolean",
        description: "是否需要复习旧知识",
      },
    },
    required: ["title", "topic", "difficulty", "minutes", "needs_review"],
    additionalProperties: false,
  },
  strict: true,
};

const tools = [createStudyTaskTool];

const createStudyTask = (args) => {
  return JSON.stringify({
    title: args.title,
    topic: args.topic,
    difficulty: args.difficulty,
    minutes: args.minutes,
    needs_review: args.needs_review,
  });
};

const response = await client.responses.create({
  model,
  tools,
  input:
    "帮我创建一个 45 分钟的 function calling 练习任务，难度中等，需要复习前面的工具调用知识",
});

console.log(response);

const toolCall = response.output.find((item) => item.type === "function_call");

if (toolCall) {
  const args = JSON.parse(toolCall.arguments);
  const tool = tools.find((t) => t.name === toolCall.name);
  console.log(`args!!!!!!${{ ...args }}`);

  if (tool) {
    const toolResult = createStudyTask(args);

    const finalResult = await client.responses.create({
      model,
      previous_response_id: response.id,
      stream: true,
      input: [
        {
          type: "function_call_output",
          output: toolResult,
          call_id: toolCall.call_id,
        },
      ],
    });

    console.log(finalResult.output_text);

    let finalText = "";
    for await (const chunk of finalResult) {
      if (chunk.type === "response.output_text.delta") {
        finalText += chunk.delta;
        process.stdout.write(chunk.delta);
      }
    }
  }
}

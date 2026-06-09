import { model, client } from "../client.mjs";

const tools = [
  {
    type: "function",
    name: "get_weather",
    description: "这是一个天气查询工具,可以查询全国的天气.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "城市名称,例如河北省石家庄市.",
        },
      },
      additionalProperties: false,
      required: ["location"],
    },
    strict: true,
  },
  {
    type: "function",
    name: "get_study_progress",
    description: "查询用户在某个 OpenAI SDK 学习主题上的当前进度和下一步建议",
    parameters: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "openai-sdk中的某个主题,例如response-api,stream等",
        },
      },
      additionalProperties: false,
      required: ["topic"],
    },
    strict: true,
  },
  {
    type: "function",
    name: "calculate_bmi",
    description: "根据用户的身高和体重给出饮食和运动方面的建议",
    parameters: {
      type: "object",
      properties: {
        height_cm: {
          type: "number",
          description: "用户的身高,例如175cm,188cm",
        },
        weight_kg: {
          type: "number",
          description: "用户的体重,例如110kg,120kg",
        },
      },
      additionalProperties: false,
      required: ["height_cm", "weight_kg"],
    },
    strict: true,
  },
];

const getWeather = (location) => {
  return JSON.stringify({
    location,
    temperature: 25,
    condition: "晴",
  });
};

const getStudyProgress = (topic) => {
  return `${topic}已经学完啦`;
};

const calculateBMI = (heightCm, weightKg) => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  return JSON.stringify({
    height_cm: heightCm,
    weight_kg: weightKg,
    bmi: Number(bmi.toFixed(1)),
  });
};

const response = await client.responses.create({
  model,
  tools,
  input: "遵化市现在天气怎么样?",
});

console.log(response);

const toolCall = response.output.find((item) => item.type === "function_call");

if (toolCall) {
  const args = JSON.parse(toolCall.arguments);
  console.log("args!!!!!!", args);

  let result = "";

  switch (toolCall.name) {
    case "get_weather":
      result = getWeather(args.location);
      console.log(`result!!!!!${result}`);

      break;
    case "get_study_progress":
      result = getStudyProgress(args.topic);
      console.log(`result!!!!!${result}`);

      break;
    case "calculate_bmi":
      result = calculateBMI(args.height_cm, args.weight_kg);
      console.log(`result!!!!!${result}`);
      break;
  }

  const finalResponse = await client.responses.create({
    model,
    previous_response_id: response.id,
    input: [
      {
        type: "function_call_output",
        output: result,
        call_id: toolCall.call_id,
      },
    ],
  });

  console.log(finalResponse.output_text);
}

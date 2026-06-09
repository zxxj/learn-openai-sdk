import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "这是什么图片?" },
        {
          type: "input_image",
          image_url:
            "https://gips2.baidu.com/it/u=1651586290,17201034&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800",
        },
      ],
    },
  ],
});

console.log(response.output_text);

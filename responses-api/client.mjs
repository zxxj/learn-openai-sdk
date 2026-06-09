import OpenAI from "openai";
import "dotenv/config";

export const model = process.env.OPENAI_MODEL_NAME;

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env");
}

if (!model) {
  throw new Error("Missing OPENAI_MODEL_NAME in .env");
}

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || undefined,
});

export function printSection(title) {
  console.log(`\n=== ${title} ===`);
}

export function printResponseBasics(response) {
  printSection("response basics");
  console.log("id:", response.id);
  console.log("status:", response.status);
  console.log("model:", response.model);
  console.log("output item types:", response.output.map((item) => item.type));
  console.log("usage:", response.usage);
}


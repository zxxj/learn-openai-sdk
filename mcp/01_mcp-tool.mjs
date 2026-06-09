import { model, client } from "../client.mjs";

// mcp只能使用原生openai,中转无法使用
const response = await client.responses.create({
  model,
  tools: [
    {
      type: "mcp",
      server_label: "dice",
      server_description: "扔骰子MCP服务器",
      server_url: "https://dmcp-server.deno.dev/sse",
      require_approval: "never",
    },
  ],
  input: "掷骰子，然后告诉我结果",
});

console.log(response.output_text);

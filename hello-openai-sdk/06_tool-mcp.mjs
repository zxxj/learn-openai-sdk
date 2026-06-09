import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

// qwen3.6plus不支持
const response = await client.responses.create({
  model: process.env.OPENAI_MODEL_NAME,
  tools: [
    {
      type: "mcp", // 这是一个mcp工具
      server_label: "myMCP", // 工具别名,给模型看的.
      server_description: "一个龙与地下城MCP服务器,可以实现摇骰子", // 描述这个工具能干什么
      server_url: "https://dmcp-server.deno.dev/sse", // MCPServer地址
      require_approval: "never", // 表示不需要用户批准, mcp有权限机制, never: 自动调用, always: 每次都需要用户确认, auto: 让大模型自己决定是否调用
    },
  ],
  input: "随便摇一个骰子",
});

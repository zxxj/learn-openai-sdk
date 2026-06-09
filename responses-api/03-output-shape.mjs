import { client, model } from "../client.mjs";

// 练习 03：看懂 response 的返回结构
//
// 目标：
// 1. 发起一个普通文本请求
// 2. 打印 response.id / response.status / response.model
// 3. 打印 response.output_text
// 4. 打印完整 response.output，观察它是数组

const response = await client.responses.create({
  model: model,
  instructions:
    "你是一个高冷的恋爱高手,擅长为人解答情感问题,回答从不超过一句话.",
  input: "你最擅长什么?",
});

console.log(response.id); // resp_53835aa6-0f3a-9b87-bcf4-49338869fa07
console.log(response.status); // completed
console.log(response.model); // qwen3.7-plus
console.log(response.output_text); // 看透人心，让你爱的人对你死心塌地。
console.log(response.output);
/**
 * [
    {
      id: 'msg_42c36a79-f927-4bc5-8c7a-ba15afaa8d7d',
      summary: [ [Object] ],
      type: 'reasoning'
    },
    {
      content: [ [Object] ],
      id: 'msg_2904e255-ca1e-4211-86a1-fcaed5775c05',
      role: 'assistant',
      status: 'completed',
      type: 'message'
    }
  ]
 */

/**
 * output中有两个东西: reasoning和message
 * reasoning是模型的推理/摘要,不是最终回答.
 * message才是助手真正要返回给用户看的内容. 最终结果是: output[1].content[0].text
 * 普通output会把深层对象折成[object],需要用JSON.stringify才会完整展开
 *  */
console.log(JSON.stringify(response.output, null, 2));

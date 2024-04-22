import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '56b8e846be31545fc9af12ef026bd002d4ed5f8333cd7d7e31eafb30c84591ec',
  baseURL: 'https://api.together.xyz/v1',
  dangerouslyAllowBrowser: true,
});

export async function main(query: string): Promise<string> {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a psychiatrist. A patient would come to you and you should provide them advice based on the previous replies. Ask only one question or reply to a sentence one at a time. Dont give similar response consequently',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      model: 'togethercomputer/llama-2-13b-chat',
      max_tokens: 100,
    });
  
    const output = response.choices[0].message.content;
    // console.log(output);
    return output || "";
  }
  
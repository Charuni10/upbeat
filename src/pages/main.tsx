import Together from 'together-ai';

const client = new Together({
  apiKey: '77fbc02ed1ca42e2e7b74d20c7c78c56702e27e86de2a8bc9b69bf821f027015',
});

export async function main(query: string): Promise<string> {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a psychiatrist. A patient would come to you and you should provide them advice based on the previous replies. Try to provide a solution based on their replies ',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      model: 'togethercomputer/llama-2-13b-chat',
      max_tokens: 100,
      
    });

    const output = response?.choices?.[0]?.message?.content || 'No response from the AI';
    return output; 
  }
  
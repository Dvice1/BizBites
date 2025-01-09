import { OpenAI } from 'openai/index.mjs';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
console.log('API Key:', apiKey);

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const askGPT = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'No response from the bot.';
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return 'Sorry, I encountered an issue processing your request.';
  }
};

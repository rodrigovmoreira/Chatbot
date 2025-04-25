const axios = require('axios');

async function generateAIResponse(message, context = '') {
  try {
    const prompt = `Contexto: ${context}\nUsuário: ${message}\nBot:`;
    const res = await axios.post(
      process.env.DEEPSEEK_API_URL,
      {
        model: process.env.DEEPSEEK_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 250,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('Erro na IA:', err.message);
    return null;
  }
}

module.exports = { generateAIResponse };
// === messageHandler.js ===
const { getOrCreateSession, setSessionState } = require('./services/session');
const { simulateTyping, delay } = require('./utils/chatutils');
const { generateAIResponse } = require('./services/ai');
const menuHandler = require('./handlers/menuHandler');
const handlers = require('./handlers/menuHandler');

async function handleMessage(client, msg) {
  if (!msg.from.endsWith('@c.us')) return;

  const chat = await msg.getChat();
  const contact = await msg.getContact();
  const name = contact.pushname || 'Amigo';
  const body = msg.body.toLowerCase();

  const session = await getOrCreateSession(msg.from);
  const state = session.state;

  if (handlers[state]) {
    await handlers[state](client, msg, session, name);
    return;
  }

  if (body.match(/^(menu|ola|oi|voltar)$/i)) {
    await menuHandler(client, msg, name);
    return;
  }

  if (body.match(/^[1-5]$/)) {
    await handlers["option" + body](client, msg, session, name);
    return;
  }

  if (body.includes('?') || body.split(' ').length > 2) {
    await simulateTyping(chat);
    const aiResponse = await generateAIResponse(body, 'Você é um assistente chamado Moreira Bot e responde de forma simples e cordial.');
    await client.sendMessage(msg.from, aiResponse || '🤖 Pode repetir? Ainda estou aprendendo.');
  }
}

module.exports = { handleMessage };
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMessage } = require('./messageHandler');
const dbConnect = require('./services/db');
require('dotenv').config();

const client = new Client();
dbConnect();

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log('Bot conectado ao WhatsApp'));
client.on('message', async msg => handleMessage(client, msg));

client.initialize();


// === messageHandler.js ===
const { getOrCreateSession, setSessionState } = require('./services/session');
const { simulateTyping, delay } = require('./utils/chatuils');
const { generateAIResponse } = require('./services/ai');
const menuHandler = require('./handlers/menuHandler');
const handlers = require('./handlers');

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
    const aiResponse = await generateAIResponse(body, 'Você é um assistente chamado MoreiraBot.');
    await client.sendMessage(msg.from, aiResponse || '🤖 Pode repetir? Ainda estou aprendendo.');
  }
}

module.exports = { handleMessage };

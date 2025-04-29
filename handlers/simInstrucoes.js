const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');
const menuHandler = require('./menuHandler');

async function simInstrucoes(client, msg, session, name) {
  const chat = await msg.getChat();
  const body = msg.body.toLowerCase();

  if (body === 'sim' || body === 's') {
    await simulateTyping(chat);

    await client.sendMessage(
      msg.from,
      'Instalação:\n1. Instale Node.js e VSCode\n2. Clone o repositório: https://github.com/rodrigovmoreira/Chatbot\n3. Execute `npm install`\n4. Inicie com `npm start`'
    );
    await setSessionState(msg.from, null);
  } else if (body === 'voltar') {
    await setSessionState(msg.from, null);
    await menuHandler(client, msg, name);
  }
}

module.exports = simInstrucoes;

const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');
const menuHandler = require('./menuHandler');

async function palavrao(client, msg, session, name) {
  const chat = await msg.getChat();
  const body = msg.body.toLowerCase();

  if (body === 'voltar') {
    await setSessionState(msg.from, null);
    await menuHandler(client, msg, name);
  } else {
    await simulateTyping(chat);

    await client.sendMessage(
      msg.from,
      `👀 Anotado seu palavrão: "${body}"\nVoltando ao menu...`
    );

    await setSessionState(msg.from, null);
    await menuHandler(client, msg, name);
  }
}

module.exports = palavrao;

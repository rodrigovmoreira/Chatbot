const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function option5(client, msg, session, name) {
  const chat = await msg.getChat();
  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Digite seu palavrão favorito (ou digite *voltar* para retornar ao menu):'
  );

  await setSessionState(msg.from, 'Palavrao');
}

module.exports = option5;

const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function option4(client, msg, session, name) {
  const chat = await msg.getChat();
  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Uma grande melhoria será introduzir um banco de dados, para guardar histórico das conversas.\n' +
    'O MongoDB é uma ótima opção para isso!'
  );

  await setSessionState(msg.from, 'mongo_sera');
}

module.exports = option4;

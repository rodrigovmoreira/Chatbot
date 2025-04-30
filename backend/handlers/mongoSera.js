const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function mongoSera(client, msg, session, name) {
  const chat = await msg.getChat();
  const body = msg.body.toLowerCase();

  if (body.includes('mong')) {
    await simulateTyping(chat);

    await client.sendMessage(
      msg.from,
      'Sim! MongoDB é ideal para:\n- Histórico de conversas\n- Dados não estruturados\n- Escalabilidade\n\nVeja mais: https://www.mongodb.com/'
    );
    await setSessionState(msg.from, null);
  }
}

module.exports = mongoSera;

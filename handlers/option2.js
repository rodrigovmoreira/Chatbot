const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function option2(client, msg, session, name) {
  const chat = await msg.getChat();
  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Fui feito em Javascript, com a biblioteca whatsapp-web.js.\n' +
    'Estou nos meus primeiros passos como assistente virtual!'
  );

  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Fui feito com a ajuda de IA, e em breve devo me comunicar melhor ainda!\n' +
    'Digite *IA* que te mando os links das ferramentas que me ajudaram!'
  );

  await setSessionState(msg.from, 'ia_instrucoes');
}

module.exports = option2;

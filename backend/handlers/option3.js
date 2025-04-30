const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function option3(client, msg, session, name) {
  const chat = await msg.getChat();
  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Tenho vários benefícios!\n' +
    'Você pode me ajudar a melhorar minhas respostas e deixar a experiência mais útil para você.'
  );

  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Quer ver meu código? Digite *sim* para instruções ou *voltar* para menu.\n' +
    'Repositório: https://github.com/rodrigovmoreira/Chatbot'
  );

  await setSessionState(msg.from, 'sim_instrucoes');
}

module.exports = option3;

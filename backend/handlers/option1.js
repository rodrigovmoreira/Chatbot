const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function option1(client, msg, session, name) {
  const chat = await msg.getChat();
  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Sou um assistente virtual para responder perguntas sobre nossos serviços.\n' +
    'Estou em constante evolução!'
  );

  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    'Quer ver meu código? Digite *sim* para instruções ou *voltar* para menu.\n\n' +
    'Repositório: https://github.com/rodrigovmoreira/Chatbot'
  );

  await setSessionState(msg.from, 'sim_instrucoes');
}

module.exports = option1;

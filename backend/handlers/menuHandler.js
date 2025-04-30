// handlers/menuHandler.js
const { simulateTyping } = require('../utils/chatUtils');

async function menuHandler(client, msg, name = 'Amigo') {
  const chat = await msg.getChat();
  await simulateTyping(chat);

  await client.sendMessage(
    msg.from,
    `Olá ${name.split(' ')[0]}! Escolha uma opção:\n\n` +
    '1 - Como funciono?\n' +
    '2 - Por que sou simples?\n' +
    '3 - Benefícios\n' +
    '4 - Como melhorar\n' +
    '5 - Palavrão'
  );
}

module.exports = menuHandler;

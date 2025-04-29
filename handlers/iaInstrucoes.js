const { simulateTyping } = require('../utils/chatUtils');
const { setSessionState } = require('../services/session');

async function iaInstrucoes(client, msg, session, name) {
  const chat = await msg.getChat();
  const body = msg.body.toLowerCase();

  if (body.includes('ia')) {
    await simulateTyping(chat);

    await client.sendMessage(
      msg.from,
      'Ferramentas de IA que me ajudaram:\n\n- DeepSeek: https://chat.deepseek.com\n- GitHub Copilot: https://github.com/features/copilot'
    );
    await setSessionState(msg.from, null);
  }
}

module.exports = iaInstrucoes;

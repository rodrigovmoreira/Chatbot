// === messageHandler.js ===
const { saveMessage, getLastMessages } = require('./services/message');
const { getOrCreateSession, setSessionState } = require('./services/session');
const { simulateTyping, delay } = require('./utils/chatUtils');
const { generateAIResponse } = require('./services/ai');
const menuHandler = require('./handlers/menuHandler');
const handlers = require('./handlers');

async function handleMessage(client, msg) {
  try {
    console.log('📩 Mensagem recebida:', msg.body);

    // Validação inicial
    if (!msg.from.endsWith('@c.us')) {
      console.log('Mensagem ignorada (não é de um usuário individual).');
      return;
    }

    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname || 'Amigo';
    const body = msg.body.toLowerCase();

    // Buscar ou criar sessão do usuário
    const session = await getOrCreateSession(msg.from);
    const state = session.state;

    // 🔵 Salvar mensagem do usuário
    await saveMessage(msg.from, 'user', msg.body);

    if (state && handlers[state]) {
      await handlers[state](client, msg, session, name);
      return;
    }

    console.log('📋 Estado atual do usuário:', state);

    // Se existe um handler para o estado atual
    if (state && handlers[state]) {
      console.log(`🔄 Chamando handler para estado: ${state}`);
      await handlers[state](client, msg, session, name);
      return;
    }

    // Se a pessoa pediu o menu
    if (body.match(/^(menu|ola|oi|voltar)$/i)) {
      console.log('📚 Enviando menu para usuário.');
      await menuHandler(client, msg, name);
      return;
    }

    // Se escolheu uma opção numérica (1 a 5)
    if (body.match(/^[1-5]$/)) {
      const optionHandler = handlers["option" + body];
      if (optionHandler) {
        console.log(`🔢 Chamando handler da opção ${body}`);
        await optionHandler(client, msg, session, name);
      } else {
        console.warn(`⚠️ Nenhum handler encontrado para opção ${body}`);
        await client.sendMessage(msg.from, "Opção inválida. Digite *menu* para ver as opções disponíveis.");
      }
      return;
    }

    // Mensagem longa ou pergunta — IA entra
    if (body.includes('?') || body.split(' ').length > 2) {
      await simulateTyping(chat);

      // 🔵 Antes de enviar para IA, buscar histórico
      const history = await getLastMessages(msg.from, 5); // últimas 5 mensagens
      const context = history
        .reverse()
        .map(m => `${m.role === 'user' ? 'Usuário' : 'Bot'}: ${m.content}`)
        .join('\n');

      const aiResponse = await generateAIResponse(body, context);

      if (aiResponse) {
        await client.sendMessage(msg.from, aiResponse);

        // 🔵 Salvar resposta do bot
        await saveMessage(msg.from, 'bot', aiResponse);
      } else {
        await client.sendMessage(msg.from, "🤖 Pode repetir? Ainda estou aprendendo.");
      }
    }

  } catch (error) {
    console.error('❌ Erro no handleMessage:', error.message);
    try {
      await client.sendMessage(msg.from, '⚠️ Desculpe, algo deu errado. Tente novamente digitando *menu*.');
    } catch (sendError) {
      console.error('❌ Erro ao tentar enviar mensagem de erro:', sendError.message);
    }
  }
}

module.exports = { handleMessage };

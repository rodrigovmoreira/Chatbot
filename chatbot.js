// import OpenAI from 'openai';
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const axios = require('axios');

const AI_CONFIG = {
    API_KEY: "sk-0ae21ea044344d4dbd6c4364bb903888", // Substitua pela chave que já testou
    API_URL: "https://api.openai.com/v1/chat/completions", // Ou URL da API que você usou
    MODEL: "deepseek-chat",
    MAX_TOKENS: 150 // Limita o tamanho da resposta para economizar créditos
};


// Serviço de leitura do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Objeto com estados da conversa (para controlar fluxos)
const userStates = {};

// Funções de resposta modularizadas

// Função para gerar resposta da IA
async function generateAIResponse(userMessage, context = "") {

    try {
        const prompt = `Contexto: ${context}\n\nUsuário: ${userMessage}\nChatbot (responda breve e naturalmente):`;

        const response = await axios.post(
            AI_CONFIG.API_URL,
            {
                model: AI_CONFIG.MODEL,
                messages: [{ role: "user", content: prompt }],
                max_tokens: AI_CONFIG.MAX_TOKENS,
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${AI_CONFIG.API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Erro na IA (fallback para resposta padrão):", error.message);
        return null; // Retorna null para usar respostas pré-definidas
    }

}

async function sendMenu(msg, name) {
    const chat = await msg.getChat();
    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        `Olá ${name.split(" ")[0]}! Sou o chatbot do Rodrigo Moreira. Escolha uma opção:\n\n` +
        '1 - Como funciono?\n2 - Por que sou simples?\n3 - Benefícios\n4 - Como melhorar\n5 - Palavrão'
    );
}

// Handler principal
client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return;

    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname;
    const userState = userStates[msg.from];
    const userMessage = msg.body.toLowerCase();

    // 1. Primeiro verifica estados pendentes
    if (userState?.awaiting === 'sim_instrucoes') {
        if (body === 'sim' || body === 's') {
            await chat.sendStateTyping();
            await delay(2500);
            await client.sendMessage(
                msg.from,
                'Instalação:\n1. Instale Node.js e VSCode\n2. Clone o repositório: https://github.com/rodrigovmoreira/Chatbot\n3. Execute `npm install`\n4. Inicie com `npm start`'
            );
            delete userStates[msg.from];
            return;
        } else if (body === 'voltar') {
            delete userStates[msg.from];
            await sendMenu(msg, name);
            return;
        }
    }

    if (userState?.awaiting === 'ia_instrucoes' && body === 'ia') {
        await chat.sendStateTyping();
        await delay(2500);
        await client.sendMessage(msg.from, 'Ferramentas de IA que me ajudaram:\n\n- DeepSeek: https://chat.deepseek.com\n- GitHub Copilot: https://github.com/features/copilot');
        delete userStates[msg.from];
        return;
    }

    if (userState?.awaiting === 'mongo_sera' && body.includes('mong')) {
        await chat.sendStateTyping();
        await delay(2500);
        await client.sendMessage(msg.from, 'Sim! MongoDB é ideal para:\n- Histórico de conversas\n- Dados não estruturados\n- Escalabilidade\n\nVeja mais: https://www.mongodb.com/');
        delete userStates[msg.from];
        return;
    }

    if (userState?.awaiting === 'Palavrão!') {
        await chat.sendStateTyping();
        await delay(2500);
        await client.sendMessage(msg.from, `Anotado seu "${msg.body}" 👀\nVoltando ao menu...`);
        delete userStates[msg.from];
        await sendMenu(msg, name);
        return;
    }

    // 2. Depois verifica comandos de menu (regex corrigida)
    if (userMessage.match(/^(menu|ola|oi|voltar)$/i)) {
        await sendMenu(msg, name);
        return;
    } else if (userMessage.match(/^(menu|ola|oi|voltar|[1-5])$/i)) {
        await client.sendMessage(msg.from, "Digite *menu* para opções ou faça uma pergunta mais detalhada!");
    }

    // 2.1. Se não for um comando, use IA para resposta fluída
    if (msg.body.split(' ').length > 3 || msg.body.includes('?')) {
        await chat.sendStateTyping();

        // 2.1 Tenta gerar resposta via IA (com fallback)
        const aiResponse = await generateAIResponse(msg.body, "Você é um chatbot útil chamado MoreiraBot.");

        if (aiResponse) {
            await client.sendMessage(msg.from, aiResponse);
        } else {
            await client.sendMessage(msg.from, "🤖 Pode reformular? Estou aprendendo ainda!");
        }
        return;
    }

    // 3. Por último, opções numéricas
    switch (msg.body) {
        case '1':
            await handleOption1(msg);
            break;
        case '2':
            await handleOption2(msg);
            break;
        case '3':
            await handleOption3(msg);
            break;
        case '4':
            await handleOption4(msg);
            break;
        case '5':
            await handleOption5(msg);
            break;
        default:
            await client.sendMessage(msg.from, 'Não entendi. Digite *menu* para opções.');
    }
});

// Funções para lidar com cada opção
// Cada função pode ser modularizada para facilitar a manutenção
async function handleOption1(msg) {
    const chat = await msg.getChat();
    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Sou um assistente virtual para responder perguntas sobre nossos serviços.\n' +
        'Estou em constante evolução!'
    );

    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Quer ver meu código? Digite *sim* para instruções ou *voltar* ao menu.\n\n' +
        'Repositório: https://github.com/rodrigovmoreira/Chatbot'
    );

    // Define estado para aguardar resposta
    userStates[msg.from] = { awaiting: 'sim_instrucoes' };
}

async function handleOption2(msg) {
    const chat = await msg.getChat();
    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Fui feito em Javascript, com a biblioteca whatsapp-web.js.\n\n' +
        'Sou um assistente virtual que está dando os primeiros passos!'
    );

    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Fui feito com a ajuda de IA, e em breve acho que até comecarei a me comunicar melhor usando alguma biblioteca assim.\n\n' +
        'O DeepSeek e o Github Copilot me ajudaram a criar esse bot! Digite *IA* que te mando o link.'
    );

    // Define estado para aguardar resposta
    userStates[msg.from] = { awaiting: 'ia_instrucoes' };
}

async function handleOption3(msg) {
    const chat = await msg.getChat();
    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Sim, tenho benefícios! Você pode me ajudar a melhorar minhas respostas e tornar minha experiência mais útil para você.\n\n' +
        'Além disso, estou sempre aprendendo e melhorando!'
    );

    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Quer ver meu código? Digite *sim* para instruções ou *voltar* ao menu.\n\n' +
        'Repositório: https://github.com/rodrigovmoreira/Chatbot'
    );

    // Define estado para aguardar resposta
    userStates[msg.from] = { awaiting: 'sim_instrucoes' };
}

async function handleOption4(msg) {
    const chat = await msg.getChat();
    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Um mudança significativa será a introdução de um banco de dados, que pode guardar o histórico do chat e retormar de outros pontos.\n' +
        'O MongoDb é uma opção para essa melhoria!'
    );

    // Define estado para aguardar resposta
    userStates[msg.from] = { awaiting: 'mongo_sera' };
}

async function handleOption5(msg) {
    const chat = await msg.getChat();
    await delay(2500);
    await chat.sendStateTyping();
    await delay(2500);
    await client.sendMessage(
        msg.from,
        'Digite seu Palavrão (ou *voltar* para menu):'
    );

    // Define estado para capturar Palavrão
    userStates[msg.from] = { awaiting: 'Palavrão!' };
}

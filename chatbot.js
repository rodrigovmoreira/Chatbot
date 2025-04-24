const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

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
async function sendMenu(msg, name) {
    const chat = await msg.getChat();
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
        msg.from,
        `Olá ${name.split(" ")[0]}! Sou o chatbot do Rodrigo Moreira. Escolha uma opção:\n\n` +
        '1 - Como funciono\n2 - Por que sou simples?\n3 - Benefícios\n4 - Como melhorar\n5 - Palavão'
    );
}

async function handleOption1(msg) {
    const chat = await msg.getChat();
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
        msg.from,
        'Sou um assistente virtual para responder perguntas sobre nossos serviços.\n' +
        'Estou em constante evolução!'
    );

    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
        msg.from,
        'Quer ver meu código? Digite *sim* para instruções ou *voltar* ao menu.\n\n' +
        'Repositório: https://github.com/rodrigovmoreira/Chatbot'
    );

    // Define estado para aguardar resposta
    userStates[msg.from] = { awaiting: 'sim_instrucoes' };
}

async function handleOption5(msg) {
    const chat = await msg.getChat();
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
        msg.from,
        'Digite seu palavão (ou *voltar* para menu):'
    );

    // Define estado para capturar palavão
    userStates[msg.from] = { awaiting: 'palavrao' };
}

// Handler principal
client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return;

    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname;
    const userState = userStates[msg.from];

    // Verifica se há um estado pendente (ex.: aguardando "sim" ou palavão)
    if (userState?.awaiting === 'sim_instrucoes' && msg.body.toLowerCase() === 'sim') {
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(
            msg.from,
            'Instalação:\n1. Instale Node.js e VSCode\n2. Clone o repositório\n3. Execute `npm install`\n4. Inicie com `npm start`'
        );
        delete userStates[msg.from];
        return;
    }

    if (userState?.awaiting === 'palavrao') {
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(
            msg.from,
            `Você disse: "${msg.body}"\n\nVoltando ao menu...`
        );
        delete userStates[msg.from];
        await sendMenu(msg, name);
        return;
    }

    // Verifica comandos principais
    if (msg.body.match(/(menu|ola|oi|voltar)/i)) {
        await sendMenu(msg, name);
        return;
    }

    switch (msg.body) {
        case '1':
            await handleOption1(msg);
            break;
        case '2':
            // ... (similar à opção 1)
            break;
        case '5':
            await handleOption5(msg);
            break;
        default:
            await client.sendMessage(msg.from, 'Opção inválida. Digite *menu* para voltar.');
    }
});
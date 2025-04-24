<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot WhatsApp - Rodrigo Moreira</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #24292e;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }
        h2 {
            color: #3a3a3a;
            margin-top: 24px;
        }
        code {
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 3px;
            padding: 0.2em 0.4em;
            font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
        }
        pre {
            background-color: #f6f8fa;
            border-radius: 6px;
            padding: 16px;
            overflow: auto;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .badge {
            display: inline-block;
            padding: 3px 6px;
            border-radius: 3px;
            font-size: 14px;
            font-weight: 600;
            margin-right: 6px;
        }
        .badge-node {
            background-color: #026e00;
            color: white;
        }
        .badge-whatsapp {
            background-color: #25D366;
            color: white;
        }
        .emoji {
            font-size: 1.2em;
        }
    </style>
</head>
<body>
    <h1>Chatbot para WhatsApp <span class="emoji">🤖</span></h1>
    
    <p>Um chatbot simples desenvolvido em <strong>Node.js</strong> usando a biblioteca <a href="https://wwebjs.dev/" target="_blank">whatsapp-web.js</a> para interagir com usuários no WhatsApp.</p>
    
    <div>
        <span class="badge badge-node">Node.js</span>
        <span class="badge badge-whatsapp">WhatsApp API</span>
    </div>
    
    <h2><span class="emoji">⚙️</span> Funcionalidades</h2>
    <ul>
        <li><strong>Menu interativo</strong> com 5 opções:
            <ol>
                <li><strong>Como funciono</strong> – Explica o propósito do bot e oferece instruções de instalação</li>
                <li><strong>Por que sou simples?</strong> – Detalha a tecnologia usada e menciona ferramentas de IA</li>
                <li><strong>Benefícios</strong> – Mostra vantagens e como contribuir para melhorias</li>
                <li><strong>Como melhorar</strong> – Sugere integração com <strong>MongoDB</strong> para histórico</li>
                <li><strong>Palavrão</strong> – Captura e repete uma mensagem do usuário (com humor)</li>
            </ol>
        </li>
        <li><strong>Respostas dinâmicas</strong> com <em>typing indicators</em> (simulação de digitação)</li>
        <li><strong>Controle de estados</strong> para fluxos de conversa</li>
    </ul>
    
    <h2><span class="emoji">🛠️</span> Tecnologias</h2>
    <ul>
        <li><strong>Node.js</strong> (Backend)</li>
        <li><strong>whatsapp-web.js</strong> (Conexão com WhatsApp)</li>
        <li><strong>qrcode-terminal</strong> (Autenticação via QR Code)</li>
    </ul>
    
    <h2><span class="emoji">▶️</span> Como Executar</h2>
    <ol>
        <li>Clone o repositório:
            <pre><code>git clone https://github.com/rodrigovmoreira/Chatbot.git
cd Chatbot</code></pre>
        </li>
        <li>Instale as dependências:
            <pre><code>npm install</code></pre>
        </li>
        <li>Inicie o bot:
            <pre><code>npm start</code></pre>
        </li>
        <li>Escaneie o <strong>QR Code</strong> no WhatsApp Web</li>
    </ol>
    
    <h2><span class="emoji">📌</span> Melhorias Futuras</h2>
    <ul>
        <li><input type="checkbox" disabled> Adicionar <strong>banco de dados</strong> (MongoDB) para histórico</li>
        <li><input type="checkbox" disabled> Implementar <strong>NLP</strong> (ex.: Dialogflow) para linguagem natural</li>
        <li><input type="checkbox" disabled> Criar <strong>painel administrativo</strong> para visualizar interações</li>
    </ul>
    
    <p><strong>🔗 Repositório:</strong> <a href="https://github.com/rodrigovmoreira/Chatbot" target="_blank">github.com/rodrigovmoreira/Chatbot</a></p>
    
    <hr>
    
    <footer>
        <p>Feito com JavaScript e <span class="emoji">🤍</span> por <strong>Rodrigo Moreira</strong>.</p>
        <p><em>Contribuições são bem-vindas!</em> <span class="emoji">🚀</span></p>
    </footer>
</body>
</html>
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMessage } = require('./messageHandler');
const dbConnect = require('./services/database');
require('dotenv').config();

const client = new Client();
dbConnect();

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log('Bot conectado ao WhatsApp'));
client.on('message', async msg => handleMessage(client, msg));

client.initialize();


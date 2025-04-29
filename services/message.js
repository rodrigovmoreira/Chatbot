// services/message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'bot'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

async function saveMessage(phone, role, content) {
  await Message.create({ phone, role, content });
}

async function getLastMessages(phone, limit = 10) {
  return await Message.find({ phone }).sort({ timestamp: -1 }).limit(limit).lean();
}

module.exports = { saveMessage, getLastMessages };

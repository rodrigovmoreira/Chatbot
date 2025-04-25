const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  phone: String,
  state: String,
  updatedAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);

async function getOrCreateSession(phone) {
  let session = await Session.findOne({ phone });
  if (!session) {
    session = await Session.create({ phone, state: null });
  }
  return session;
}

async function setSessionState(phone, state) {
  await Session.findOneAndUpdate(
    { phone },
    { state, updatedAt: new Date() },
    { upsert: true }
  );
}

module.exports = { getOrCreateSession, setSessionState };
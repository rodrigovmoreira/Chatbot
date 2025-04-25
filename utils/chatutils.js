function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
  
  async function simulateTyping(chat, ms = 2500) {
    await delay(ms);
    await chat.sendStateTyping();
    await delay(ms);
  }
  
  module.exports = { delay, simulateTyping };
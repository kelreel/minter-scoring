const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');

const db = require('./db');

const BotUser = require('./models/BotUser');

import { config } from './config';

const bot = new TelegramBot(config.botToken, {
  polling: true, request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: config.socksHost,
      socksPort: config.socksPort,
      socksUsername: config.socksUsername,
      socksPassword: config.socksPassword
    }
  }
});

let text = `⚡️ Обновление скоринга.\n\n- *Редизайн веб-версии. 🔥*\n- Интеграция с Minterscan, вывод информации о профиле и фото при наличии.\n- Увеличение скоринга на 10 за верифицированный профиль.\n\nP.S. Скоро будет введен дополнительный платный функционал за монету SCORING ⭕️`;

BotUser.find({}, async (err, res) => {
  const chats = res.map(item => item.chatId)
  console.log(chats.length);
  let ok = 0;

  for (let i = 0; i < chats.length; i++) {
    bot.sendMessage(chats[i], text, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    }).then((res) => {
      console.log(i);
      ok++
    })
  }

})



module.exports = bot;
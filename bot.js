// LYKAN Miner — Telegram Bot
// Handles /start (with referral param), launches the Mini App, and basic commands.

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = process.env.BOT_TOKEN;
const MINIAPP_URL = 'https://itfreelancersclients.github.io/lykan-miner-app/'; // Live Mini App URL
const BOT_USERNAME = process.env.BOT_USERNAME; // e.g. lykan_miner_bot (no @)

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const referralParam = match[1]; // will be the referrer's telegram_id if present
  const firstName = msg.from.first_name || 'there';

  const webAppUrl = referralParam ? `${MINIAPP_URL}?startapp=${referralParam}` : MINIAPP_URL;

  bot.sendMessage(
    chatId,
    `👋 Welcome to LYKAN Miner, ${firstName}!\n\n` +
      `Tap to mine, upgrade your rig, complete tasks, and invite friends to earn more $LYKAN.\n\n` +
      `Every coin you mine now counts toward the LYKAN token airdrop.`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: '⛏️ Start Mining', web_app: { url: webAppUrl } }]],
      },
    }
  );
});

bot.onText(/\/refer/, (msg) => {
  const chatId = msg.chat.id;
  const link = `https://t.me/${BOT_USERNAME}?start=${msg.from.id}`;
  bot.sendMessage(
    chatId,
    `📢 Invite friends and earn bonus coins for every referral!\n\nYour link:\n${link}`
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 LYKAN Miner Bot\n\n` +
      `/start - Open the mining app\n` +
      `/refer - Get your referral link\n` +
      `/help - Show this message`
  );
});

console.log('LYKAN Miner bot is running...');

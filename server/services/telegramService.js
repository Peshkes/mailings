import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import config from '../api/config.js';

const bot = new TelegramBot(config, {polling: false});

export const sendTelegramMessage = async (chatId, message, mediaPath = null) => {
    try {
        if (mediaPath) {
            const extension = mediaPath.split('.').pop().toLowerCase();
            const isPhoto = ['jpg', 'jpeg', 'png'].includes(extension);

            if (isPhoto) {
                await bot.sendPhoto(chatId, fs.createReadStream(mediaPath), {caption: message});
            } else {
                await bot.sendVideo(chatId, fs.createReadStream(mediaPath), {caption: message});
            }
        } else {
            await bot.sendMessage(chatId, message);
        }
        console.log('Сообщение отправлено в Telegram');
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
    }
};

//users, message_text, media_path
export const processTelegramMessages = async (users, message_text, media_path) => {
    for (const user of users) {

        if (!user.chat_id) {
            console.log(`Chat ID для ${user.phone_number} не найден`);
            continue;
        }

        await sendTelegramMessage(user.chat_id, message_text, media_path);

        await new Promise(resolve => setTimeout(resolve, 500));
    }
};
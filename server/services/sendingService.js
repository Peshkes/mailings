import db from "../api/db/dbConfig.js";
import {getMessageById} from "./messageService.js";
import {getClientsByTypeId, getClients} from "./clientService.js";
import {processTelegramMessages} from "./telegramService.js";
import {sendManyMessagesByWhatsapp} from "./whatsAppService.js";
import {deleteMessage} from "./messageService.js";
import emmiter from "../api/emmiter.js";
import emitter from "../api/emmiter.js";

/**
 * Отправляет сообщение немедленно (без сохранения в базе данных).
 * @param {string} message_text - Текст сообщения.
 * @param {number} recipient_type_id - ID типа получателя.
 * @param {string} media_path - Путь к медиа (может быть пустым).
 * @returns {Promise<Object>} - Объект с результатом отправки сообщения.
 */
export async function sendMessageImmediately(message_text, recipient_type_id, media_path) {
    let users;
    try {
        if (recipient_type_id)
            users = await getClientsByTypeId(recipient_type_id);
        else
            users = await getClients();

        if (users !== null && users.length !== 0) {
            const groupedUsers = users.reduce((acc, user) => {
                acc[user.messanger_id] = acc[user.messanger_id] || [];
                acc[user.messanger_id].push(user);
                return acc;
            }, {});

            for (const [messengerId, users] of Object.entries(groupedUsers)) {
                if (messengerId === '1') { // WhatsApp
                    await sendManyMessagesByWhatsapp(users, message_text, media_path);
                } else if (messengerId === '2') { // Telegram
                    await processTelegramMessages(users, message_text, media_path);
                } else {
                    throw new Error('Unsupported messenger');
                }
            }
            return {
                status: 'Message sent immediately'
            };
        } else{
            return {
                status: 'There are no clients'
            };
        }
    } catch (err) {
        throw new Error(`Failed to send message immediately: ${err.message}`);
    }
}

/**
 * Отправляет отложенное сообщение немедленно.
 * @param {number} id - ID отложенного сообщения.
 * @returns {Promise<Object>} - Объект с результатом отправки сообщения.
 */
export async function sendDelayedMessageNow(id) {
    try {
        const message = await getMessageById(id);

        if (!message) {
            throw new Error('Message not found');
        }
        console.log(`Sending message: ${message.id}`);
        const result = await sendMessageImmediately(message.message_text, message.recipient_type_id, message.media_path);
        console.log(`Message sent: ${result.status}`);
        const deletedMessage = await deleteMessage(message.id);
        console.log(`Message deleted: ${deletedMessage}`);
        emitter.emit('update', 'messages');
    } catch (err) {
        throw new Error(`Failed to send delayed message now: ${err.message}`);
    }
}

/**
 * Получает запланированные сообщения.
 * @returns {Promise<Object>} - Объект с запланированными сообщениями.
 */
export async function getScheduledMessages() {
    try {
        const currentTimestamp = Date.now();
        return await db('messages')
            .where('sending_date', '<=', currentTimestamp).first();
    } catch (err) {
        console.log(`Failed to retrieve scheduled messages: ${err.message}`);
        throw new Error(`Failed to retrieve scheduled messages: ${err.message}`);
    }
}

/**
 * Отправляет запланированные сообщения.
 * @returns {Promise<void>}
 */
export async function sendScheduledMessages() {
    try {
        const message = await getScheduledMessages();
        if (!message) {
            console.log('There is no message to send');
            return;
        }
        console.log(`Sending scheduled message: ${message.id}`);
        const result = await sendMessageImmediately(message.message_text, message.recipient_type_id, message.media_path);
        console.log(`Message sent: ${result.status}`);
        const deletedMessage = await deleteMessage(message.id);
        console.log(`Message deleted: ${deletedMessage}`);
        emitter.emit('update', 'messages');
        return result;
    } catch (err) {
        console.error(`Failed to send scheduled messages: ${err.message}`);
    }
}
import db from "../api/db/dbConfig.js";

/**
 * Проверяет корректность текста сообщения.
 * @param {string} message_text - Текст сообщения.
 * @returns {boolean} - Корректность текста.
 */
export function validateMessageText(message_text) {
    return typeof message_text === 'string' && message_text.trim().length > 0;
}

/**
 * Проверяет корректность темы сообщения.
 * @param {string} theme - Тема сообщения.
 * @returns {boolean} - Корректность текста.
 */
export function validateMessageTheme(theme) {
    return typeof theme === 'string' && theme.trim().length > 0;
}


/**
 * Проверяет корректность ссылки на видео.
 * @param {string} media_path - Ссылка на видео.
 * @returns {boolean} - Корректность ссылки.
 */
export function validateMediaPath(media_path) {
    return media_path == undefined || (typeof media_path === 'string' && media_path.trim().length > 0);
}

/**
 * Проверяет корректность отправляемой даты.
 * @param {number} sending_date - Дата отправки в формате long timestamp.
 * @returns {boolean} - Корректность даты.
 */
export function validateSendingDate(sending_date) {
    return Number.isInteger(sending_date) && sending_date > 0;
}

/**
 * Проверяет корректность отправляемой даты.
 * @param {number} messageId - ID рассылки.
 * @returns {Promise<Object>} - Результат проверки. Включает флаг `valid` и сообщение об ошибке при необходимости.
 */
export async function validateMessageExists(messageId) {
    const message = await db('messages').where({ id: messageId }).first();
    return message ? { valid: true } : { valid: false, message: 'Message not found' };
}

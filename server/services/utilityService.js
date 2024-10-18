import db from "../api/db/dbConfig.js";

export async function getRecipientTypes() {
    try {
        return db('client_types').select('*');
    } catch (err) {
        throw new Error(`Failed to retrieve client types: ${err.message}`);
    }
}

export async function getMessengerTypes() {
    try {
        return db('messengers').select('*');
    } catch (err) {
        throw new Error(`Failed to retrieve client types: ${err.message}`);
    }
}

export async function getSettings() {
    try {
        const settings = await db('settings').select('*');

        const settingsMap = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});

        return {
            telegram: settingsMap.telegram || '',
            whatsapp: settingsMap.whatsapp || '',
            licence: settingsMap.licence || ''
        };
    } catch (err) {
        throw new Error(`Failed to retrieve settings: ${err.message}`);
    }
}

export async function updateSettings(settings) {
    try {
        const keysToUpdate = ['telegram', 'whatsapp', 'licence'];
        let updatedFields = [];

        const currentSettings = await db('settings').select('*');

        const settingsMap = currentSettings.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        for (const key of keysToUpdate) {
            if (settings[key] !== undefined && settings[key] !== settingsMap[key]) {
                await db('settings')
                    .where('key', key)
                    .update({ value: settings[key] });

                updatedFields.push(key);
            }
        }

        if (updatedFields.length === 0) {
            return 'Нет изменений в настройках';
        } else {
            return `Настройки обновлены: ${updatedFields.join(', ')}`;
        }
    } catch (err) {
        throw new Error(`Ошибка при обновлении настроек: ${err.message}`);
    }
}
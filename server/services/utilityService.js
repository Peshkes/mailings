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
        };
    } catch (err) {
        throw new Error(`Failed to retrieve settings: ${err.message}`);
    }
}

export async function updateSettings(settings) {
    try {
        const keysToUpdate = ['telegram', 'whatsapp'];
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

export async function updateRecipientTypes(newRecipientTypes) {
    const oldTypes = await getRecipientTypes();

    console.log(oldTypes);
    console.log(newRecipientTypes);

    const toRemove = oldTypes.filter(oldType =>
        !newRecipientTypes.some(newType => newType.id === oldType.id)
    );

    const toAdd = newRecipientTypes.filter(newType =>
        !oldTypes.some(oldType => oldType.id === newType.id)
    );

    const toUpdate = newRecipientTypes.filter(newType =>
        oldTypes.some(oldType => oldType.id === newType.id && oldType.type_name !== newType.type_name)
    );

    for (const type of toRemove) {
        await deleteRecipientType(type.id);
    }

    for (const type of toAdd) {
        await addRecipientType(type);
    }

    for (const type of toUpdate) {
        await updateRecipientType(type.id, type.type_name);
    }
}

async function addRecipientType(type) {
    try {
        await db('client_types').insert(type);
    } catch (err) {
        throw new Error(`Failed to add recipient type: ${err.message}`);
    }
}

async function updateRecipientType(id, name) {
    try {
        await db('client_types')
            .where('id', id)
            .update({type_name: name});
    } catch (err) {
        throw new Error(`Failed to update recipient type: ${err.message}`);
    }
}

async function deleteRecipientType(id) {
    try {
        await db('client_types')
            .where('id', id)
            .del();
    } catch (err) {
        throw new Error(`Failed to delete recipient type: ${err.message}`);
    }
}
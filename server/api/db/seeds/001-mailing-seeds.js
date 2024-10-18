export const seed = async function (knex) {
    await knex('client_types').truncate();
    await knex('messengers').truncate();
    await knex('settings').truncate();

    await knex('client_types').insert([
        {type_name: 'Взрослые'},
        {type_name: 'С детьми'}
    ]);

    await knex('messengers').insert([
        {messanger_name: 'WhatsApp'},
        {messanger_name: 'Telegram'}
    ]);

    await knex('settings').insert([
        {key: 'telegram', value: null},
        {key: 'whatsapp', value: null},
        {key: 'licence', value: null}
    ]);
};
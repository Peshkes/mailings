import { fileURLToPath } from 'url';
import path from 'path';


// Получаем имя файла и его директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, __dirname.includes('app.asar') ? '../../dev.mailing.db3' : './api/db/dev.mailing.db3'),
      // filename: './api/db/dev.mailing.db3'
    },
    migrations: {
      directory: './api/db/migrations'
    },
    seeds: {
      directory: './api/db/seeds'
    },
    useNullAsDefault: true,
  },
};



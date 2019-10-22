import {Database} from 'sqlite3';
import {DB_FILE} from './config';

export const DB = new Database(DB_FILE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to Database: ' + DB_FILE);
});
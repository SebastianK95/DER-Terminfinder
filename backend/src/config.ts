import * as fs from "fs";

const ROUTE: string = '/graphql';
const PORT: number = 4000;
const DB_FILE: string = 'derTerminfinder.sqlite3';
const DB_PATH = __dirname + '/../' + DB_FILE;
const DB_EXISTS = fs.existsSync(DB_PATH);

const SMTP_HOST = 'alfa3201.alfahosting-server.de';
const SMTP_PORT = 587;
const SMTP_SSL = false; // if false, TLS is used
const SMTP_USER = 'web23325642p22';
const SMTP_PASSWORD = 'FyiZa6cw';
const SMTP_FROM = 'der-terminfinder@sk-hosting.eu';

const SMTP_TEST_TO = 'der-terminfinder-an@sk-hosting.eu';
const SMTP_TEST_SUBJECT = 'Buy apples!';
const SMTP_TEST_TEXT = 'Could you please buy some apples when you get back?';
const SMTP_TEST_HTML = '<h1>Do it!</h1><p>Could you please buy some apples when you get back?</p>';

export {
    ROUTE,
    PORT,
    DB_PATH,
    DB_FILE,
    DB_EXISTS,

    SMTP_HOST,
    SMTP_PORT,
    SMTP_SSL,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM,

    SMTP_TEST_TO,
    SMTP_TEST_SUBJECT,
    SMTP_TEST_TEXT,
    SMTP_TEST_HTML,
}
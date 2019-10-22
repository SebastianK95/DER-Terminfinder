import {Database} from 'sqlite3';
import {Logger} from '../Services/Logger';

export class TokenRepository {
    private static readonly TABLE = 'Token';
    private result: any;

    constructor(private db: Database) {
    }

    async tokenExists(tokenString: string) {
        await this.getToken(tokenString);
        return this.result[0] != undefined;
    }

    async tokenExistsById(id: number) {
        await this.getTokenById(id);
        return this.result != null;
    }

    async getToken(tokenString: string) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + TokenRepository.TABLE + ' WHERE tokenString = $tokenString', {
                $tokenString: tokenString
            }, (err, rows) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    this.result = rows;
                    resolve();
                }
            });
        });
        return this.result[0] != undefined ? this.result[0] : null;
    }

    async getTokenById(id: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + TokenRepository.TABLE + ' WHERE id = $id', {
                $id: id
            }, (err, rows) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    this.result = rows;
                    resolve();
                }
            });
        });
        return this.result[0] != undefined ? this.result[0] : null;
    }

    async tokenIsNotExpired(tokenString: string) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + TokenRepository.TABLE + ' WHERE tokenString = $tokenString AND used IS NULL', {
                $tokenString: tokenString
            }, (err, rows) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    reject(err);
                } else {
                    this.result = rows;
                    resolve();
                }
            });
        });
        return this.result.length > 0 && (this.result[0].expirationDate === null || this.result[0].expirationDate >= Math.floor(Date.now() / 1000));
    }

    async setTokenAsUsed(tokenString: string) {
        if (await this.tokenExists(tokenString) && await this.tokenIsNotExpired(tokenString)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + TokenRepository.TABLE + ' SET used = $used WHERE tokenString = $tokenString', {
                    $tokenString: tokenString,
                    $used: Math.floor(Date.now() / 1000)
                }, (err) => {
                    if (err) {
                        Logger.error(JSON.stringify(err));
                        this.result = false;
                        reject(err);
                    } else {
                        this.result = true;
                        resolve(tokenString);
                    }
                });
            });
            return this.result;
        }
        return false;
    }

    async createToken(token: { tokenString, type, userId, expirationDate }) {
        await new Promise((resolve, reject) => {
            this.db.run('INSERT INTO ' + TokenRepository.TABLE + '(userId, tokenString, expirationDate, type) VALUES ($userId, $tokenString, $expirationDate, $type)', {
                $tokenString: token.tokenString,
                $type: token.type,
                $userId: token.userId,
                $expirationDate: token.expirationDate
            }, (err) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    this.result = false;
                    reject(err);
                } else {
                    this.result = true;
                    resolve(token);
                }
            });
        });
        return this.result;
    }
}
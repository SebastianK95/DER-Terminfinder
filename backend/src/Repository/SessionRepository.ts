import {Database} from 'sqlite3';
import {Logger} from '../Services/Logger';
import {v4 as uuid} from 'uuid';
import {TokenRepository} from './TokenRepository';
import {DB} from '../DB';

let tokenRepository = new TokenRepository(DB);

export class SessionRepository {
    private static readonly TABLE = 'Session';
    private result: any;

    constructor(private db: Database) {
    }

    async getActiveSessionsByUserId(userId: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + SessionRepository.TABLE + ' WHERE userId = $userId AND destroyed IS NULL', {
                $userId: userId
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
        return this.result;
    }

    async getSessionsByUserId(userId: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + SessionRepository.TABLE + ' WHERE userId = $userId', {
                $userId: userId
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
        return this.result;
    }

    async createSession(userId: number, ip: string) {
        await this.destroyOldSessions(userId);
        const tokenString = uuid();
        let tokenCreated = await tokenRepository.createToken({
            tokenString: tokenString,
            type: 'sessionToken',
            userId: userId,
            expirationDate: null
        });

        if (tokenCreated) {
            let token = await tokenRepository.getToken(tokenString);
            if (token) {
                await new Promise((resolve, reject) => {
                    this.db.run('INSERT INTO ' + SessionRepository.TABLE + '(userId, ip, tokenId, destroyed) VALUES ($userId, $ip, $tokenId, NULL)', {
                        $userId: userId,
                        $ip: ip,
                        $tokenId: token.id
                    }, (err) => {
                        if (err) {
                            Logger.error(JSON.stringify(err));
                            this.result = false;
                            reject(err);
                        } else {
                            this.result = true;
                            resolve(userId);
                        }
                    });
                });
                return this.result ? token.tokenString : '';
            }
            return false;

        }
        return false;
    }

    private async destroyOldSessions(userId: number) {
        let sessions = await this.getActiveSessionsByUserId(userId);
        sessions.forEach(async session => {
            let tokenId = session.tokenId;
            let token = await tokenRepository.getTokenById(tokenId);
            if (token) {
                this.destroySession(token.tokenString, userId);
            }
        });
    }

    async destroySession(tokenString: string, userId: number) {
        let token = await tokenRepository.getToken(tokenString);
        if (token) {
            if (await this.userSessionExistsAndIsNotExpired(userId, tokenString)) {
                await tokenRepository.setTokenAsUsed(tokenString);
                await new Promise((resolve, reject) => {
                    this.db.run('UPDATE ' + SessionRepository.TABLE + ' SET destroyed = $destroyed WHERE tokenId = $tokenId AND userId = $userId', {
                        $tokenId: token.id,
                        $userId: userId,
                        $destroyed: Math.floor(Date.now() / 1000)
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
    }

    async userSessionExistsAndIsNotExpired(userId: number, tokenString: string) {
        let token = await tokenRepository.getToken(tokenString);
        if (token) {
            await new Promise((resolve, reject) => {
                this.db.all('SELECT * FROM ' + SessionRepository.TABLE + ' WHERE tokenId = $tokenId AND destroyed IS NULL', {
                    $tokenId: token.id
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
            return this.result.length > 0 && await tokenRepository.tokenIsNotExpired(tokenString);
        } else {
            return false;
        }
    }
}
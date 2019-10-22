import {Database} from 'sqlite3';
import {Logger} from '../Services/Logger';

export class UserRepository {
    private static readonly TABLE = 'User';
    private result: any;

    constructor(private db: Database) {
    }

    async getUsers() {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + UserRepository.TABLE, {}, (err, rows) => {
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

    async getUserById(id: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + UserRepository.TABLE + ' WHERE id = $id', {
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
        return this.result;
    }

    async getUserByEmail(email: string) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + UserRepository.TABLE + ' WHERE email = $email', {
                $email: email
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

    async createUser(args) {
        await new Promise((resolve, reject) => {
            this.db.run('INSERT INTO ' + UserRepository.TABLE + '(name, email, password) VALUES ($name, $email, $password)', {
                $name: args.name,
                $email: args.email,
                $password: args.password,
            }, (err) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    this.result = false;
                    reject(err);
                } else {
                    this.result = true;
                    resolve(args);
                }
            });
        });
        return this.result;
    }

    async updateUsername(args: any) {
        if (await this.userExists(args.id)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + UserRepository.TABLE + ' SET name = $name WHERE id = $id', {
                    $name: args.name,
                    $id: args.id
                }, (err) => {
                    if (err) {
                        Logger.error(JSON.stringify(err));
                        this.result = false;
                        reject(err);
                    } else {
                        this.result = true;
                        resolve(args);
                    }
                });
            });
            return this.result;
        }
        return false;
    }

    async updatePassword(args: any) {
        if (await this.userExists(args.id)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + UserRepository.TABLE + ' SET password = $password WHERE id = $id', {
                    $password: args.password,
                    $id: args.id
                }, (err) => {
                    if (err) {
                        Logger.error(JSON.stringify(err));
                        this.result = false;
                        reject(err);
                    } else {
                        this.result = true;
                        resolve(args);
                    }
                });
            });
            return this.result;
        }
        return false;
    }

    async deleteUserById(id: number) {
        if (await this.userExists(id)) {
            await new Promise((resolve, reject) => {
                this.db.run('DELETE FROM ' + UserRepository.TABLE + ' WHERE id = $id', {
                    $id: id
                }, (err) => {
                    if (err) {
                        Logger.error(JSON.stringify(err));
                        this.result = false;
                        reject(err);
                    } else {
                        this.result = true;
                        resolve(id);
                    }
                });
            });
            return this.result;
        }
        return false;
    }

    async userExists(id: number) {
        await this.getUserById(id);
        return this.result[0] != undefined;
    }

    async userExistsByEmail(email: string) {
        await this.getUserByEmail(email);
        return this.result[0] != undefined;
    }

    async userExistsAndIsAuthorizedById(id: number, password: string) {
        await this.getUserById(id);
        return this.result[0] != undefined && this.result[0].password === password;
    }

    async userExistsAndIsAuthorizedByEmail(email: string, password: string) {
        await this.getUserByEmail(email);
        return this.result[0] != undefined && this.result[0].password === password;
    }

    userIsLoggedIn(request): boolean {
        if (!request.session.user) {
            return false;
        } else {
            return request.session.user ? true : false;
        }
    }
    async userDoLogin(request, email: string, password: string): Promise<boolean> {
        // Prüfe Login-Daten
        let login_ok = await this.userExistsAndIsAuthorizedByEmail(email, password);

        if (this.userIsLoggedIn(request)) {
            // Doppelter Login nicht möglich
            return false;
        } else if (!login_ok) {
            // Login-Daten sind falsch
            return false;
        } else {
            // Login OK
            let user_daten = await this.getUserByEmail(email);
            request.session.user = user_daten.id;
            return true;
        }
    }
}
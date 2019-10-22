import {Database} from 'sqlite3';
import {Logger} from '../Services/Logger';

export class FinderRepository{
    private static readonly TABLE = 'Finder';
    private result: any;

    constructor(private db: Database) {
    }

    async getFinders(){
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + FinderRepository.TABLE, {
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

    async getFinderById(id: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + FinderRepository.TABLE + ' WHERE id = $id', {
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
    async getFindersByUserId(userId: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + FinderRepository.TABLE + ' WHERE userId = $userId', {
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

    async createFinder(args) {
        await new Promise((resolve, reject) => {
            this.db.run('INSERT INTO ' + FinderRepository.TABLE + '(name, userId, description) VALUES ($name, $userId, $description)', {
                $name: args.name,
                $userId: args.userId,
                $description: args.description
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

    async updateFinderName(args: any) {
        if (await this.finderExists(args.id)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + FinderRepository.TABLE + ' SET name = $name WHERE id = $id', {
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

    async updateFinderDescription(args: any) {
        if (await this.finderExists(args.id)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + FinderRepository.TABLE + ' SET description = $description WHERE id = $id', {
                    $description: args.description,
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

    async deleteFinderById(id: number) {
        if (await this.finderExists(id)) {
            await new Promise((resolve, reject) => {
                this.db.run('DELETE FROM ' + FinderRepository.TABLE + ' WHERE id = $id', {
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

    async finderExists(id: number) {
        await this.getFinderById(id);
        return this.result[0] != undefined;
    }
}
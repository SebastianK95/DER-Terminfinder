import { Database } from 'sqlite3';
import { Logger } from '../Services/Logger';

export class MeetingChoiceRepository {
    private static readonly TABLE = 'MeetingChoice';
    private result: any;

    constructor(private db: Database) {
    }

    async getMeetingChoices() {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + MeetingChoiceRepository.TABLE, {
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

    async getMeetingChoiceById(id: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + MeetingChoiceRepository.TABLE + ' WHERE id = $id', {
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
    async getMeetingChoicesByFinderId(finderId: number) {
        await new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM ' + MeetingChoiceRepository.TABLE + ' WHERE finderId = $finderId', {
                $finderId: finderId
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

    async createMeetingChoice(args) {
        await new Promise((resolve, reject) => {
            this.db.run('INSERT INTO ' + MeetingChoiceRepository.TABLE + '(finderId, date, time, isprivat) VALUES ($finderId, $date, $time, $isprivat)', {
                $finderId: args.finderId,
                $date: args.date,
                $time: args.time,
                $isprivat: args.isprivat,
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

    async updateMeetingChoiceDate(args: any) {
        if (await this.meetingChoiceExists(args.id)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + MeetingChoiceRepository.TABLE + ' SET date = $date WHERE id = $id', {
                    $date: args.date,
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

    async updateMeetingChoiceTime(args: any) {
        if (await this.meetingChoiceExists(args.id)) {
            await new Promise((resolve, reject) => {
                this.db.run('UPDATE ' + MeetingChoiceRepository.TABLE + ' SET time = $time WHERE id = $id', {
                    $time: args.time,
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

    async deleteMeetingChoiceById(id: number) {
        if (await this.meetingChoiceExists(id)) {
            await new Promise((resolve, reject) => {
                this.db.run('DELETE FROM ' + MeetingChoiceRepository.TABLE + ' WHERE id = $id', {
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

    async meetingChoiceExists(id: number) {
        await this.getMeetingChoiceById(id);
        return this.result[0] != undefined;
    }
}
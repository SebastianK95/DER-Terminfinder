import {User} from './user';

export class Session {
    constructor(public token: string, public user: User) {

    }

    toString() {
        let sessionString = {token: this.token, user: JSON.stringify(this.user.toData())};
        return JSON.stringify(sessionString);
    }

    static fromString(string: string) {
        let sessionObject = JSON.parse(string);
        let token = sessionObject.token;
        let user = User.fromData(JSON.parse(sessionObject.user));
        return new Session(token, user);
    }
}
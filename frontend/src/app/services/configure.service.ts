import {Injectable} from '@angular/core';
import {User} from "../entity/user";

@Injectable()
export class ConfigureService {

    public showLoadingBarState = false;

    public choosenUserBoxData = [];

    constructor() {
    }

    /**
     * Aktiviert/Deaktiviert die LoadingBar
     */
    showLoadingBar() {
        this.showLoadingBarState = this.showLoadingBarState === true ? false : true;
    };

    /**
     * Getter/Setter fuer die Userauswahlbox.
     */
    choosenUserBox(user = null) {
        var self = this;
        return {
            get: function () {
                return self.choosenUserBoxData;
            },
            set: function (user) {
                if (typeof user === 'object') {
                    self.choosenUserBoxData.push(user);
                }
            }
        };
    };


    userIsChosen(user: User) {
        let userExists = false;
        this.choosenUserBoxData.forEach((chosenUser: User) => {
            if (chosenUser.id === user.id) {
                userExists = true;
            }
        });
        return userExists;
    }

}

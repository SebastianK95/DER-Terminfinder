import {Component, OnInit} from '@angular/core';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
import {User} from "../../entity/user";

@Component({
    selector: 'app-choose-user-box',
    templateUrl: './choose-user-box.component.html',
    styleUrls: ['./choose-user-box.component.scss']
})
export class ChooseUserBoxComponent implements OnInit {

    public showName = true;

    public allUser = [];

    public userFilter = '';

    private filteredUsers: User[];

    constructor(private general: GeneralApiGateway, private configure: ConfigureService) {
    }

    get choosenUsers() {
        return this.configure.choosenUserBox().get();
    };

    filterUserData() {
        if (!this.showName) {
            this.filteredUsers = this.allUser.filter((user: User) => {
                return user.email.includes(this.userFilter) && !this.configure.userIsChosen(user);
            });
        } else {
            this.filteredUsers = this.allUser.filter((user: User) => {
                return user.name.includes(this.userFilter) && !this.configure.userIsChosen(user);
            });
        }
    }

    /**
     * In dieser Mehode werden alle User ermittelt.
     */
    async getAllUser() {
        const promisedData = this.general.select(
            'User',
            ['name', 'email', 'id']
        );
        await promisedData.then((res)=>  {
            this.allUser = res.data;
        });
    }

    /**
     * Diese Methode waehlt einen User aus und entfernt diesen
     * aus der Bestandsliste.
     * @param    {object}    user    Ein User-Objekt.
     *                               {
 *                                 id:
 *                                 email:
 *                                 name:
 *                               }
     */
    chooseUser(user) {
        this.configure.choosenUserBox().set(user);
        this.filterUserData();
    }

    /**
     * Diese Methode waehlt einen User ab.
     * @param    {object}    user    Ein User-Objekt.
     *                               {
 *                                 id:
 *                                 email:
 *                                 name:
 *                               }
     */
    unchooseUser(user) {
        this.configure.choosenUserBoxData  = this.configure.choosenUserBoxData.filter((chosenUser: User) => {
            return user.id != chosenUser.id;
        });
        this.filterUserData();
    }

    async ngOnInit() {
        await this.getAllUser();
        this.filteredUsers = this.allUser;
    }
}

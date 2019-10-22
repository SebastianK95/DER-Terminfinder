import {Injectable} from '@angular/core';
import {User} from "../entity/user";
import {Http} from '@angular/http';
import {SessionApiGatewayService} from './gateways/session-api-gateway.service';
import {Session} from '../entity/session';
import {EventService} from './event.service';

@Injectable()
export class SessionService {
  
    public loginedUserId = 0;
  
    private _userIsLoggedIn: boolean = false;

    constructor(private http: Http, private sessionApiGatewayService: SessionApiGatewayService, private eventService: EventService) {
        this.eventService.appStarted.subscribe(SessionService.name, () => {
            this.refreshUserLoggedInState();
        });
    }

    getUser() {
        let session = this.getLocalSession();
        if (session) {
            return session.user;
        }
        return null;
    }

    async userIsLoggedIn() {
        await this.refreshUserLoggedInState();
        return this._userIsLoggedIn;
    }

    async loginUser(user: User) {
        let token = (await this.sessionApiGatewayService.loginUser(user.id, await this.getIp())).data;
        if (token !== '') {
            let session = new Session(token, user);
            localStorage.setItem('session', session.toString());
            await this.refreshUserLoggedInState();
            return true;
        }
        return false;
    }


    async refreshUserLoggedInState() {
        let session = this.getLocalSession();
        if (session !== null) {
            this._userIsLoggedIn = (await this.sessionApiGatewayService.userIsLoggedIn(session.user.id, session.token)).data;
            this.eventService.loginStateUpdated.emit({userIsLoggedIn: this._userIsLoggedIn});
            this.updateLocalSession();
        } else {
            this.eventService.loginStateUpdated.emit({userIsLoggedIn: false});
            this._userIsLoggedIn = false;
        }
    }

    async logoutUser() {
        let session = this.getLocalSession();
        if (session !== null) {
            await this.sessionApiGatewayService.logoutUser(session.user.id, session.token);
            await this.refreshUserLoggedInState();
        }
        this._userIsLoggedIn = false;
        this.updateLocalSession();
    }

    async getIp() {
        let url = "//freegeoip.net/json/";
        return await this.http.get(url).toPromise().then((result) => {
            return result.json().ip;
        });
    }

    private getLocalSession(): Session {
        let sessionString = localStorage.getItem('session');
        return sessionString != null ? Session.fromString(sessionString) : null;
    }

    private updateLocalSession() {
        if (!this._userIsLoggedIn) {
            localStorage.removeItem('session');
        }
    }
    
    setLoginUserId() {
      var session = JSON.parse(localStorage.getItem('session')), userObj, userId = 0;
      if(session !== null) {
        userObj = JSON.parse(session.user);
        userId = parseInt(userObj.id, 10);
      }
      this.loginedUserId = userId;
    }
    
    get loginUserId() {
      return this.loginedUserId;
    }
}

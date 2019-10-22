import { SessionService } from './session.service';
import { User } from "../entity/user";
import { EventService } from './event.service';
import { Session } from '../entity/session';

class MockResponse {
    json() {
        return { ip: '127.0.0.1' }
    }
}

class MockPromise {
    then(callback) {
        return new MockResponse();
    }
}

class MockObservable {
    toPromise() {
        return new MockPromise()
    }
}

class MockHttp {
    get(url) {
        return new MockObservable()
    }
}

class MockSessionApiGatewayService {
    userIsLoggedIn(userId, token) {
        return { data: true }
    }

    loginUser(userId, ip) {
        return 'tokenString';
    }
}


describe('SessionService', () => {
    let service: SessionService;
    let exampleUser: User;
    let http;
    let sessionApiGatewayService;
    let eventService;
    let localStorage;
    beforeEach(() => {
        http = new MockHttp();
        sessionApiGatewayService = new MockSessionApiGatewayService();
        eventService = new EventService();

        service = new SessionService(http, sessionApiGatewayService, eventService);
        exampleUser = User.fromData({
            id: 1,
            email: 'a@b.de',
            name: 'exampleUser'
        });
        localStorage = {
            setItem(item) {

            },

            getItem(id) {
                return new Session('tokenString', exampleUser).toString()
            },
            clear() {

            }
        };
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save User to localstorage', async () => {
        await service.loginUser(exampleUser);
        expect(Session.fromString(localStorage.getItem('session')).user).toEqual(exampleUser);
    });

    it('should return same user from session', async function () {
        service.loginUser(exampleUser);
        expect(await service.getUser()).toEqual(exampleUser);
    });

    it('should return true if user is in session', async function () {
        await service.loginUser(exampleUser);
        expect(await service.userIsLoggedIn()).toEqual(true);
    });

    it('should remove user from session on logout', async function () {
        await service.loginUser(exampleUser);
        await service.logoutUser();
        await service.refreshUserLoggedInState();
        expect(await service.userIsLoggedIn()).toBeFalsy();
    });
});

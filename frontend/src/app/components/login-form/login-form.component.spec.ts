import {async} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {EventService} from '../../services/event.service';

class MockUserService {
}

class MockRouter {
}

class MockSessionService {
}

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let userService;
    let sessionService;
    let eventService;
    let router;
    beforeEach(async(() => {
        userService = new MockUserService();
        sessionService = new MockSessionService();
        eventService = new EventService();
        router = new MockRouter();
        component = new LoginFormComponent(userService, router, sessionService, eventService);
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

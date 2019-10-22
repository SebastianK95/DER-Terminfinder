import {async} from '@angular/core/testing';

import {RegisterFormComponent} from './register-form.component';

class MockUserService {
}

class MockMessageBoxService {
}

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let userService;
  let messageBoxService;

  beforeEach(async(() => {
    userService = new MockUserService();
    messageBoxService = new MockMessageBoxService();
    component = new RegisterFormComponent(userService, messageBoxService);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

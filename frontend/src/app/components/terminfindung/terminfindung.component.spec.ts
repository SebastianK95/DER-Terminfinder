import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminfindungComponent } from './terminfindung.component';

class MockMessageBoxService {
}

class MockFinderService {
}

describe('TerminfindungComponent', () => {
  let component: TerminfindungComponent;
  let finderService;
  let messageBoxService;

  beforeEach(async(() => {
    messageBoxService = new MockMessageBoxService();
    finderService = new MockFinderService();
    component = new TerminfindungComponent(messageBoxService, finderService);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { MessageBoxService } from './message-box.service';
import {EventService} from './event.service';

describe('MessageBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBoxService, EventService]
    });
  });

  it('should be created', inject([MessageBoxService], (service: MessageBoxService) => {
    expect(service).toBeTruthy();
  }));
});

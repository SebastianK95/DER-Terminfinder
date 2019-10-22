import { TestBed, inject } from '@angular/core/testing';

import { MeetingChoiceApiGatewayService } from './meeting-choice-api-gateway.service';
import {HttpModule} from '@angular/http';

describe('MeetingChoiceApiGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [MeetingChoiceApiGatewayService]
    });
  });

  it('should be created', inject([MeetingChoiceApiGatewayService], (service: MeetingChoiceApiGatewayService) => {
    expect(service).toBeTruthy();
  }));
});

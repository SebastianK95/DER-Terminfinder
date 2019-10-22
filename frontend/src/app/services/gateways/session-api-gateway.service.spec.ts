import { TestBed, inject } from '@angular/core/testing';

import { SessionApiGatewayService } from './session-api-gateway.service';
import {Http} from '@angular/http';
class MockHttp{}
describe('SessionApiGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionApiGatewayService, {provide: Http, useClass: MockHttp}],
    });
  });

  it('should be created', inject([SessionApiGatewayService], (service: SessionApiGatewayService) => {
    expect(service).toBeTruthy();
  }));
});

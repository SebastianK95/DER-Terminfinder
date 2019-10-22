import {inject, TestBed} from '@angular/core/testing';

import {TokenService} from './token.service';
import {TokenApiGatewayService} from "./gateways/token-api-gateway.service";

class MockTokenApiGatewayService {

}

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService, {provide: TokenApiGatewayService, useClass: MockTokenApiGatewayService}]
    });
  });

  it('should be created', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));
});

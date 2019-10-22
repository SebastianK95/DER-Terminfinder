import { TestBed, inject } from '@angular/core/testing';

import { TokenApiGatewayService } from './token-api-gateway.service';
import {HttpModule} from "@angular/http";

describe('TokenApiGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenApiGatewayService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([TokenApiGatewayService], (service: TokenApiGatewayService) => {
    expect(service).toBeTruthy();
  }));
});

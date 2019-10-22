import {TestBed, inject} from '@angular/core/testing';

import {UserApiGatewayService} from './user-api-gateway.service';
import {HttpModule} from '@angular/http';

describe('UserApiGatewayService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [UserApiGatewayService]
        });
    });

    it('should be created', inject([UserApiGatewayService], (service: UserApiGatewayService) => {
        expect(service).toBeTruthy();
    }));
});

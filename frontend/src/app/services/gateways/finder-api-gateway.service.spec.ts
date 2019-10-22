import {TestBed, inject} from '@angular/core/testing';

import {FinderApiGatewayService} from './finder-api-gateway.service';
import {HttpModule} from '@angular/http';

describe('FinderApiGatewayService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [FinderApiGatewayService]
        });
    });

    it('should be created', inject([FinderApiGatewayService], (service: FinderApiGatewayService) => {
        expect(service).toBeTruthy();
    }));
});

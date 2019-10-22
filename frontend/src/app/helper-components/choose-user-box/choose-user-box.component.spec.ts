import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseUserBoxComponent} from './choose-user-box.component';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
class MockPromise{
    then(callback){
        return callback({data: []})
    }
}
class MockGeneralApiGateway {
    select(tableName, felder, filter, joins){
        return new MockPromise();
    }
}

xdescribe('ChooseUserBoxComponent', () => {
    let component: ChooseUserBoxComponent;
    let generalApiGateway;
    let configureService;
    beforeEach(async(() => {
        generalApiGateway = new MockGeneralApiGateway();
        configureService = new ConfigureService();
        component = new ChooseUserBoxComponent(generalApiGateway, configureService);
    }));

    beforeEach(() => {
    });

    xit('should be created', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupComponent } from './create-group.component';
import {ChooseUserBoxComponent} from '../../helper-components/choose-user-box/choose-user-box.component';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {ConfigureService} from '../../services/configure.service';
class MockGeneralApiGateway{

}
xdescribe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupComponent, ChooseUserBoxComponent],
        providers: [{provide: GeneralApiGateway, useClass: MockGeneralApiGateway}, ConfigureService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});

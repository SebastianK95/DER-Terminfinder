import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolsAnzeigenComponent } from './pools-anzeigen.component';
import {LoadingBarComponent} from '../../helper-components/loading-bar/loading-bar.component';
import {GeneralApiGateway} from '../../services/gateways/general-api-gateway.service';
import {Router} from '@angular/router';
import {ConfigureService} from '../../services/configure.service';
class MockGeneralApiGateway{
  select(tableName, felder, filter){}
}
class MockRouter{}
xdescribe('PoolsAnzeigenComponent', () => {
  let component: PoolsAnzeigenComponent;
  let fixture: ComponentFixture<PoolsAnzeigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolsAnzeigenComponent, LoadingBarComponent ],
        providers: [{provide: GeneralApiGateway, useClass: MockGeneralApiGateway}, {provide: Router, useClass: MockRouter}, ConfigureService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolsAnzeigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelGroupFromFinderComponent } from './del-group-from-finder.component';

xdescribe('DelGroupFromFinderComponent', () => {
  let component: DelGroupFromFinderComponent;
  let fixture: ComponentFixture<DelGroupFromFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelGroupFromFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelGroupFromFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToGroupComponent } from './add-user-to-group.component';

xdescribe('AddUserToGroupComponent', () => {
  let component: AddUserToGroupComponent;
  let fixture: ComponentFixture<AddUserToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});

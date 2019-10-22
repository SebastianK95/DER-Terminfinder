import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupToFinderComponent } from './add-group-to-finder.component';

xdescribe('AddGroupToFinderComponent', () => {
  let component: AddGroupToFinderComponent;
  let fixture: ComponentFixture<AddGroupToFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupToFinderComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupToFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});

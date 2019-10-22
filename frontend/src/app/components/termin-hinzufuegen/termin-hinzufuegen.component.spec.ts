import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminHinzufuegenComponent } from './termin-hinzufuegen.component';
import {MessageBoxComponent} from "../message-box/message-box.component";
import {FormsModule} from "@angular/forms";
import {AngularDateTimePickerModule} from "angular2-datetimepicker";
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';
import * as $ from 'jquery'

xdescribe('TerminHinzufuegenComponent', () => {
  let component: TerminHinzufuegenComponent;
  let fixture: ComponentFixture<TerminHinzufuegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminHinzufuegenComponent, MessageBoxComponent],
      imports: [FormsModule, AngularDateTimePickerModule, NKDatetimeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminHinzufuegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});

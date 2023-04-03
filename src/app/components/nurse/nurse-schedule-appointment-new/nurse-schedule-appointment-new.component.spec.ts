import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseScheduleAppointmentNewComponent } from './nurse-schedule-appointment-new.component';

describe('NurseScheduleAppointmentNewComponent', () => {
  let component: NurseScheduleAppointmentNewComponent;
  let fixture: ComponentFixture<NurseScheduleAppointmentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseScheduleAppointmentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseScheduleAppointmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseScheduleAppointmentComponent } from './nurse-schedule-appointment.component';

describe('NurseScheduleAppointmentComponent', () => {
  let component: NurseScheduleAppointmentComponent;
  let fixture: ComponentFixture<NurseScheduleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseScheduleAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseScheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistScheduleAppointmentComponent } from './receptionist-schedule-appointment.component';

describe('ReceptionistScheduleAppointmentComponent', () => {
  let component: ReceptionistScheduleAppointmentComponent;
  let fixture: ComponentFixture<ReceptionistScheduleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistScheduleAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistScheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

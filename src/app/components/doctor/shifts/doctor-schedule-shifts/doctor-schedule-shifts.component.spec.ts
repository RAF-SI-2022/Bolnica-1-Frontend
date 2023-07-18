import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleShiftsComponent } from './doctor-schedule-shifts.component';

describe('DoctorScheduleShiftsComponent', () => {
  let component: DoctorScheduleShiftsComponent;
  let fixture: ComponentFixture<DoctorScheduleShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduleShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

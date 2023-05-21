import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleExamComponent } from './doctor-schedule-exam.component';

describe('DoctorScheduleExamComponent', () => {
  let component: DoctorScheduleExamComponent;
  let fixture: ComponentFixture<DoctorScheduleExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorScheduleExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

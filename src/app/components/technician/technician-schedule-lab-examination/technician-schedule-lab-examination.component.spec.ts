import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianScheduleLabExaminationComponent } from './technician-schedule-lab-examination.component';

describe('TechnicianScheduleLabExaminationComponent', () => {
  let component: TechnicianScheduleLabExaminationComponent;
  let fixture: ComponentFixture<TechnicianScheduleLabExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianScheduleLabExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianScheduleLabExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

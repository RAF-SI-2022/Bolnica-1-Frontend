import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidScheduleAdmissionComponent } from './nurse-covid-schedule-admission.component';

describe('NurseCovidScheduleAdmissionComponent', () => {
  let component: NurseCovidScheduleAdmissionComponent;
  let fixture: ComponentFixture<NurseCovidScheduleAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidScheduleAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidScheduleAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryScheduleAdmissionComponent } from './nurse-infirmary-schedule-admission.component';

describe('NurseInfirmaryScheduleAdmissionComponent', () => {
  let component: NurseInfirmaryScheduleAdmissionComponent;
  let fixture: ComponentFixture<NurseInfirmaryScheduleAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryScheduleAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryScheduleAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

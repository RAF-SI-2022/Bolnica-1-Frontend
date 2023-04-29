import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryPatientAdmissionComponent } from './nurse-infirmary-patient-admission.component';

describe('NurseInfirmaryPatientAdmissionComponent', () => {
  let component: NurseInfirmaryPatientAdmissionComponent;
  let fixture: ComponentFixture<NurseInfirmaryPatientAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryPatientAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryPatientAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

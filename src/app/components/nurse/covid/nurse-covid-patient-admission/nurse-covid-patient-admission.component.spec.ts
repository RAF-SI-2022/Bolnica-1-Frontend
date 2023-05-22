import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidPatientAdmissionComponent } from './nurse-covid-patient-admission.component';

describe('NurseCovidPatientAdmissionComponent', () => {
  let component: NurseCovidPatientAdmissionComponent;
  let fixture: ComponentFixture<NurseCovidPatientAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidPatientAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidPatientAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

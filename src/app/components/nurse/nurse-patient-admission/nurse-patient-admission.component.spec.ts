import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePatientAdmissionComponent } from './nurse-patient-admission.component';

describe('NursePatientAdmissionComponent', () => {
  let component: NursePatientAdmissionComponent;
  let fixture: ComponentFixture<NursePatientAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursePatientAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursePatientAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

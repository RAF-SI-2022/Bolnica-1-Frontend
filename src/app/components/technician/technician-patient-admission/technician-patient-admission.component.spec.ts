import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianPatientAdmissionComponent } from './technician-patient-admission.component';

describe('TechnicianPatientAdmissionComponent', () => {
  let component: TechnicianPatientAdmissionComponent;
  let fixture: ComponentFixture<TechnicianPatientAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianPatientAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianPatientAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

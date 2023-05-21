import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWorkspaceOnePatientComponent } from './doctor-workspace-one-patient.component';

describe('DoctorWorkspaceOnePatientComponent', () => {
  let component: DoctorWorkspaceOnePatientComponent;
  let fixture: ComponentFixture<DoctorWorkspaceOnePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorWorkspaceOnePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorWorkspaceOnePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

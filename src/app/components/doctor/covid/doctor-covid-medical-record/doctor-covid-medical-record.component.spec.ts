import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidMedicalRecordComponent } from './doctor-covid-medical-record.component';

describe('DoctorCovidMedicalRecordComponent', () => {
  let component: DoctorCovidMedicalRecordComponent;
  let fixture: ComponentFixture<DoctorCovidMedicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidMedicalRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

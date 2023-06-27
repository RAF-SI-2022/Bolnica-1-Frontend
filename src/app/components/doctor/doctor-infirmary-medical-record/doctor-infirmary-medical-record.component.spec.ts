import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfirmaryMedicalRecordComponent } from './doctor-infirmary-medical-record.component';

describe('DoctorInfirmaryMedicalRecordComponent', () => {
  let component: DoctorInfirmaryMedicalRecordComponent;
  let fixture: ComponentFixture<DoctorInfirmaryMedicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfirmaryMedicalRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorInfirmaryMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfirmaryMedicalChartComponent } from './doctor-infirmary-medical-chart.component';

describe('DoctorInfirmaryMedicalChartComponent', () => {
  let component: DoctorInfirmaryMedicalChartComponent;
  let fixture: ComponentFixture<DoctorInfirmaryMedicalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfirmaryMedicalChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorInfirmaryMedicalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidMedicalChartComponent } from './doctor-covid-medical-chart.component';

describe('DoctorCovidMedicalChartComponent', () => {
  let component: DoctorCovidMedicalChartComponent;
  let fixture: ComponentFixture<DoctorCovidMedicalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidMedicalChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidMedicalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

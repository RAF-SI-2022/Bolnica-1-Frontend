import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalChartComponent } from './doctor-medical-chart.component';

describe('DoctorMedicalChartComponent', () => {
  let component: DoctorMedicalChartComponent;
  let fixture: ComponentFixture<DoctorMedicalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMedicalChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

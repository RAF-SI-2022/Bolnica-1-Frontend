import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsCovidComponent } from './doctor-patients-covid.component';

describe('DoctorPatientsCovidComponent', () => {
  let component: DoctorPatientsCovidComponent;
  let fixture: ComponentFixture<DoctorPatientsCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPatientsCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPatientsCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsInfirmaryComponent } from './doctor-patients-infirmary.component';

describe('DoctorPatientsInfirmaryComponent', () => {
  let component: DoctorPatientsInfirmaryComponent;
  let fixture: ComponentFixture<DoctorPatientsInfirmaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorPatientsInfirmaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPatientsInfirmaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidDischargeListComponent } from './doctor-covid-discharge-list.component';

describe('DoctorCovidDischargeListComponent', () => {
  let component: DoctorCovidDischargeListComponent;
  let fixture: ComponentFixture<DoctorCovidDischargeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidDischargeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidDischargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

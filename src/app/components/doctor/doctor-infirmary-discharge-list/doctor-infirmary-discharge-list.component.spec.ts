import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfirmaryDischargeListComponent } from './doctor-infirmary-discharge-list.component';

describe('DoctorInfirmaryDischargeListComponent', () => {
  let component: DoctorInfirmaryDischargeListComponent;
  let fixture: ComponentFixture<DoctorInfirmaryDischargeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfirmaryDischargeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorInfirmaryDischargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

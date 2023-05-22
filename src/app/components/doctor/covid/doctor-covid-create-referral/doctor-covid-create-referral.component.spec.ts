import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidCreateReferralComponent } from './doctor-covid-create-referral.component';

describe('DoctorCovidCreateReferralComponent', () => {
  let component: DoctorCovidCreateReferralComponent;
  let fixture: ComponentFixture<DoctorCovidCreateReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidCreateReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidCreateReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

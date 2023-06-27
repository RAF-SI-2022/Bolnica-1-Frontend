import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfirmaryCreateReferralComponent } from './doctor-infirmary-create-referral.component';

describe('DoctorInfirmaryCreateReferralComponent', () => {
  let component: DoctorInfirmaryCreateReferralComponent;
  let fixture: ComponentFixture<DoctorInfirmaryCreateReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfirmaryCreateReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorInfirmaryCreateReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

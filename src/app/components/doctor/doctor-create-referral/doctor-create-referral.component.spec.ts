import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCreateReferralComponent } from './doctor-create-referral.component';

describe('DoctorCreateReferralComponent', () => {
  let component: DoctorCreateReferralComponent;
  let fixture: ComponentFixture<DoctorCreateReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCreateReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCreateReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

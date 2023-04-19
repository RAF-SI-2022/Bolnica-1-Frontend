import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCreateReferralNewComponent } from './doctor-create-referral-new.component';

describe('DoctorCreateReferralNewComponent', () => {
  let component: DoctorCreateReferralNewComponent;
  let fixture: ComponentFixture<DoctorCreateReferralNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCreateReferralNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCreateReferralNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

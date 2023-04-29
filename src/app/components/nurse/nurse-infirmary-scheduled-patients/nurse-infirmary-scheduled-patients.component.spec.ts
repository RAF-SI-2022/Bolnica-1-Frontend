import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryScheduledPatientsComponent } from './nurse-infirmary-scheduled-patients.component';

describe('NurseInfirmaryScheduledPatientsComponent', () => {
  let component: NurseInfirmaryScheduledPatientsComponent;
  let fixture: ComponentFixture<NurseInfirmaryScheduledPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryScheduledPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryScheduledPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

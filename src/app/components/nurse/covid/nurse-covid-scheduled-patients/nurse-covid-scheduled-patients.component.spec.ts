import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidScheduledPatientsComponent } from './nurse-covid-scheduled-patients.component';

describe('NurseCovidScheduledPatientsComponent', () => {
  let component: NurseCovidScheduledPatientsComponent;
  let fixture: ComponentFixture<NurseCovidScheduledPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidScheduledPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidScheduledPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

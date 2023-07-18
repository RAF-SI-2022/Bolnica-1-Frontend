import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseScheduleVaccinationComponent } from './nurse-schedule-vaccination.component';

describe('NurseScheduleVaccinationComponent', () => {
  let component: NurseScheduleVaccinationComponent;
  let fixture: ComponentFixture<NurseScheduleVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseScheduleVaccinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseScheduleVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

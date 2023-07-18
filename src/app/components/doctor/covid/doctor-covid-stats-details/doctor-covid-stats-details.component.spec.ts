import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidStatsDetailsComponent } from './doctor-covid-stats-details.component';

describe('DoctorCovidStatsDetailsComponent', () => {
  let component: DoctorCovidStatsDetailsComponent;
  let fixture: ComponentFixture<DoctorCovidStatsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidStatsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidStatsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

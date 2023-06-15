import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidStatisticsComponent } from './doctor-covid-statistics.component';

describe('DoctorCovidStatisticsComponent', () => {
  let component: DoctorCovidStatisticsComponent;
  let fixture: ComponentFixture<DoctorCovidStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

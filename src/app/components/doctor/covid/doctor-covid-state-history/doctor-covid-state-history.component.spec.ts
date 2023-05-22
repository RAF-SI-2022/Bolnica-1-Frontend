import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidStateHistoryComponent } from './doctor-covid-state-history.component';

describe('DoctorCovidStateHistoryComponent', () => {
  let component: DoctorCovidStateHistoryComponent;
  let fixture: ComponentFixture<DoctorCovidStateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidStateHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidStateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

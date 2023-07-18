import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseDailyVaccinationComponent } from './nurse-daily-vaccination.component';

describe('NurseDailyVaccinationComponent', () => {
  let component: NurseDailyVaccinationComponent;
  let fixture: ComponentFixture<NurseDailyVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseDailyVaccinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseDailyVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

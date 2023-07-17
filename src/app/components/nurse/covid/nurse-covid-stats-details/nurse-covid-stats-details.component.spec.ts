import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidStatsDetailsComponent } from './nurse-covid-stats-details.component';

describe('NurseCovidStatsDetailsComponent', () => {
  let component: NurseCovidStatsDetailsComponent;
  let fixture: ComponentFixture<NurseCovidStatsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidStatsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidStatsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

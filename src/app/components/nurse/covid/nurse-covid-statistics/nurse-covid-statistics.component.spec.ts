import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidStatisticsComponent } from './nurse-covid-statistics.component';

describe('NurseCovidStatisticsComponent', () => {
  let component: NurseCovidStatisticsComponent;
  let fixture: ComponentFixture<NurseCovidStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

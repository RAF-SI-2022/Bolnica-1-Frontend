import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidStateHistoryComponent } from './nurse-covid-state-history.component';

describe('NurseCovidStateHistoryComponent', () => {
  let component: NurseCovidStateHistoryComponent;
  let fixture: ComponentFixture<NurseCovidStateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidStateHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidStateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

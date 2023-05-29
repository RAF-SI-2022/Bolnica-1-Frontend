import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidAmbulanceComponent } from './nurse-covid-ambulance.component';

describe('NurseCovidAmbulanceComponent', () => {
  let component: NurseCovidAmbulanceComponent;
  let fixture: ComponentFixture<NurseCovidAmbulanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidAmbulanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

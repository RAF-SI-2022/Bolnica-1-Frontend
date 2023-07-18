import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseVaccineCovidComponent } from './nurse-vaccine-covid.component';

describe('NurseVaccineCovidComponent', () => {
  let component: NurseVaccineCovidComponent;
  let fixture: ComponentFixture<NurseVaccineCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseVaccineCovidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseVaccineCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

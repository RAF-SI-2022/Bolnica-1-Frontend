import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistAddPatientComponent } from './receptionist-add-patient.component';

describe('ReceptionistAddPatientComponent', () => {
  let component: ReceptionistAddPatientComponent;
  let fixture: ComponentFixture<ReceptionistAddPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistAddPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistAddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

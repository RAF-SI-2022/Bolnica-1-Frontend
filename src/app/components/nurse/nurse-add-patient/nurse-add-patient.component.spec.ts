import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseAddPatientComponent } from './nurse-add-patient.component';

describe('NurseAddPatientComponent', () => {
  let component: NurseAddPatientComponent;
  let fixture: ComponentFixture<NurseAddPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseAddPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseAddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

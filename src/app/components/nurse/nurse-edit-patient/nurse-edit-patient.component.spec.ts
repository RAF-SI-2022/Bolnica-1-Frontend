import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseEditPatientComponent } from './nurse-edit-patient.component';

describe('NurseEditPatientComponent', () => {
  let component: NurseEditPatientComponent;
  let fixture: ComponentFixture<NurseEditPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseEditPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseEditPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

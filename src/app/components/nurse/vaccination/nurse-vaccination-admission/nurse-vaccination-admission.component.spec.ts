import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseVaccinationAdmissionComponent } from './nurse-vaccination-admission.component';

describe('NurseVaccinationAdmissionComponent', () => {
  let component: NurseVaccinationAdmissionComponent;
  let fixture: ComponentFixture<NurseVaccinationAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseVaccinationAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseVaccinationAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

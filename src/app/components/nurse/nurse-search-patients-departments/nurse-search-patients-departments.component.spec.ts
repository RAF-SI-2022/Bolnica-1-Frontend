import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSearchPatientsDepartmentsComponent } from './nurse-search-patients-departments.component';

describe('NurseSearchPatientsDepartmentsComponent', () => {
  let component: NurseSearchPatientsDepartmentsComponent;
  let fixture: ComponentFixture<NurseSearchPatientsDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseSearchPatientsDepartmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseSearchPatientsDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

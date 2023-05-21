import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchPatientsComponent } from './doctor-search-patients.component';

describe('DoctorSearchPatientsComponent', () => {
  let component: DoctorSearchPatientsComponent;
  let fixture: ComponentFixture<DoctorSearchPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSearchPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSearchPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

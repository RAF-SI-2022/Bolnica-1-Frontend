import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidExamComponent } from './doctor-covid-exam.component';

describe('DoctorCovidExamComponent', () => {
  let component: DoctorCovidExamComponent;
  let fixture: ComponentFixture<DoctorCovidExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

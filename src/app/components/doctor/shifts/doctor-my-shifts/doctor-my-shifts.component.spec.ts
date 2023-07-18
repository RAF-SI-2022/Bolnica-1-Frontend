import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMyShiftsComponent } from './doctor-my-shifts.component';

describe('DoctorMyShiftsComponent', () => {
  let component: DoctorMyShiftsComponent;
  let fixture: ComponentFixture<DoctorMyShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMyShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianMyShiftsComponent } from './technician-my-shifts.component';

describe('TechnicianMyShiftsComponent', () => {
  let component: TechnicianMyShiftsComponent;
  let fixture: ComponentFixture<TechnicianMyShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianMyShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianMyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

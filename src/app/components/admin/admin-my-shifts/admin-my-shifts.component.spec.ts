import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMyShiftsComponent } from './admin-my-shifts.component';

describe('AdminMyShiftsComponent', () => {
  let component: AdminMyShiftsComponent;
  let fixture: ComponentFixture<AdminMyShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMyShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

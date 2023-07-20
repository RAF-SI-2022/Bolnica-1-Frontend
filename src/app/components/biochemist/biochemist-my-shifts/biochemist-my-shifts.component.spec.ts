import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistMyShiftsComponent } from './biochemist-my-shifts.component';

describe('BiochemistMyShiftsComponent', () => {
  let component: BiochemistMyShiftsComponent;
  let fixture: ComponentFixture<BiochemistMyShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiochemistMyShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochemistMyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

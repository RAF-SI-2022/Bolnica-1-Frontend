import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseMyShiftComponent } from './nurse-my-shift.component';

describe('NurseMyShiftComponent', () => {
  let component: NurseMyShiftComponent;
  let fixture: ComponentFixture<NurseMyShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseMyShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseMyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

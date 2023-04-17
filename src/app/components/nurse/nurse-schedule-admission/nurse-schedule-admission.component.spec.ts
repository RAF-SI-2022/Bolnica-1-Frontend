import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseScheduleAdmissionComponent } from './nurse-schedule-admission.component';

describe('NurseScheduleAdmissionComponent', () => {
  let component: NurseScheduleAdmissionComponent;
  let fixture: ComponentFixture<NurseScheduleAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseScheduleAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseScheduleAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

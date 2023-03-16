import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianScheduleVisitComponent } from './technician-schedule-visit.component';

describe('TechnicianScheduleVisitComponent', () => {
  let component: TechnicianScheduleVisitComponent;
  let fixture: ComponentFixture<TechnicianScheduleVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianScheduleVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianScheduleVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

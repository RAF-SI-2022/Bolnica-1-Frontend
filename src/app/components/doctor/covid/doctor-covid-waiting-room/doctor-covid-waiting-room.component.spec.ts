import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidWaitingRoomComponent } from './doctor-covid-waiting-room.component';

describe('DoctorCovidWaitingRoomComponent', () => {
  let component: DoctorCovidWaitingRoomComponent;
  let fixture: ComponentFixture<DoctorCovidWaitingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidWaitingRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidWaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

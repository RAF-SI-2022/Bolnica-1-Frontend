import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfirmaryStateHistoryComponent } from './doctor-infirmary-state-history.component';

describe('DoctorInfirmaryStateHistoryComponent', () => {
  let component: DoctorInfirmaryStateHistoryComponent;
  let fixture: ComponentFixture<DoctorInfirmaryStateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfirmaryStateHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorInfirmaryStateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

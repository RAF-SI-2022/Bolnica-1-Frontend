import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistVisitsComponent } from './receptionist-visits.component';

describe('ReceptionistVisitsComponent', () => {
  let component: ReceptionistVisitsComponent;
  let fixture: ComponentFixture<ReceptionistVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistVisitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

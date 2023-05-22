import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidWorkspaceComponent } from './doctor-covid-workspace.component';

describe('DoctorCovidWorkspaceComponent', () => {
  let component: DoctorCovidWorkspaceComponent;
  let fixture: ComponentFixture<DoctorCovidWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCovidWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

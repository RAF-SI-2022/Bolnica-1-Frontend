import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfirmaryWorkspaceComponent } from './doctor-infirmary-workspace.component';

describe('DoctorInfirmaryWorkspaceComponent', () => {
  let component: DoctorInfirmaryWorkspaceComponent;
  let fixture: ComponentFixture<DoctorInfirmaryWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfirmaryWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorInfirmaryWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

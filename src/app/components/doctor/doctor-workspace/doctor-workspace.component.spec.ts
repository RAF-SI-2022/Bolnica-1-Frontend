import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWorkspaceComponent } from './doctor-workspace.component';

describe('DoctorWorkspaceComponent', () => {
  let component: DoctorWorkspaceComponent;
  let fixture: ComponentFixture<DoctorWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

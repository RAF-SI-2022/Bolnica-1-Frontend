import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianWorkspaceComponent } from './technician-workspace.component';

describe('TechnicianWorkspaceComponent', () => {
  let component: TechnicianWorkspaceComponent;
  let fixture: ComponentFixture<TechnicianWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

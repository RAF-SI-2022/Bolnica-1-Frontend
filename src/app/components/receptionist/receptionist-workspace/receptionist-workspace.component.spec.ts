import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistWorkspaceComponent } from './receptionist-workspace.component';

describe('ReceptionistWorkspaceComponent', () => {
  let component: ReceptionistWorkspaceComponent;
  let fixture: ComponentFixture<ReceptionistWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

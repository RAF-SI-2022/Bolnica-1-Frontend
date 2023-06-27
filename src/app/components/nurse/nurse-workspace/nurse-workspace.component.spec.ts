import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseWorkspaceComponent } from './nurse-workspace.component';

describe('NurseWorkspaceComponent', () => {
  let component: NurseWorkspaceComponent;
  let fixture: ComponentFixture<NurseWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

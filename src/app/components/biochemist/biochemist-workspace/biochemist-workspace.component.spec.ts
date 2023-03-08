import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistWorkspaceComponent } from './biochemist-workspace.component';

describe('BiochemistWorkspaceComponent', () => {
  let component: BiochemistWorkspaceComponent;
  let fixture: ComponentFixture<BiochemistWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiochemistWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochemistWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

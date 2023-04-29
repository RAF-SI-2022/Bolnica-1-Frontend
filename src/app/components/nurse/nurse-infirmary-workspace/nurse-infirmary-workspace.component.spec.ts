import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryWorkspaceComponent } from './nurse-infirmary-workspace.component';

describe('NurseInfirmaryWorkspaceComponent', () => {
  let component: NurseInfirmaryWorkspaceComponent;
  let fixture: ComponentFixture<NurseInfirmaryWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

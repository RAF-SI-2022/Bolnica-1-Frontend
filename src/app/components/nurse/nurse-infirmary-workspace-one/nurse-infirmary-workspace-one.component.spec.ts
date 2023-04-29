import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryWorkspaceOneComponent } from './nurse-infirmary-workspace-one.component';

describe('NurseInfirmaryWorkspaceOneComponent', () => {
  let component: NurseInfirmaryWorkspaceOneComponent;
  let fixture: ComponentFixture<NurseInfirmaryWorkspaceOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryWorkspaceOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryWorkspaceOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

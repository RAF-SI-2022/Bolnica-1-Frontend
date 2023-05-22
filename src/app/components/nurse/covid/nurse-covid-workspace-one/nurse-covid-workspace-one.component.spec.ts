import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidWorkspaceOneComponent } from './nurse-covid-workspace-one.component';

describe('NurseCovidWorkspaceOneComponent', () => {
  let component: NurseCovidWorkspaceOneComponent;
  let fixture: ComponentFixture<NurseCovidWorkspaceOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidWorkspaceOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidWorkspaceOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

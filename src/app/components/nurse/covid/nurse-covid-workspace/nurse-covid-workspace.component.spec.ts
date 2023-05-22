import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidWorkspaceComponent } from './nurse-covid-workspace.component';

describe('NurseCovidWorkspaceComponent', () => {
  let component: NurseCovidWorkspaceComponent;
  let fixture: ComponentFixture<NurseCovidWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

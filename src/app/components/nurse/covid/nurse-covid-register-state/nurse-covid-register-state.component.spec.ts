import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidRegisterStateComponent } from './nurse-covid-register-state.component';

describe('NurseCovidRegisterStateComponent', () => {
  let component: NurseCovidRegisterStateComponent;
  let fixture: ComponentFixture<NurseCovidRegisterStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidRegisterStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidRegisterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

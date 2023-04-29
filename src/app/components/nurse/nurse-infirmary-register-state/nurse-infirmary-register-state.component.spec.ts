import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryRegisterStateComponent } from './nurse-infirmary-register-state.component';

describe('NurseInfirmaryRegisterStateComponent', () => {
  let component: NurseInfirmaryRegisterStateComponent;
  let fixture: ComponentFixture<NurseInfirmaryRegisterStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryRegisterStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryRegisterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

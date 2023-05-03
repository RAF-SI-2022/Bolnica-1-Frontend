import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryRegisterVisitComponent } from './nurse-infirmary-register-visit.component';

describe('NurseInfirmaryRegisterVisitComponent', () => {
  let component: NurseInfirmaryRegisterVisitComponent;
  let fixture: ComponentFixture<NurseInfirmaryRegisterVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryRegisterVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryRegisterVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

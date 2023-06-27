import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistRegisterVisitComponent } from './receptionist-register-visit.component';

describe('ReceptionistRegisterVisitComponent', () => {
  let component: ReceptionistRegisterVisitComponent;
  let fixture: ComponentFixture<ReceptionistRegisterVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistRegisterVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistRegisterVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

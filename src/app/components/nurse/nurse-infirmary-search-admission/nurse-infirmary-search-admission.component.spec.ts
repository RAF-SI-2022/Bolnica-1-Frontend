import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmarySearchAdmissionComponent } from './nurse-infirmary-search-admission.component';

describe('NurseInfirmarySearchAdmissionComponent', () => {
  let component: NurseInfirmarySearchAdmissionComponent;
  let fixture: ComponentFixture<NurseInfirmarySearchAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmarySearchAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmarySearchAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

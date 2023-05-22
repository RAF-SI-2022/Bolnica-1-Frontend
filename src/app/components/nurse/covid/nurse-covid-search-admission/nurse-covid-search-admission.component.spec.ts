import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidSearchAdmissionComponent } from './nurse-covid-search-admission.component';

describe('NurseCovidSearchAdmissionComponent', () => {
  let component: NurseCovidSearchAdmissionComponent;
  let fixture: ComponentFixture<NurseCovidSearchAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidSearchAdmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidSearchAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

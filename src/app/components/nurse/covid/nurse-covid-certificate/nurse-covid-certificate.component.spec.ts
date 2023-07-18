import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseCovidCertificateComponent } from './nurse-covid-certificate.component';

describe('NurseCovidCertificateComponent', () => {
  let component: NurseCovidCertificateComponent;
  let fixture: ComponentFixture<NurseCovidCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseCovidCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseCovidCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

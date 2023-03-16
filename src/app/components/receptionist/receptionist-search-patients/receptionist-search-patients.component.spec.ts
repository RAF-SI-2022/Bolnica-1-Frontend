import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistSearchPatientsComponent } from './receptionist-search-patients.component';

describe('ReceptionistSearchPatientsComponent', () => {
  let component: ReceptionistSearchPatientsComponent;
  let fixture: ComponentFixture<ReceptionistSearchPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionistSearchPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistSearchPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

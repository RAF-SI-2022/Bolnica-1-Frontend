import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseVaccineRegularComponent } from './nurse-vaccine-regular.component';

describe('NurseVaccineRegularComponent', () => {
  let component: NurseVaccineRegularComponent;
  let fixture: ComponentFixture<NurseVaccineRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseVaccineRegularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseVaccineRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSearchPatientsComponent } from './nurse-search-patients.component';

describe('NurseSearchPatientsComponent', () => {
  let component: NurseSearchPatientsComponent;
  let fixture: ComponentFixture<NurseSearchPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseSearchPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseSearchPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});

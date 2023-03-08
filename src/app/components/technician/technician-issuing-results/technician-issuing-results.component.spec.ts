import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianIssuingResultsComponent } from './technician-issuing-results.component';

describe('TechnicianIssuingResultsComponent', () => {
  let component: TechnicianIssuingResultsComponent;
  let fixture: ComponentFixture<TechnicianIssuingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianIssuingResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianIssuingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

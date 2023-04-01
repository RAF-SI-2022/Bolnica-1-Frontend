import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianIssuingResultsDetailsComponent } from './technician-issuing-results-details.component';

describe('TechnicianIssuingResultsDetailsComponent', () => {
  let component: TechnicianIssuingResultsDetailsComponent;
  let fixture: ComponentFixture<TechnicianIssuingResultsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianIssuingResultsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianIssuingResultsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

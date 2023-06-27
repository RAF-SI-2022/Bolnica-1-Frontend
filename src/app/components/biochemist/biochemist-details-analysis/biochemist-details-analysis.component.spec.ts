import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistDetailsAnalysisComponent } from './biochemist-details-analysis.component';

describe('BiochemistDetailsAnalysisComponent', () => {
  let component: BiochemistDetailsAnalysisComponent;
  let fixture: ComponentFixture<BiochemistDetailsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiochemistDetailsAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochemistDetailsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

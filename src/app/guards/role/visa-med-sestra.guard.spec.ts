import { TestBed } from '@angular/core/testing';

import { VisaMedSestraGuard } from './visa-med-sestra.guard';

describe('VisaMedSestraGuard', () => {
  let guard: VisaMedSestraGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VisaMedSestraGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MedSestraGuard } from './med-sestra.guard';

describe('MedSestraGuard', () => {
  let guard: MedSestraGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedSestraGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

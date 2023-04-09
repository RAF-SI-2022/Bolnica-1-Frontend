import { TestBed } from '@angular/core/testing';

import { BiochemistGuard } from './biochemist.guard';

describe('BiochemistGuard', () => {
  let guard: BiochemistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BiochemistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CovidGuard } from './covid.guard';

describe('CovidGuard', () => {
  let guard: CovidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CovidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

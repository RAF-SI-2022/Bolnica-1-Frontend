import { TestBed } from '@angular/core/testing';

import { SpecMedBiohemijeGuard } from './spec-med-biohemije.guard';

describe('SpecMedBiohemijeGuard', () => {
  let guard: SpecMedBiohemijeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpecMedBiohemijeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

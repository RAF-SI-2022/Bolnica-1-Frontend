import { TestBed } from '@angular/core/testing';

import { DoctorSpecPovGuard } from './doctor-spec-pov.guard';

describe('DoctorSpecPovGuard', () => {
  let guard: DoctorSpecPovGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorSpecPovGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

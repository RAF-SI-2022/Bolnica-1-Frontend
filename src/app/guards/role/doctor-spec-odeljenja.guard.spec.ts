import { TestBed } from '@angular/core/testing';

import { DoctorSpecOdeljenjaGuard } from './doctor-spec-odeljenja.guard';

describe('DoctorSpecOdeljenjaGuard', () => {
  let guard: DoctorSpecOdeljenjaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorSpecOdeljenjaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

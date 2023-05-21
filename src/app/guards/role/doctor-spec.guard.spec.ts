import { TestBed } from '@angular/core/testing';

import { DoctorSpecGuard } from './doctor-spec.guard';

describe('DoctorSpecGuard', () => {
  let guard: DoctorSpecGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorSpecGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

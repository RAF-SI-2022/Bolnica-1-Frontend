import { TestBed } from '@angular/core/testing';

import { TechnicianGuard } from './technician.guard';

describe('TechnicianGuard', () => {
  let guard: TechnicianGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TechnicianGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

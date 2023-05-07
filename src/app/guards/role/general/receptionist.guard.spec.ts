import { TestBed } from '@angular/core/testing';

import { ReceptionistGuard } from './receptionist.guard';

describe('ReceptionistGuard', () => {
  let guard: ReceptionistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReceptionistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

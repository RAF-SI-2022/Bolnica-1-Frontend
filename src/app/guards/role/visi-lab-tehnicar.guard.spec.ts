import { TestBed } from '@angular/core/testing';

import { VisiLabTehnicarGuard } from './visi-lab-tehnicar.guard';

describe('VisiLabTehnicarGuard', () => {
  let guard: VisiLabTehnicarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VisiLabTehnicarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LabTehnicarGuard } from './lab-tehnicar.guard';

describe('LabTehnicarGuard', () => {
  let guard: LabTehnicarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LabTehnicarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

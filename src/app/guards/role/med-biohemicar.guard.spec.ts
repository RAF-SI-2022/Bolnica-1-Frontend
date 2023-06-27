import { TestBed } from '@angular/core/testing';

import { MedBiohemicarGuard } from './med-biohemicar.guard';

describe('MedBiohemicarGuard', () => {
  let guard: MedBiohemicarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedBiohemicarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BiochemistService } from './biochemist.service';

describe('BiochemistService', () => {
  let service: BiochemistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiochemistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

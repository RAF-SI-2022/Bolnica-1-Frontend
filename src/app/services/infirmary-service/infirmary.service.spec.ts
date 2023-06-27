import { TestBed } from '@angular/core/testing';

import { InfirmaryService } from './infirmary.service';

describe('InfirmaryService', () => {
  let service: InfirmaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfirmaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

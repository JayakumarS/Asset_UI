import { TestBed } from '@angular/core/testing';

import { LoanOtherdebitsService } from './loan-otherdebits.service';

describe('LoanOtherdebitsService', () => {
  let service: LoanOtherdebitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanOtherdebitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

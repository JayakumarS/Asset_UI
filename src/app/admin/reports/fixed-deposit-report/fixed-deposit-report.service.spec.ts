import { TestBed } from '@angular/core/testing';

import { FixedDepositReportService } from './fixed-deposit-report.service';

describe('FixedDepositReportService', () => {
  let service: FixedDepositReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedDepositReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoanReportService } from './loan-report.service';

describe('LoanReportService', () => {
  let service: LoanReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

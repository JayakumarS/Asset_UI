import { TestBed } from '@angular/core/testing';

import { MutualfundReportService } from './mutualfund-report.service';

describe('MutualfundReportService', () => {
  let service: MutualfundReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualfundReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

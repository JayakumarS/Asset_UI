import { TestBed } from '@angular/core/testing';

import { UtilityReportService } from './utility-report.service';

describe('UtilityReportService', () => {
  let service: UtilityReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

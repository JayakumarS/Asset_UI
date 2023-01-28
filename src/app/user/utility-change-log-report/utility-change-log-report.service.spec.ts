import { TestBed } from '@angular/core/testing';

import { UtilityChangeLogReportService } from './utility-change-log-report.service';

describe('UtilityChangeLogReportService', () => {
  let service: UtilityChangeLogReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityChangeLogReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

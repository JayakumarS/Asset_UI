import { TestBed } from '@angular/core/testing';

import { IndividualAssetReportService } from './individual-asset-report.service';

describe('IndividualAssetReportService', () => {
  let service: IndividualAssetReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualAssetReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

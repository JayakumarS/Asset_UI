import { TestBed } from '@angular/core/testing';

import { JewelleryReportService } from './jewellery-report.service';

describe('JewelleryReportService', () => {
  let service: JewelleryReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JewelleryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PropertyReportService } from './property-report.service';

describe('PropertyReportService', () => {
  let service: PropertyReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

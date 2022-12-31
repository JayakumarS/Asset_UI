import { TestBed } from '@angular/core/testing';

import { AuditReportsServiceService } from './audit-reports-service.service';

describe('AuditReportsServiceService', () => {
  let service: AuditReportsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditReportsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

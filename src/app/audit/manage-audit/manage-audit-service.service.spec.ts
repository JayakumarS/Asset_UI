import { TestBed } from '@angular/core/testing';

import { ManageAuditServiceService } from './manage-audit-service.service';

describe('ManageAuditServiceService', () => {
  let service: ManageAuditServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageAuditServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

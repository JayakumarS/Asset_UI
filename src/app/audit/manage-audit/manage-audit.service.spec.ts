import { TestBed } from '@angular/core/testing';

import { ManageAuditService } from './manage-audit.service';

describe('ManageAuditService', () => {
  let service: ManageAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

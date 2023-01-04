import { TestBed } from '@angular/core/testing';

import { AuditableAssetService } from './auditable-asset.service';

describe('AuditableAssetService', () => {
  let service: AuditableAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditableAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

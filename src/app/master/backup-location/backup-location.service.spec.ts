import { TestBed } from '@angular/core/testing';

import { BackupLocationService } from './backup-location.service';

describe('BackupLocationService', () => {
  let service: BackupLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackupLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

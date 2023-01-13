import { TestBed } from '@angular/core/testing';

import { TransferAssetService } from './transfer-asset.service';

describe('TransferAssetService', () => {
  let service: TransferAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AssetReplacementService } from './asset-replacement.service';

describe('AssetRequisitionService', () => {
  let service: AssetReplacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetReplacementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

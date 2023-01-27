import { TestBed } from '@angular/core/testing';

import { DiscardAssetService } from './discard-asset.service';

describe('DiscardAssetService', () => {
  let service: DiscardAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscardAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

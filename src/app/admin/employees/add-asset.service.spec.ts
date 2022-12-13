import { TestBed } from '@angular/core/testing';

import { AddAssetService } from './add-asset.service';

describe('AddAssetService', () => {
  let service: AddAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

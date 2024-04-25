import { TestBed } from '@angular/core/testing';

import { UserWiseAssetCountService } from './user-wise-asset-count.service';

describe('UserWiseAssetCountService', () => {
  let service: UserWiseAssetCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWiseAssetCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

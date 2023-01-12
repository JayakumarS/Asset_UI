import { TestBed } from '@angular/core/testing';

import { AssetRequisitionService } from './asset-requisition.service';

describe('AssetRequisitionService', () => {
  let service: AssetRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

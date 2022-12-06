import { TestBed } from '@angular/core/testing';

import { ManageUomService } from './manage-uom.service';

describe('ManageUomService', () => {
  let service: ManageUomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DesignationMasterService } from './designation-master.service';

describe('DesignationMasterService', () => {
  let service: DesignationMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignationMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

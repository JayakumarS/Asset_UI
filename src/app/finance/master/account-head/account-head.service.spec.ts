import { TestBed } from '@angular/core/testing';

import { AccountHeadMasterService } from './account-head.service';

describe('AccountHeadMasterService', () => {
  let service: AccountHeadMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountHeadMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SubGroupAccountService } from './sub-group-account.service';

describe('SubGroupAccountService', () => {
  let service: SubGroupAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubGroupAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

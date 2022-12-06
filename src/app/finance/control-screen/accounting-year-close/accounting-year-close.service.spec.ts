import { TestBed } from '@angular/core/testing';

import { AccountingYearCloseService } from './accounting-year-close.service';

describe('AccountingYearCloseService', () => {
  let service: AccountingYearCloseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingYearCloseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

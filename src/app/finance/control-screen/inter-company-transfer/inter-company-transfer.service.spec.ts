import { TestBed } from '@angular/core/testing';

import { InterCompanyTransferService } from './inter-company-transfer.service';

describe('AccountingYearCloseService', () => {
  let service: InterCompanyTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterCompanyTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

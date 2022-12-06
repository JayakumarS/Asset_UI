import { TestBed } from '@angular/core/testing';

import { InterCompanyTransferApproveService } from './inter-company-transfer-approve.service';

describe('AccountingYearCloseService', () => {
  let service: InterCompanyTransferApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterCompanyTransferApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

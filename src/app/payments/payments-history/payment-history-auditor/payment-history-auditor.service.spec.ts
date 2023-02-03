import { TestBed } from '@angular/core/testing';

import { PaymentHistoryAuditorService } from './payment-history-auditor.service';

describe('PaymentHistoryAuditorService', () => {
  let service: PaymentHistoryAuditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentHistoryAuditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PaymentHistoryListService } from './payment-history-list.service';

describe('PaymentHistoryListService', () => {
  let service: PaymentHistoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentHistoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

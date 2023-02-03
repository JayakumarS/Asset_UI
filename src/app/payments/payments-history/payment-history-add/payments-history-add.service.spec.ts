import { TestBed } from '@angular/core/testing';

import { PaymentsHistoryAddService } from './payments-history-add.service';

describe('PaymentsHistoryAddService', () => {
  let service: PaymentsHistoryAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsHistoryAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

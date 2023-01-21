import { TestBed } from '@angular/core/testing';
import { PaymentsHistorySxervice } from './payments-history.service';


describe('PaymentsHistorySxervice', () => {
  let service: PaymentsHistorySxervice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsHistorySxervice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
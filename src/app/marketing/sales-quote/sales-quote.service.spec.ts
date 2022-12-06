import { TestBed } from '@angular/core/testing';

import { SalesQuoteService } from './sales-quote.service';

describe('SalesQuoteService', () => {
  let service: SalesQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

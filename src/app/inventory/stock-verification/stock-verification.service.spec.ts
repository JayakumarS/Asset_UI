import { TestBed } from '@angular/core/testing';

import { StockVerificationService } from './stock-verification.service';

describe('StockVerificationService', () => {
  let service: StockVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

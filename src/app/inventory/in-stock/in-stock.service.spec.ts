import { TestBed } from '@angular/core/testing';

import { InStockService } from './in-stock.service';

describe('InStockService', () => {
  let service: InStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

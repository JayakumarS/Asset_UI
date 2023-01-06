import { TestBed } from '@angular/core/testing';

import { InventoryReportsService } from './inventory-reports.service';

describe('InventoryReportsService', () => {
  let service: InventoryReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SalesCallEntryService } from './sales-call-entry.service';

describe('SalesCallEntryService', () => {
  let service: SalesCallEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesCallEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

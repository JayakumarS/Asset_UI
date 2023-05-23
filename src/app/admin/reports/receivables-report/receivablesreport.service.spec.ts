import { TestBed } from '@angular/core/testing';

import { ReceivablesreportService } from './receivablesreport.service';

describe('ReceivablesreportService', () => {
  let service: ReceivablesreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivablesreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

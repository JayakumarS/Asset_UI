import { TestBed } from '@angular/core/testing';

import { LoanReceivablesService } from './loan-receivables.service';

describe('LoanReceivablesService', () => {
  let service: LoanReceivablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanReceivablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

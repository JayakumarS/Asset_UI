import { TestBed } from '@angular/core/testing';

import { MutualFundService } from './mutualfund.service';

describe('Mutualfund.TsService', () => {
  let service: MutualFundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualFundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

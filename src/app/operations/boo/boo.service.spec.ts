import { TestBed } from '@angular/core/testing';

import { BooService } from './boo.service';

describe('BooService', () => {
  let service: BooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

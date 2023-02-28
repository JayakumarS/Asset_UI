import { TestBed } from '@angular/core/testing';

import { LineMasterService } from './line-master.service';

describe('LineMasterService', () => {
  let service: LineMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoaddataService } from './loaddata.service';

describe('LoaddataService', () => {
  let service: LoaddataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaddataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

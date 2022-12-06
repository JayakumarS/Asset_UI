import { TestBed } from '@angular/core/testing';

import { GroupHeadService } from './group-head.service';

describe('GroupHeadService', () => {
  let service: GroupHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

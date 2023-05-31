import { TestBed } from '@angular/core/testing';

import { SchedulelistService } from './schedulelist.service';

describe('SchedulelistService', () => {
  let service: SchedulelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

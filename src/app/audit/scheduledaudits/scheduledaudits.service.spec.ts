import { TestBed } from '@angular/core/testing';

import { ScheduledauditsService } from './scheduledaudits.service';

describe('ScheduledauditsService', () => {
  let service: ScheduledauditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledauditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

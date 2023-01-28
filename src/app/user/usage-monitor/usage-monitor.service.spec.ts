import { TestBed } from '@angular/core/testing';

import { UsageMonitorService } from './usage-monitor.service';

describe('UsageMonitorService', () => {
  let service: UsageMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

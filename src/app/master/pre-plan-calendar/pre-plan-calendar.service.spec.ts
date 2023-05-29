import { TestBed } from '@angular/core/testing';

import { PrePlanCalendarService } from './pre-plan-calendar.service';

describe('PrePlanCalendarService', () => {
  let service: PrePlanCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrePlanCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

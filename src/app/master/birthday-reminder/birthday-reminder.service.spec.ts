import { TestBed } from '@angular/core/testing';

import { BirthdayReminderService } from './birthday-reminder.service';

describe('BirthdayReminderService', () => {
  let service: BirthdayReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

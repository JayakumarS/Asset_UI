import { TestBed } from '@angular/core/testing';

import { ExpensesNoteService } from './expenses-note.service';

describe('ExpensesNoteService', () => {
  let service: ExpensesNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

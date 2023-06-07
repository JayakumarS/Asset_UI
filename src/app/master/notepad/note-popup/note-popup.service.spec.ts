import { TestBed } from '@angular/core/testing';

import { NotePopupService } from './note-popup.service';

describe('NotePopupService', () => {
  let service: NotePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

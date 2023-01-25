import { TestBed } from '@angular/core/testing';

import { RoleRightsService } from './role-rights.service';

describe('RoleRightsService', () => {
  let service: RoleRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

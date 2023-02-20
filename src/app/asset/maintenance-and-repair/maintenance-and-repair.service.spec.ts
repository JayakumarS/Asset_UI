import { TestBed } from '@angular/core/testing';

import { MaintenanceAndRepairService } from './maintenance-and-repair.service';

describe('MaintenanceAndRepairService', () => {
  let service: MaintenanceAndRepairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceAndRepairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

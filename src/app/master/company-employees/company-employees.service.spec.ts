import { TestBed } from '@angular/core/testing';
import { CompanyEmployeeService } from './company-employees.service';



describe('CompanyEmployeeService', () => {
  let service: CompanyEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
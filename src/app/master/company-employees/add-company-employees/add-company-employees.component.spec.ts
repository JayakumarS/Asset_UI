import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyEmployeesComponent } from './add-company-employees.component';

describe('AddCompanyEmployeesComponent', () => {
  let component: AddCompanyEmployeesComponent;
  let fixture: ComponentFixture<AddCompanyEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

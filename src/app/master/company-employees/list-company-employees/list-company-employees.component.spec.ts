import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyEmployeesComponent } from './list-company-employees.component';

describe('ListCompanyEmployeesComponent', () => {
  let component: ListCompanyEmployeesComponent;
  let fixture: ComponentFixture<ListCompanyEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

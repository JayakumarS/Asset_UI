import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiplecompanyEmployeesComponent } from './add-multiplecompany-employees.component';

describe('AddMultiplecompanyEmployeesComponent', () => {
  let component: AddMultiplecompanyEmployeesComponent;
  let fixture: ComponentFixture<AddMultiplecompanyEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiplecompanyEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultiplecompanyEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

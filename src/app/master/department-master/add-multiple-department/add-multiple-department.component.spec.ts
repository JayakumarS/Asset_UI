import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleDepartmentComponent } from './add-multiple-department.component';

describe('AddMultipleDepartmentComponent', () => {
  let component: AddMultipleDepartmentComponent;
  let fixture: ComponentFixture<AddMultipleDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

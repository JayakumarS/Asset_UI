import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentMasterComponent } from './add-department-master.component';

describe('AddDepartmentMasterComponent', () => {
  let component: AddDepartmentMasterComponent;
  let fixture: ComponentFixture<AddDepartmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartmentMasterComponent } from './list-department-master.component';

describe('ListDepartmentMasterComponent', () => {
  let component: ListDepartmentMasterComponent;
  let fixture: ComponentFixture<ListDepartmentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepartmentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

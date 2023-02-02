import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyEmpComponent } from './delete-company-emp.component';

describe('DeleteCompanyEmpComponent', () => {
  let component: DeleteCompanyEmpComponent;
  let fixture: ComponentFixture<DeleteCompanyEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCompanyEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

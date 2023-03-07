import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleuploadManageAuditComponent } from './add-multipleupload-manage-audit.component';

describe('AddMultipleuploadManageAuditComponent', () => {
  let component: AddMultipleuploadManageAuditComponent;
  let fixture: ComponentFixture<AddMultipleuploadManageAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleuploadManageAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleuploadManageAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

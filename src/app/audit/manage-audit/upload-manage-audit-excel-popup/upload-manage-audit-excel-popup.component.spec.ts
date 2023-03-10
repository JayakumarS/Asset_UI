import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadManageAuditExcelPopupComponent } from './upload-manage-audit-excel-popup.component';

describe('UploadManageAuditExcelPopupComponent', () => {
  let component: UploadManageAuditExcelPopupComponent;
  let fixture: ComponentFixture<UploadManageAuditExcelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadManageAuditExcelPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadManageAuditExcelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

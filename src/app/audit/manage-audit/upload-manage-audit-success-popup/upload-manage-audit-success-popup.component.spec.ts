import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadManageAuditSuccessPopupComponent } from './upload-manage-audit-success-popup.component';

describe('UploadManageAuditSuccessPopupComponent', () => {
  let component: UploadManageAuditSuccessPopupComponent;
  let fixture: ComponentFixture<UploadManageAuditSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadManageAuditSuccessPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadManageAuditSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

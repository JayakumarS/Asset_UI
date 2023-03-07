import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditUploadErrorComponent } from './manage-audit-upload-error.component';

describe('ManageAuditUploadErrorComponent', () => {
  let component: ManageAuditUploadErrorComponent;
  let fixture: ComponentFixture<ManageAuditUploadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditUploadErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditUploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

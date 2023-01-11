import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageAuditServiceService } from '../../manage-audit-service.service';

@Component({
  selector: 'app-delete-manage-audit',
  templateUrl: './delete-manage-audit.component.html',
  styleUrls: ['./delete-manage-audit.component.sass']
})
export class DeleteManageAuditComponent {
  constructor( public dialogRef: MatDialogRef<DeleteManageAuditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manageAuditService: ManageAuditServiceService) { }
 
    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.manageAuditService.manageAuditDelete(this.data.auditCode);

  }
}

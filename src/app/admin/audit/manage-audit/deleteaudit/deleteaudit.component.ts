import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuditService } from '../../audit.service';

@Component({
  selector: 'app-deleteaudit',
  templateUrl: './deleteaudit.component.html',
  styleUrls: ['./deleteaudit.component.sass']
})
export class DeleteauditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteauditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auditService: AuditService) { }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.auditService.DeleteAudit(this.data.id);
  }
}

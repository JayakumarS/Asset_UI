import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/master/company/company.service';
import { LoanReceivablesService } from '../../loan-receivables.service';

@Component({
  selector: 'app-delete-receivables',
  templateUrl: './delete-receivables.component.html',
  styleUrls: ['./delete-receivables.component.sass']
})
export class DeleteReceivablesComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteReceivablesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentMasterService: LoanReceivablesService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }

}

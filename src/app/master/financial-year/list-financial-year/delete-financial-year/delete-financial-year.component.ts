import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinancialYearService } from '../../financial-year.service';

@Component({
  selector: 'app-delete-financial-year',
  templateUrl: './delete-financial-year.component.html',
  styleUrls: ['./delete-financial-year.component.sass']
})
export class DeleteFinancialYearComponent  {

  
  constructor(public dialogRef: MatDialogRef<DeleteFinancialYearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public financialYearService: FinancialYearService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }

}

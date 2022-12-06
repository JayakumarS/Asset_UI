import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SalesCallEntryService } from '../../sales-call-entry.service';
@Component({
  selector: 'app-delete-sales-call-entry',
  templateUrl: './delete-sales-call-entry.component.html',
  styleUrls: ['./delete-sales-call-entry.component.sass']
})
export class DeleteSalesCallEntryComponent{

  constructor(public dialogRef: MatDialogRef<DeleteSalesCallEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public salesCallEntryService: SalesCallEntryService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.salesCallEntryService.DeleteSalesCallEntry(this.data.salesCallHdrId);
    }

}

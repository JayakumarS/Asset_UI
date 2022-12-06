import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesQuoteService } from '../../sales-quote.service';

@Component({
  selector: 'app-delete-sales',
  templateUrl: './delete-sales.component.html',
  styleUrls: ['./delete-sales.component.sass']
})
export class DeleteSalesComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteSalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public salesQuoteService: SalesQuoteService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.salesQuoteService.DeleteSalesQuote(this.data.countValue)
  }

  ngOnInit(): void {
  }

}

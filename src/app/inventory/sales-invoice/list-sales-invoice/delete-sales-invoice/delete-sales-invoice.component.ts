import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesInvoiceService } from '../../sales-invoice.service';

@Component({
  selector: 'app-delete-sales-invoice',
  templateUrl: './delete-sales-invoice.component.html',
  styleUrls: ['./delete-sales-invoice.component.sass']
})
export class DeleteSalesInvoiceComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteSalesInvoiceComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public salesInvoiceService: SalesInvoiceService) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }

  ngOnInit(): void {
  }
}

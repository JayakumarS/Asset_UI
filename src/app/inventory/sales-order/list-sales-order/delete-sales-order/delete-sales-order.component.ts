import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesOrderService } from '../../sales-order.service';

@Component({
  selector: 'app-delete-sales-order',
  templateUrl: './delete-sales-order.component.html',
  styleUrls: ['./delete-sales-order.component.sass']
})
export class DeleteSalesOrderComponent implements OnInit {
 
  constructor(public salesOrderService: SalesOrderService,public dialogRef: MatDialogRef<DeleteSalesOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.dialogRef.close({ data: true });
  }
  ngOnInit(): void {
  }

}

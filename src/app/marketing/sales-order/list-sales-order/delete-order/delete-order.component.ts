import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesOrderService } from '../../sales-order.service';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.sass']
})
export class DeleteOrderComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public salesOrderService: SalesOrderService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.salesOrderService.DeleteSalesOrder(this.data.countValue)
  }

  ngOnInit(): void {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-purchase-order',
  templateUrl: './delete-purchase-order.component.html',
  styleUrls: ['./delete-purchase-order.component.sass']
})
export class DeletePurchaseOrderComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();

  constructor( public dialogRef: MatDialogRef<DeletePurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    }

  ngOnInit(): void {
  }

}


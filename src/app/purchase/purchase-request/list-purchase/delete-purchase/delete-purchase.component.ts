import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseRequestService } from '../../purchase-request.service';

@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.sass']
})
export class DeletePurchaseComponent  {

  constructor(public dialogRef: MatDialogRef<DeletePurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public purchaseRequestService: PurchaseRequestService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    }


  ngOnInit(): void {
  }

}

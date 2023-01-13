import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransferAssetService } from '../../transfer-asset.service';

@Component({
  selector: 'app-delete-transfer',
  templateUrl: './delete-transfer.component.html',
  styleUrls: ['./delete-transfer.component.sass']
})
export class DeleteTransferComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public transferservice:TransferAssetService,) { 

  }
  
  onNoClick(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }
  confirmDelete(): void {
    this.dialogRef.close({ data: true });
  }

}

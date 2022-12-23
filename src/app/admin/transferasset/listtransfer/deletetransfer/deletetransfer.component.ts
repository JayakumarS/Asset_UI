import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransferService } from '../../transfer.service';

@Component({
  selector: 'app-deletetransfer',
  templateUrl: './deletetransfer.component.html',
  styleUrls: ['./deletetransfer.component.sass']
})
export class DeletetransferComponent  {

  constructor(public dialogRef: MatDialogRef<DeletetransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public transferservice:TransferService,) { 

  }
  
  onNoClick(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }
  confirmDelete(): void {
    this.dialogRef.close({ data: true });
  }


}


import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { JewelleryService } from '../../jewellery.service';

@Component({
  selector: 'app-delete-jewellery-details',
  templateUrl: './delete-jewellery-details.component.html',
  styleUrls: ['./delete-jewellery-details.component.sass']
})
export class DeleteJewelleryDetailsComponent {

  constructor(public dialogRef: MatDialogRef<DeleteJewelleryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentMasterService: JewelleryService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }

}

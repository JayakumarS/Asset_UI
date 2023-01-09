import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepreciationService } from '../../depreciation.service';

@Component({
  selector: 'app-delete-depreciation',
  templateUrl: './delete-depreciation.component.html',
  styleUrls: ['./delete-depreciation.component.sass']
})
export class DeleteDepreciationComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteDepreciationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public depreciationService: DepreciationService) { }


    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }

}

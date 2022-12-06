import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BooService } from '../../boo.service';

@Component({
  selector: 'app-delete-boo',
  templateUrl: './delete-boo.component.html',
  styleUrls: ['./delete-boo.component.sass']
})
export class DeleteBooComponent {

  constructor(public dialogRef: MatDialogRef<DeleteBooComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public booService: BooService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.booService.DeleteBillOfOperation(this.data.booNo);
  }

}

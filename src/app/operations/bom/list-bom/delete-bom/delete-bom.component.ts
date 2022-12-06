import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BomService } from '../../bom.service';

@Component({
  selector: 'app-delete-bom',
  templateUrl: './delete-bom.component.html',
  styleUrls: ['./delete-bom.component.sass']
})
export class DeleteBomComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bomService: BomService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
  this.bomService.billOfMaterialDelete(this.data.bomNo);
}

}

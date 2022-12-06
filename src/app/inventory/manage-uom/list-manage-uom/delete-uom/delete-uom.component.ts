import { Component, Inject ,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ManageUomService } from '../../manage-uom.service';
@Component({
  selector: 'app-delete-uom',
  templateUrl: './delete-uom.component.html',
  styleUrls: ['./delete-uom.component.sass']
})
export class DeleteUomComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public manageUomService: ManageUomService) { }

  onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.manageUomService.uomDelete(this.data.id);
  }

}

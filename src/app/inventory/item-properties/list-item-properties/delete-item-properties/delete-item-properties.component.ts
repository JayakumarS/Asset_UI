import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ItemPropertiesService } from '../../item-properties.service';


@Component({
  selector: 'app-delete-item-properties',
  templateUrl: './delete-item-properties.component.html',
  styleUrls: ['./delete-item-properties.component.sass']
})
export class DeleteItemPropertiesComponent {

  constructor(public dialogRef: MatDialogRef<DeleteItemPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public itemPropertiesService: ItemPropertiesService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.itemPropertiesService.itemPropertiesdelete(this.data.itemPropertyId);
  }
}

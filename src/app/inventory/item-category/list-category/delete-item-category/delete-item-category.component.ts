import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
 import { ItemCategoryService } from '../../item-category.service';


@Component({
  selector: 'app-delete-item-category',
  templateUrl: './delete-item-category.component.html',
  styleUrls: ['./delete-item-category.component.sass']
})
export class DeleteItemCategoryComponent {

  constructor(public dialogRef: MatDialogRef<DeleteItemCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public itemCategoryService: ItemCategoryService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.itemCategoryService.itemCategorydelete(this.data.itemCategoryId);
  }
}

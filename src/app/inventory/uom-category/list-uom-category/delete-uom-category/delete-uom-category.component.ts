import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UomCategoryService } from '../../uom-category.service';

@Component({
  selector: 'app-delete-uom-category',
  templateUrl: './delete-uom-category.component.html',
  styleUrls: ['./delete-uom-category.component.sass']
})
export class DeleteUomCategoryComponent {

  constructor(public dialogRef: MatDialogRef<DeleteUomCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public uomCategoryService: UomCategoryService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
        }

  ngOnInit(): void {
  }

}

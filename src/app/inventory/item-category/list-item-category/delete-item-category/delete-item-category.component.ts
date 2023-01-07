import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-item-category',
  templateUrl: './delete-item-category.component.html',
  styleUrls: ['./delete-item-category.component.sass']
})
export class DeleteItemCategoryComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();

  constructor( public dialogRef: MatDialogRef<DeleteItemCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

   
    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    }

  ngOnInit(): void {
  }

}

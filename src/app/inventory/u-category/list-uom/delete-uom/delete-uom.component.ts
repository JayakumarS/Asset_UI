import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-uom',
  templateUrl: './delete-uom.component.html',
  styleUrls: ['./delete-uom.component.sass']
})
export class DeleteUomComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();

  constructor( public dialogRef: MatDialogRef<DeleteUomComponent>,
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

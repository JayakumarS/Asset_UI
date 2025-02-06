import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-application-details',
  templateUrl: './delete-application-details.component.html',
  styleUrls: ['./delete-application-details.component.sass']
})
export class DeleteApplicationDetailsComponent implements OnInit {

  subscribe: Subject<any> = new Subject<any>();

  constructor(public dialogRef: MatDialogRef<DeleteApplicationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }

  confirmDelete(): void {
    this.dialogRef.close({data: true})
  }

  ngOnInit(): void {
  }

}

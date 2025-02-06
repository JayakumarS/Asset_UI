import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-delete-backup-location',
  templateUrl: './delete-backup-location.component.html',
  styleUrls: ['./delete-backup-location.component.sass']
})
export class DeleteBackupLocationComponent implements OnInit {

  subscribe: Subject<any> = new Subject<any>();

  constructor(public dialogRef: MatDialogRef<DeleteBackupLocationComponent>,
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

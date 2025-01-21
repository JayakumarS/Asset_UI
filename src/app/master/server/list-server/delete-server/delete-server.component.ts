import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ServerService } from '../../server.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-server',
  templateUrl: './delete-server.component.html',
  styleUrls: ['./delete-server.component.sass']
})
export class DeleteServerComponent implements OnInit {

  subscribe: Subject<any> = new Subject<any>();

  constructor(public dialogRef: MatDialogRef<DeleteServerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  onNoClick(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }

  confirmDelete(): void {
    this.dialogRef.close({data: true})
  }

  ngOnInit(): void {
  }

}

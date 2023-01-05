import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserMasterService } from '../../user-master.service';

@Component({
  selector: 'app-delete-user-master',
  templateUrl: './delete-user-master.component.html',
  styleUrls: ['./delete-user-master.component.sass']
})
export class DeleteUserMasterComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteUserMasterComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public userMasterService: UserMasterService) { }

onNoClick(): void {
this.dialogRef.close();
}
confirmDelete(): void {
this.dialogRef.close({ data: true })
}

ngOnInit(): void {
}
}

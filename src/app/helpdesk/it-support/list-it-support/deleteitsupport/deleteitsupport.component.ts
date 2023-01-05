import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Itsupportservice } from '../../it-support.service';

@Component({
  selector: 'app-deleteitsupport',
  templateUrl: './deleteitsupport.component.html',
  styleUrls: ['./deleteitsupport.component.sass']
})
export class DeleteitsupportComponent {
  subscribe: Subject<any> = new Subject<any>();
 
  constructor( public dialogRef: MatDialogRef<DeleteitsupportComponent>,
    private itsupportservice: Itsupportservice,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

   
    onNoClick(): void {
      this.dialogRef.close
    }
    confirmDelete(): void {
      this.itsupportservice.ITsupportDelete(this.data.id);
    }



}

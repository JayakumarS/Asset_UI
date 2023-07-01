import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trial-component',
  templateUrl: './trial-component.component.html',
  styleUrls: ['./trial-component.component.sass']
})
export class TrialComponentComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();

  constructor( public dialogRef: MatDialogRef<TrialComponentComponent>,
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

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-exchange-master',
  templateUrl: './delete-exchange-master.component.html',
  styleUrls: ['./delete-exchange-master.component.sass']
})
export class DeleteExchangeMasterComponent implements OnInit {

  
  subscribe: Subject<any> = new Subject<any>();

  constructor( public dialogRef: MatDialogRef<DeleteExchangeMasterComponent>,
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

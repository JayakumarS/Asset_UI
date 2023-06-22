import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-alert',
  templateUrl: './subscription-alert.component.html',
  styleUrls: ['./subscription-alert.component.sass']
})
export class SubscriptionAlertComponent implements OnInit {

  
  constructor( public dialogRef: MatDialogRef<SubscriptionAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }
  onCancel(){
    this.dialogRef.close({ data: true })

  }
}

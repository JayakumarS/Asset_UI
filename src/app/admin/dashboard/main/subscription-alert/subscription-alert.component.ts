import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-alert',
  templateUrl: './subscription-alert.component.html',
  styleUrls: ['./subscription-alert.component.sass']
})
export class SubscriptionAlertComponent implements OnInit {

  
  constructor( public dialogRef: MatDialogRef<SubscriptionAlertComponent>,
    private router:Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }
  onRecharge(){
    this.dialogRef.close({ data: true })
this.router.navigate(["/payments/initiatePayment/subscription"])
  }
  onCancel(){
    this.dialogRef.close({ data: true })

  }
}
 
import { Component, OnInit } from '@angular/core';
import { SubscriptionAlertComponent } from '../subscription-alert/subscription-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-over',
  templateUrl: './subscription-over.component.html',
  styleUrls: ['./subscription-over.component.sass']
})
export class SubscriptionOverComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {

    
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
     } else {
    tempDirection = "ltr";
     }
      {

        const dialogRef = this.dialog.open(SubscriptionAlertComponent, {
          height: "520px",
          width: "1000px",
          direction: tempDirection,
          disableClose: true,

        });
      }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-registration-popup',
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.sass']
})
export class RegistrationPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegistrationPopupComponent>) { }

  ngOnInit(): void {
  }

  loginPage(){
    this.dialogRef.close();
  }
}

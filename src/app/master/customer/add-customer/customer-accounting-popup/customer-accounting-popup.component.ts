import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../customer.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-customer-accounting-popup',
  templateUrl: './customer-accounting-popup.component.html',
  styleUrls: ['./customer-accounting-popup.component.sass']
})
export class CustomerAccountingPopupComponent implements OnInit {
  docForm: FormGroup;
  customerMaster: any;


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CustomerAccountingPopupComponent>,
              private customerService: CustomerService,
              private spinner: NgxSpinnerService,
              public router: Router, ) {
    this.docForm = this.fb.group({
    name: [""],
    position: [""],
    conEmail: [""],
    conPhone: [""],
    mobile: [""]
  });
  }
  ngOnInit(): void {
    this.docForm = this.fb.group({
      name: [""],
      position: [""],
      conEmail: [""],
      conPhone: [""],
      mobile: [""]
    });
}

public onSubmit(): void {
  this.dialogRef.close({ contact: this.docForm.value });

  }


onCancel() {
  this.dialogRef.close({ data: 'CANCEL' });
}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
onNoClick(): void {
  this.dialogRef.close();
}


string(event: any) {
  const pattern = /[A-Za-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

keyPressNumeric(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}
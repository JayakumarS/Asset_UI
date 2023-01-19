import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { CustomerService } from '../../customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';



@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.sass']
})
export class AccountPopupComponent implements OnInit {
  docForm: FormGroup;
  customerMaster: any;
  countryList = [];
  stateDdList = [];

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private customerService: CustomerService,
              private httpService: HttpServiceService,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AccountPopupComponent>, ) {
                this.docForm = this.fb.group({
      bankName: [""],
      accType: [""],
      accNo: [""],
      ifscCode: [""],
      address: [""],
      state: [""],
      zip: [""],
      country: [""],
      acctReceivable: [""],
      supplier: [""],
      totalReceivable: [""],
      creditLimit: [""],
                });
  }
  ngOnInit(): void {
    this.docForm = this.fb.group({
      bankName: [""],
      accType: [""],
      accNo: [""],
      ifscCode: [""],
      address: [""],
      state: [""],
      zip: [""],
      country: [""],
      acctReceivable: [""],
      supplier: [""],
      totalReceivable: [""],
      creditLimit: [""],


    });

    // country dropdown
    this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
      next: (data) => {
        this.countryList = data;
      },
      error: (error) => {

      }
    });

 // State dropdown
    this.httpService.get<any>(this.commonService.getStateDropdown).subscribe({
  next: (data) => {
    this.stateDdList = data;
  },
  error: (error) => {

  }
});
  }
  public onSubmit(): void {
    this.dialogRef.close({ account: this.docForm.value });

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
  oncancel() {
    this.dialogRef.close({ data: true });
  }

keyPressNumeric(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
string(event: any) {
  const pattern = /[A-Za-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { CustomerService } from '../../customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';



@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.sass']
})
export class AccountPopupComponent implements OnInit {
  docForm: FormGroup;
  customerMaster: any;
  countryList = [];
  countrybasedStateList=[];
  stateDdList = [];
  ifscForm: FormGroup;


  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private customerService: CustomerService,
              private httpService: HttpServiceService,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AccountPopupComponent>, 
              private tokenStorageService:TokenStorageService) {
                this.docForm = this.fb.group({
      bankName: [""],
      accType: [""],
      accNo: [""],
      ifscCode: ["",Validators.pattern('[A-Za-z]{4}[0-9]{7}')],
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
      ifscCode: ["",Validators.pattern('[A-Za-z]{4}[0-9]{7}')],
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
    
    this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+ this.tokenStorageService.getCompanyId()).subscribe((res: any) => {
    //   next: (data) => {
    //     this.countryList = data;
    //   },
    //   error: (error) => {

    //   }
    // });
    this.countryList = res;
  });
  

 // State dropdown
 


  }
  fetchCountryBasedState(country:any){
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList = res;
    })
  }
  
  zipcodevalidation1(event:any){
    if(event.length != 6){ 
      this.docForm.controls['zip'].setErrors({ shipper: true });
    }else{
      this.docForm.controls['zip'].setErrors(null);
    } 
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
keyPressString(event: any){
  const pattern = /[A-Z,a-z ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}

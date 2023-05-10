import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

import { NotificationService } from 'src/app/core/service/notification.service';
import { LoanOtherdebitsService } from '../loan-otherdebits.service';
import { Otherdebits } from '../loan-otherdebits.model';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-otherdebits',
  templateUrl: './add-otherdebits.component.html',
  styleUrls: ['./add-otherdebits.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class AddOtherdebitsComponent implements OnInit {

 
  docForm: FormGroup;
  edit:boolean=false;
  otherdebits:Otherdebits;
  requestId: number;
  currencyList: [];
  submitted: boolean;
  customerDropDown: [];
  user: string;
  customer: any;
  itemDropDown: [];
  uomDropDown: [];
  assetDropdown: [];
  value: any;
  value1: any;
  currencyListbasedCompany=[];
  totalValue:number;
  loanPropertyList: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private cmnService:CommonService,
    private httpService: HttpServiceService,
    private router:Router,
    public route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
    public tokenStorage: TokenStorageService,
    public notificationService: NotificationService,
    private loanOtherdebitsService: LoanOtherdebitsService) {
    
   
      this.docForm = this.fb.group({
        loanProperty:[""],
        type:["", [Validators.required]],
        loanID:[""],
        loan:["", [Validators.required]],
        loanAmount:["", [Validators.required]],
        loanRef:["", [Validators.required]],
        loanStartDateObj:["", [Validators.required]],
        loanStartDate:["", [Validators.required]],
        loanDueDateObj:["", [Validators.required]],
        loanDueDate:["", [Validators.required]],
        amount:["", [Validators.required]],
        emidateObj:["", [Validators.required]],
        emiDate:["", [Validators.required]],
        penalityAmount:[""],
        interestRate:["", [Validators.required]],
        accountNo:[""],
        account:["", [Validators.required]],
        bankname:["", [Validators.required]],
        id:[""],
        loginedUser: this.tokenStorage.getUserId(),
      })
  


   }
   ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });

         // Property loan dropdown
    this.httpService.get<any>(this.loanOtherdebitsService.getLoanPropertyList).subscribe({
      next: (data) => {
        this.loanPropertyList = data;
      },
      error: (error) => {

      }
    }
    );

  }


fetchDetails(requestId: any): void {
const obj = {
  editId: requestId
}
this.loanOtherdebitsService.editlist(obj).subscribe({
  next: (res) => {
  this.docForm.patchValue({
      'loanProperty': res.loanProperty,
      'type': res.type,
      'loan':res.loan,
      'loanAmount': res.loanAmount,
      'loanRef':res.loanRef,
      'loanStartDateObj' :this.commonService.getDateObj(res.loanStartDate),
      'loanStartDate' :res.loanStartDate,
      'loanDueDateObj':this.commonService.getDateObj(res.loanDueDate),
      'loanDueDate':res.loanDueDate,
      'amount' :res.amount,
      'emidateObj':this.commonService.getDateObj(res.emiDate),
      'emiDate':res.emiDate,
      'penalityAmount':res.penalityAmount,
      'interestRate' :res.interestRate,
      'account':res.account,
      'bankname': res.bankname,
      'id' :this.requestId,     
       
  });
},
error: (error) => {
}
});
}


update(){
  this.otherdebits = this.docForm.value;
  if(this.docForm.valid){
    this.loanOtherdebitsService.updateother(this.otherdebits,this.router,this.notificationService);
  } else {
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }
}

reset(){
  if (!this.edit) {
    location.reload()
    this.docForm = this.fb.group({
        loanProperty:[""],
        type:[""],
        loanID:[""],
        loan:[""],
        loanAmount:[""],
        loanRef:[""],
        loanStartDateObj:[""],
        loanStartDate:[""],
        loanDueDateObj:[""],
        loanDueDate:[""],
        amount:[""],
        emidateObj:[""],
        emiDate:[""],
        penalityAmount:[""],
        interestRate:[""],
        accountNo:[""],
        account:[""],
        bankname:[""],
        id:[""],
        loginedUser: this.tokenStorage.getUserId(),
    });
} else {
  this.fetchDetails(this.requestId);
}
}

getDateString(event,inputFlag,index){
let cdate = this.commonService.getDate(event.target.value);
if(inputFlag=='loanStartDate'){
  this.docForm.patchValue({loanStartDate:cdate});
}
if(inputFlag=='loanDueDate'){
  this.docForm.patchValue({loanDueDate:cdate});
}
if(inputFlag=='emiDate'){
  this.docForm.patchValue({emiDate:cdate});
}
// if(inputFlag=='loanStartDate'){
//   let  OrderDtlArray= this.docForm.controls.OrderDtl as FormArray;
//   OrderDtlArray.at(index).patchValue({
//       loanStartDate: cdate
//     });
//   // this.docForm.patchValue({loanStartDate:cdate});
// }
// if(inputFlag=='loanDueDate'){
//   let  OrderDtlArray= this.docForm.controls.OrderDtl as FormArray;
//   OrderDtlArray.at(index).patchValue({
//       loanDueDate: cdate
//     });
//   // this.docForm.patchValue({loanDueDate:cdate});
// }
}


cancel() { 
  if(window.sessionStorage.getItem("loanFrom")=="loan"){
    window.sessionStorage.setItem("loanFrom","");
    this.router.navigate(['/master/multiple/allMaster/0']);
  }else if(window.sessionStorage.getItem("loanFrom")=="normal"){
    window.sessionStorage.setItem("loanFrom","");
    this.router.navigate(['/master/loan-otherdebits/list-otherdebits']);
  }else
  {
    this.router.navigate(['/master/loan-otherdebits/list-otherdebits']);

  }
}

onSubmit(){
  this.otherdebits = this.docForm.value;

  if(this.docForm.valid){ 
    this.loanOtherdebitsService.addotherdebits(this.otherdebits,this.router,this.notificationService);
  } else {
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }
}




keyPressNumeric(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

keyPressAlphaNumeric(event: any) {
  const pattern = /[A-Z,a-z 0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}



keyPressNumberDouble(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressName(event: any) {
  const pattern = /[A-Z, a-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}


getPropertyDetails(requestId: any): void {
  const obj = {
    propertyId: requestId
  }
  this.loanOtherdebitsService.getPropertyDetails(obj).subscribe({
    next: (res) => {
    this.docForm.patchValue({
        'type': res.loantype,
        'loan':res.loanNo,
        'loanAmount': res.loanAmount,
        'loanRef':res.loanRef,
        'loanStartDateObj' :this.commonService.getDateObj(res.loanStartDate),
        'loanStartDate' :res.loanStartDate,
        'loanDueDateObj':this.commonService.getDateObj(res.loanDueDate),
        'loanDueDate':res.loanDueDate,
        'amount' :res.amount,
        'emidateObj':this.commonService.getDateObj(res.emiDate),
        'emiDate':res.emiDate,
        'penalityAmount':res.penalityAmount,
        'interestRate' :res.loanInterest,
        'account':res.account,
        'bankname': res.bankname,
        'id' :this.requestId,     
         
    });
  },
  error: (error) => {
  }
  });
  }

}
// getDateString(event, inputFlag, index) {
//   let cdate = this.commonService.getDate(event.target.value);
//   if (inputFlag == 'PaymentStartDate') {
//     this.docForm.patchValue({ PaymentStartDate: cdate });
//   }
//   let date = this.commonService.getDate(event.target.value);
//   if (inputFlag == 'PaymentDueDate') {
//     this.docForm.patchValue({ PaymentDueDate: date });
//   }
// }




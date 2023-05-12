

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as internal from 'stream';
import { NotificationService } from 'src/app/core/service/notification.service';
import { PropertyService } from '../property.service';
import { Property } from '../property-model';

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
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.sass'],
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
export class AddPropertyComponent implements OnInit {
  docForm: FormGroup;
  property:Property;
  requestId: number;
  branchList = [];
  edit:boolean=false;
  url:any;
  isRent: boolean = false;
  isHouse: boolean;
  isLoan: boolean;
  isAutoDebit: boolean;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private cmnService:CommonService,private httpService: HttpServiceService,
    private propertyService:PropertyService,
    private router:Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private tokenStorage:TokenStorageService,
  ) { 
    this.docForm = this.fb.group({
       propertyType:[""],
       residencialType:[""],
       squareFeet:[""],
       guidelineValue:[""],
       currentValue:[""],
       depVal:[""],
       loan:["", [Validators.required]],
       loanNo:[""],
       emiDate:[""],
       emiDateObj:[""],
       loanInterest:[""],
       autoDebit:[false],
       loanAmount:[""],
       account:[""],
       rentalType:[""],
       advance:[""],
       rentAmount:[""],
       dateToPayDateObj:[""],
       dateToPayDate:[""],
       rentalPeriod:[""],
       tenantName:[""],
       tenentIdCard:[""],
       mobileNo:[""],
       alternateNo:[""],
       payerDate:[""],
       payerDateObj:[""],
       inMonth:[""],
       payerMode:[""],
       recive:[""],
       propertyRate:[""],
       regDate:[""],
       regDateObj:[""],
       propertyLocation:[""],
       taxNo:[""],
       mortage:[""],



      //  rentType:[""],
      //  propertyHolderName:["", [Validators.required]],
      //  noProperty:["", [Validators.required]],
      //  ownership:["", [Validators.required]],
      //  type:["", [Validators.required]],
      //  loantype:[""],

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
     this.rentalFlag(event);

    }
  });
 }
 
 onSubmit():void{
   this.property = this.docForm.value;
   if(this.docForm.valid){ 
     this.propertyService.saveprop(this.property,this.notificationService);
     if(window.sessionStorage.getItem("propFrom")=="prop"){
      window.sessionStorage.setItem("propFrom","");
      this.router.navigate(['/master/multiple/allMaster/0']);
    }else if(window.sessionStorage.getItem("propFrom")=="normal"){
      window.sessionStorage.setItem("propFrom","");
      this.router.navigate(['/master/property/list-property']);
    }   } else {
     this.notificationService.showNotification(
       "snackbar-danger",
       "Please fill all the required details!",
       "top",
       "right");
   }
 }
 onCancel(){

if(window.sessionStorage.getItem("propFrom")=="prop"){
  window.sessionStorage.setItem("propFrom","");
  this.router.navigate(['/master/multiple/allMaster/0']);
}else if(window.sessionStorage.getItem("propFrom")=="normal"){
  window.sessionStorage.setItem("propFrom","");
  this.router.navigate(['/master/property/list-property']);
}
 }
 reset() {
   
   
   if (!this.edit) {
    location.reload()
   this.docForm = this.fb.group({
      
    propertyType:[""],
       residencialType:[""],
       squareFeet:[""],
       guidelineValue:[""],
       currentValue:[""],
       depVal:[""],
       loan:[""],
       loanNo:[""],
       emiDate:[""],
       emiDateObj:[""],
       loanInterest:[""],
       autoDebit:[""],
       loanAmount:[""],
       account:[""],
       rentalType:[""],
       advance:[""],
       rentAmount:[""],
       dateToPayDateObj:[""],
       dateToPayDate:[""],
       rentalPeriod:[""],
       tenantName:[""],
       tenentIdCard:[""],
       mobileNo:[""],
       alternateNo:[""],
       payerDate:[""],
       payerDateObj:[""],
       inMonth:[""],
       payerMode:[""],
       recive:[""],
       propertyRate:[""],
       regDate:[""],
       regDateObj:[""],
       propertyLocation:[""],
       taxNo:[""],
       mortage:[""],
       loginedUser: this.tokenStorage.getUserId(),
       id:[""],
     
   });
 } else {
   this.fetchDetails(this.requestId);
 }
 }
 fetchDetails(requestId: any): void{
  this.edit=true;
  const obj = {
    editId: requestId
  }
 
  this.propertyService.editprop(obj).subscribe({
    next: (res) => {
      let hdate = this.cmnService.getDateObj(res.propertyBean.regDate);
      let hdate1 = this.cmnService.getDateObj(res.propertyBean.payerDate);
      let hdate2 = this.cmnService.getDateObj(res.propertyBean.emiDate);
      let hdate3 = this.cmnService.getDateObj(res.propertyBean.dateToPayDate);

      this.houseFlag(res.propertyBean.propertyType);
      this.loanFlag(res.propertyBean.loan);
      this.rentalFlag(res.propertyBean.rentalType);


      this.docForm.patchValue({
        'propertyType': res.propertyBean.propertyType,
        // 'rentType': res.propertyBean.rentType,
        'payerDate': res.propertyBean.payerDate,
        'payerDateObj': hdate1,
        'inMonth': res.propertyBean.inMonth,
        'payerMode': res.propertyBean.payerMode,
        'recive': res.propertyBean.recive,
        'propertyHolderName': res.propertyBean.propertyHolderName,
        'noProperty': res.propertyBean.noProperty,
        'propertyRate': res.propertyBean.propertyRate,
        'regDate': res.propertyBean.regDate,
        'regDateObj':hdate,
        'propertyLocation': res.propertyBean.propertyLocation,
        'taxNo': res.propertyBean.taxNo,
        'mortage': res.propertyBean.mortage,
        'type': res.propertyBean.type,
        'ownership': res.propertyBean.ownership,
        'currentValue': res.propertyBean.currentValue,
        'depVal': res.propertyBean.depVal,
        'squareFeet': res.propertyBean.squareFeet,
        'loan': res.propertyBean.loan,
        'loanNo': res.propertyBean.loanNo,
        'loanInterest': res.propertyBean.loanInterest,
        'loantype': res.propertyBean.loantype,
        'account': res.propertyBean.account,
        'loanAmount': res.propertyBean.loanAmount,
        'id' :this.requestId,

    

        'residencialType':res.propertyBean.residencialType,
        'guidelineValue':res.propertyBean.guidelineValue,
        'emiDate':res.propertyBean.emiDate,
        'emiDateObj':hdate2,
        'autoDebit':res.propertyBean.autoDebit,
        'rentalType':res.propertyBean.rentalType,
        'advance':res.propertyBean.advance,
        'rentAmount':res.propertyBean.rentAmount,
        'dateToPayDateObj':hdate3,
        'dateToPayDate':res.propertyBean.dateToPayDate,
        'rentalPeriod':res.propertyBean.rentalPeriod,
        'tenantName':res.propertyBean.tenantName,
        'tenentIdCard':res.propertyBean.tenentIdCard,
        'mobileNo':res.propertyBean.mobileNo,
        'alternateNo':res.propertyBean.alternateNo,

    });
  },
  error: (error) => {
  }
});

}
update(){
  if(this.docForm.valid){
    this.property = this.docForm.value;
    this.property.id = this.requestId;

    this.propertyService.updateprop(this.property,this.router,this.notificationService);
  } else {
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }
 }
 
 showNotification(colorName, text, placementFrom, placementAlign) {
 
 }

 validateCustomer(event){
   
 }
 keyPressnumber(event:any){

 }
 keyPressName(event: any) {
   const pattern = /[A-Z, a-z]/;
   const inputChar = String.fromCharCode(event.charCode);
   if (event.keyCode != 8 && !pattern.test(inputChar)) {
     event.preventDefault();
   }
 }
 keyPressNumberInt(event: any) {
   const pattern = /[0-9]/;
   const inputChar = String.fromCharCode(event.charCode);
   if (event.keyCode != 8 && !pattern.test(inputChar)) {
     event.preventDefault();
   }
 }
 
 removeRowSelf(index) {
     const CustInvoiceDetailBeanArray = this.docForm.controls.OrderDtl as FormArray;
     CustInvoiceDetailBeanArray.removeAt(index);
   }
   getDateString(event, inputFlag, index) {
     let cdatedate = this.commonService.getDate(event.target.value);
     if (inputFlag == 'regDate') {
       this.docForm.patchValue({ regDate: cdatedate });
     }
     
     

    
   }


   houseFlag(event)
   {
      if (event == 'House') {
        this.isHouse = true;
        // this.docForm.controls.Rent.setValidators(Validators.required);
        // this.isRent = false;
  
      } else {
        this.isHouse = false;
        // this.docForm.controls.Rent.clearValidators();
        // this.docForm.controls['Rent'].updateValueAndValidity();
      }
   }

   loanFlag(event)
   {
      if (event == 'YES') {
        this.isLoan = true;
        // this.docForm.controls.Rent.setValidators(Validators.required);
        // this.isRent = false;
  
      } else {
        this.isLoan = false;
        // this.docForm.controls.Rent.clearValidators();
        // this.docForm.controls['Rent'].updateValueAndValidity();
      }
   }


   rentalFlag(event)
   {
      if (event == 'Rent') {
        this.isRent = true;
        // this.docForm.controls.Rent.setValidators(Validators.required);
        // this.isRent = false;
  
      } else {
        this.isRent = false;
        // this.docForm.controls.Rent.clearValidators();
        // this.docForm.controls['Rent'].updateValueAndValidity();
      }
   }


   keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
   

  getAutoDebit(event: any) {
    if (event) {
      this.isAutoDebit = true;
    }
    else {
      this.isAutoDebit = false;
    }
  }

  }

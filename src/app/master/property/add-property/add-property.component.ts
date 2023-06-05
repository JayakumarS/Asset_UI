

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
  isLand: boolean;
  isEcAvaliable: boolean;
  landFlag: boolean = false;
  isCompany: boolean;
  isGarden: boolean;
  isVilla: boolean;
  isApartment: boolean;
  isIndividual: boolean;
  isLease:boolean;
  isOwnProperty: boolean;
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
       propertyType:["",[Validators.required]],
       residencialType:[""],
       squareFeet:[""],
       guidelineValue:[""],
       currentValue:[""],
       depVal:[""],
       landTaxNo:[""],
       loan:["",[Validators.required]],
       loanNo:[""],
       emiDate:[""],
       emiDateObj:[""],
       loanInterest:[""],
       autoDebit:[false],
       loanAmount:[""],
      //  account:["", [Validators.required]],
       rentalType:["", [Validators.required]],
       advance:[""],
       rentAmount:[""],
       dateToPayDateObj:[""],
       dateToPayDate:[""],
     
       tenantName:[""],
       tenentIdCard:[""],
       mobileNo:[""],
     
      
   
       
     
       

       houseTaxNo:[""],
       location:[""],
       area:[""],
       landSqft:[""],
       landType:[""],
       ecAvaliable:[false],
       regNo:[""],
       landRegDateObj:[""],
       landRegDate:[""],
       source:[""],
       landGuidelineValue:[""],
       marketValue:[""],

       bankName:[""],
       branchName:[""],
       ifscCode:["", Validators.pattern('[A-Za-z]{4}[A-Z0-9]{7}')],
       acName:[""],
       acNumber:[""],
       accountUserId:[""],
       password:[""],
       loanstartObj:[""],
       loanstart:[""],
       loanendObj:[""],
       loanend:[""],
       emamount:[""],

       houseName:[""],
       houseAddress:[""],
       constructedOn:[""],
       constructedOnObj:[""],
       underLoan:[""],
       floor:[""],


      //Comapny
       companyName:[""],
       companyadd:[""],
       contactNo:[""],
       companysqft:[""],
       ownership:[""],
       insured:[""],
       ceoName:[""],
       conpanytype:[""],
       conpanydep:[""],
       comregOnObj:[""],
       comregOn:[""],
       companyNetWorth:[""],
      
       //granden
       gardenName:[""],
       gardenadd:[""],
       gardenSQFT:[""],
       gardenlayout:[""],
       gadregOnObj:[""],
       gadregOn:[""],
       gardenF:[""],
       mainten:[""],
       garTech:[""],


       //villa
       swpool:[""],
       parking:[""],
       noSecrity:[""],
       roomno:[""],

       //apartment
       aprtmenttype:[""],
       apartmentparking:[""],
       noSecrityAp:[""],

       //individual
       indParking:[""],
       electricityno:[""],

       //Lease
       landlordname:[""],
       tenantName1:[""],
       phoneNo:[""],
       propertyAddress:[""],
       squarefeet:[""],
       lesContract:[""],
       lesAmount:[""],
       noticepd:[""],

       //ownproperty

       preOwner:[""],
       preOwnername:[""],
       transitionDateObj:[""],
       transitionDate:[""],
       propWorth:[""],
       ownAddress:[""],
       mailId:[""],
       payStatus:[""],
       payAmt:[""],
       
       //rentarraydetails

       sampleDtl: this.fb.array([
        this.fb.group({
          advance:["",[Validators.required]],
          dateToPayDate:[""],
          dateToPayDateObj:[""],
          rentAmount:["",[Validators.required]],
          tenantName:["",[Validators.required]],
          tenentIdCard:["",[Validators.required]],
          mobileNo:["",[Validators.required]],
         
          loginedUser: this.tokenStorage.getUserId(),
         

        })
      ])
 

    

   })
 }
   
 ngOnInit(): void {
  this.houseFlag('House');
  this.rentalFlag('OwnProperty');
  this.htypeFlag('Villa');
  this.docForm.patchValue({
    'propertyType':'House',
    'rentalType':'OwnProperty',
    'residencialType':'Villa'
  })

  this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
     this.edit=true;
     //For User login Editable mode
     this.fetchDetails(this.requestId) ;
   //  this.rentalFlag(event);
     //this.getHouse(event);

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

removeRowArray(index){
  let dtlArray = this.docForm.controls.sampleDtl as FormArray;
  // if(index != 0){
  dtlArray.removeAt(index);
  // }

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
      //  advance:[""],
      //  rentAmount:[""],
      //  dateToPayDateObj:[""],
      //  dateToPayDate:[""],
 
      //  tenantName:[""],
      //  tenentIdCard:[""],
      //  mobileNo:[""],
  
   
    
     
      //  regDate:[""],
      //  regDateObj:[""],

    
   
       loginedUser: this.tokenStorage.getUserId(),
       id:[""],

       location:[""],
       area:[""],
       landSqft:[""],
       landType:[""],
       ecAvaliable:[""],
       regNo:[""],
       landRegDateObj:[""],
       landRegDate:[""],
       source:[""],
       landGuidelineValue:[""],
       marketValue:[""],
       houseTaxNo:[""],

       bankName:[""],
       branchName:[""],
       ifscCode:[""],
       acName:[""],
       acNumber:[""],
       accountUserId:[""],
       password:[""],
       loanstartObj:[""],
       loanstart:[""],
       loanendObj:[""],
       loanend:[""],
       emamount:[""],


       houseName:[""],
       houseAddress:[""],
       constructedOn:[""],
       constructedOnObj:[""],
       underLoan:[""],
       floor:[""],

       companyName:[""],
       companyadd:[""],
       contactNo:[""],
       companysqft:[""],
       ownership:[""],
       insured:[""],
       ceoName:[""],
       conpanytype:[""],
       conpanydep:[""],
       comregOnObj:[""],
       comregOn:[""],

       gardenName:[""],
       gardenadd:[""],
       gardenSQFT:[""],
       gardenlayout:[""],
       gadregOnObj:[""],
       gadregOn:[""],
       gardenF:[""],
       mainten:[""],
       garTech:[""],
       companyNetWorth:[""],

       swpool:[""],
       parking:[""],
       noSecrity:[""],
       roomno:[""],

       aprtmenttype:[""],
       apartmentparking:[""],
       noSecrityAp:[""],

       indParking:[""],
       electricityno:[""],

       landlordname:[""],
       tenantName1:[""],
       phoneNo:[""],
       propertyAddress:[""],
       squarefeet:[""],
       lesContract:[""],
       lesAmount:[""],
       noticepd:[""],


       preOwner:[""],
       preOwnername:[""],
       transitionDateObj:[""],
       transitionDate:[""],
       propWorth:[""],
       ownAddress:[""],
       mailId:[""],
       payStatus:[""],
       payAmt:[""],
//rent details

sampleDtl: this.fb.array([ 
  this.fb.group({
    advance:[""],
    dateToPayDate:[""],
    dateToPayDateObj:[""],
    rentAmount:[""],
    tenantName:[""],
    tenentIdCard:[""],
    mobileNo:[""], 
  
    loginedUser: this.tokenStorage.getUserId(),
    
   

  })
])
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
      let hdate2 = this.cmnService.getDateObj(res.propertyBean.emiDate);
      let hdate3 = this.cmnService.getDateObj(res.propertyBean.dateToPayDate);
      let hdate4 = this.cmnService.getDateObj(res.propertyBean.landRegDate);
      let hdate5 = this.cmnService.getDateObj(res.propertyBean.constructedOn);
      let hdate6 = this.cmnService.getDateObj(res.propertyBean.loanstart);
      let hdate7 = this.cmnService.getDateObj(res.propertyBean.loanend);
      let hdate8 = this.cmnService.getDateObj(res.propertyBean.comregOn);
      let hdate9 = this.cmnService.getDateObj(res.propertyBean.gadregOn);
      let hdate10 = this.cmnService.getDateObj(res.propertyBean.transitionDate);



      


      this.houseFlag(res.propertyBean.propertyType);
      this.loanFlag(res.propertyBean.loan);
      this.rentalFlag(res.propertyBean.rentalType);
      this.htypeFlag(res.propertyBean.residencialType);
    
      // this.getHouse(res.propertyBean.rentalType);


      this.docForm.patchValue({


        'propertyType': res.propertyBean.propertyType,
        // 'rentType': res.propertyBean.rentType,
       
        'regDate': res.propertyBean.regDate,
        'regDateObj':hdate,
     
       
       
        'type': res.propertyBean.type,
        'currentValue': res.propertyBean.currentValue,
        'depVal': res.propertyBean.depVal,
        'squareFeet': res.propertyBean.squareFeet1,
        'loan': res.propertyBean.loan,
        'loanNo': res.propertyBean.loanNo,
        'loanInterest': res.propertyBean.loanInterest,
        'loantype': res.propertyBean.loantype,
        // 'account': res.propertyBean.account,
        'loanAmount': res.propertyBean.loanAmount,
        'id' :this.requestId,
        "houseTaxNo": res.propertyBean.houseTaxNo,

    

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
  
        'tenantName':res.propertyBean.tenantName,
        'tenentIdCard':res.propertyBean.tenentIdCard,
        'mobileNo':res.propertyBean.mobileNo,
       
        // 'loanstartObj':hdate6,
        'loanstartObj':res.propertyBean.loanstart != null ? this.commonService.getDateObj(res.propertyBean.loanstart) : "",
        'loanendObj':res.propertyBean.loanend != null ? this.commonService.getDateObj(res.propertyBean.loanend) : "",

        // 'loanendObj':hdate7,
        'loanstart':res.propertyBean.loanstart,
        'loanend':res.propertyBean.loanend,
        'emamount':res.propertyBean.emamount,


        'location':res.propertyBean.location,
        'area':res.propertyBean.area,
        'landSqft':res.propertyBean.landSqft,
        'landType':res.propertyBean.landType,
        'ecAvaliable':res.propertyBean.ecAvaliable,
        'regNo':res.propertyBean.regNo,
        'landRegDateObj':hdate4,
        'landRegDate':res.propertyBean.landRegDate,
        'source':res.propertyBean.source,
        'landGuidelineValue':res.propertyBean.landGuidelineValue,
        'marketValue':res.propertyBean.marketValue,

        'bankName':res.propertyBean.bankName,
        'branchName':res.propertyBean.branchName,
        'ifscCode':res.propertyBean.ifscCode,
        'acName':res.propertyBean.acName,
        'acNumber':res.propertyBean.acNumber,
        'accountUserId':res.propertyBean.accountUserId,
        'password':res.propertyBean.password,
 
        'houseName':res.propertyBean.houseName,
        'houseAddress':res.propertyBean.houseAddress,
        'constructedOn':res.propertyBean.constructedOn,
        'constructedOnObj':hdate5,
        'underLoan':res.propertyBean.underLoan,
        'floor':res.propertyBean.floor,
        'landTaxNo':res.propertyBean.landTaxNo,

        'companyName':res.propertyBean.companyName,
        'companyadd':res.propertyBean.companyadd,
        'contactNo':res.propertyBean.contactNo,
        'companysqft':res.propertyBean.companysqft,
        'ownership':res.propertyBean.ownership,
        'insured':res.propertyBean.insured,
        'ceoName':res.propertyBean.ceoName,
        'conpanytype':res.propertyBean.conpanytype,
        'conpanydep':res.propertyBean.conpanydep,
        'comregOnObj':hdate8,
        'comregOn':res.propertyBean.comregOn,
        'companyNetWorth':res.propertyBean.companyNetWorth,

        'gardenName':res.propertyBean.gardenName,
        'gardenadd':res.propertyBean.gardenadd,
        'gardenSQFT':res.propertyBean.gardenSQFT,
        'gardenlayout':res.propertyBean.gardenlayout,
        'gadregOnObj':hdate9,
        'gadregOn':res.propertyBean.gadregOn,
        'gardenF':res.propertyBean.gardenF,
        'mainten':res.propertyBean.mainten,
        'garTech':res.propertyBean.garTech,

        'swpool':res.propertyBean.swpool,
        'parking':res.propertyBean.parking,
        'noSecrity':res.propertyBean.noSecrity,
        'roomno':res.propertyBean.roomno,

        'aprtmenttype':res.propertyBean.aprtmenttype,
        'apartmentparking':res.propertyBean.apartmentparking,
        'noSecrityAp':res.propertyBean.noSecrityAp,

        'indParking':res.propertyBean.indParking,
        'electricityno':res.propertyBean.electricityno,

        'landlordname':res.propertyBean.landlordname,
        'tenantName1':res.propertyBean.tenantName1,
        'phoneNo':res.propertyBean.phoneNo,
        'propertyAddress':res.propertyBean.propertyAddress,
        'squarefeet':res.propertyBean.squarefeet,
        'lesContract':res.propertyBean.lesContract,
        'lesAmount':res.propertyBean.lesAmount,
        'noticepd':res.propertyBean.noticepd,


        'preOwner':res.propertyBean.preOwner,
        'preOwnername':res.propertyBean.preOwner,
        'transitionDateObj':hdate10,
        'transitionDate':res.propertyBean.transitionDate,
        'propWorth':res.propertyBean.propWorth,
        'ownAddress':res.propertyBean.ownAddress,
        'mailId':res.propertyBean.mailId,
        'payStatus':res.propertyBean.payStatus,
        'payAmt':res.propertyBean.payAmt,
        
        
       
    });
    if (res.sampleDtlDetail != null && res.sampleDtlDetail.length >= 1) {
      let sampleDtlDetailArray = this.docForm.controls.sampleDtl as FormArray;
      sampleDtlDetailArray.clear();
      
      res.sampleDtlDetail.forEach(element => {
        let sampleDtlDetailArray = this.docForm.controls.sampleDtl as FormArray;
        let arraylen = sampleDtlDetailArray.length;
        let hdate3 = this.commonService.getDateObj(element.dateToPayDate);
        let hdateObj = element.dateToPayDate;
        if(element.dateToPayDate==null){
          hdate3 = "";
          hdateObj = "";
        }
        let newUsergroup: FormGroup = this.fb.group({

          advance: [( element.advance)],
          rentAmount: [( element.rentAmount)],
          tenantName:[(element.tenantName)],
          dateToPayDate: [hdateObj],
          dateToPayDateObj:[hdate3],
          minimuminvestment: [ element.minimuminvestment],
          investmentstyle: [ element.investmentstyle],
          expenseratio: [element.expenseratio],
        })
        sampleDtlDetailArray.insert(arraylen, newUsergroup);
      });
    }
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
     let edatedate = this.commonService.getDate(event.target.value);
     if (inputFlag == 'emiDate') {
      this.docForm.patchValue({ emiDate: edatedate });
    }
     
    let adatedate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'dateToPayDate') {
     this.docForm.patchValue({ dateToPayDate: adatedate });
   }


  let ddatedate = this.commonService.getDate(event.target.value);
  if (inputFlag == 'landRegDate') {
   this.docForm.patchValue({ landRegDate: ddatedate });
 }
    
 let fdatedate = this.commonService.getDate(event.target.value);
 if (inputFlag == 'constructedOn') {
  this.docForm.patchValue({ constructedOn: fdatedate });
}

let ldatedate = this.commonService.getDate(event.target.value);
if (inputFlag == 'loanstart') {
 this.docForm.patchValue({ loanstart: ldatedate });
}

let endatedate = this.commonService.getDate(event.target.value);
if (inputFlag == 'loanend') {
 this.docForm.patchValue({ loanend: endatedate });
}

let codatedate = this.commonService.getDate(event.target.value);
if (inputFlag == 'comregOn') {
 this.docForm.patchValue({ comregOn: codatedate });
}

let gadatedate = this.commonService.getDate(event.target.value);
if (inputFlag == 'gadregOn') {
 this.docForm.patchValue({ gadregOn: gadatedate });
}

let transitionDate = this.commonService.getDate(event.target.value);
if (inputFlag == 'transitionDate') {
 this.docForm.patchValue({ transitionDate: transitionDate});
}


   }


   houseFlag(event)
   {
    
      if (event == 'House') {
        this.isHouse = true;
        //house
        this.docForm.controls.houseName.setValidators(Validators.required);
        this.docForm.controls['houseName'].updateValueAndValidity();
        this.docForm.controls.residencialType.setValidators(Validators.required);
        this.docForm.controls['residencialType'].updateValueAndValidity();
        this.docForm.controls.squareFeet.setValidators(Validators.required);
        this.docForm.controls['squareFeet'].updateValueAndValidity();
        this.docForm.controls.constructedOnObj.setValidators(Validators.required);
        this.docForm.controls['constructedOnObj'].updateValueAndValidity();
        this.docForm.controls.floor.setValidators;
        this.docForm.controls['floor'].updateValueAndValidity();
        this.docForm.controls.guidelineValue.setValidators;
        this.docForm.controls['guidelineValue'].updateValueAndValidity();
        this.docForm.controls.currentValue.setValidators(Validators.required);
        this.docForm.controls['currentValue'].updateValueAndValidity();
        this.docForm.controls.depVal.setValidators;
        this.docForm.controls['depVal'].updateValueAndValidity();
        this.docForm.controls.houseTaxNo.setValidators(Validators.required);
        this.docForm.controls['houseTaxNo'].updateValueAndValidity();

                              //land  
                              this.docForm.controls.location.clearValidators();
                              this.docForm.controls['location'].updateValueAndValidity();
                              this.docForm.controls.area.clearValidators();
                              this.docForm.controls['area'].updateValueAndValidity();
                              this.docForm.controls.landType.clearValidators();
                              this.docForm.controls['landType'].updateValueAndValidity();
                              this.docForm.controls.landSqft.clearValidators();
                              this.docForm.controls['landSqft'].updateValueAndValidity();
                              this.docForm.controls.ecAvaliable.clearValidators();
                              this.docForm.controls['ecAvaliable'].updateValueAndValidity();
                              this.docForm.controls.landTaxNo.clearValidators();
                              this.docForm.controls['landTaxNo'].updateValueAndValidity();
                              this.docForm.controls.regNo.clearValidators();
                              this.docForm.controls['regNo'].updateValueAndValidity();
                              this.docForm.controls.landRegDateObj.clearValidators();
                              this.docForm.controls['landRegDateObj'].updateValueAndValidity();
                              this.docForm.controls.landRegDate.clearValidators();
                              this.docForm.controls['landRegDate'].updateValueAndValidity();
                              this.docForm.controls.source.clearValidators();
                              this.docForm.controls['source'].updateValueAndValidity();
                              this.docForm.controls.landGuidelineValue.clearValidators();
                              this.docForm.controls['landGuidelineValue'].updateValueAndValidity();
                              this.docForm.controls.marketValue.clearValidators();
                              this.docForm.controls['marketValue'].updateValueAndValidity();
                              //Company
                              this.docForm.controls.companyName.clearValidators();
                              this.docForm.controls['companyName'].updateValueAndValidity();
                              this.docForm.controls.companyadd.clearValidators();
                              this.docForm.controls['companyadd'].updateValueAndValidity();
                              this.docForm.controls.contactNo.clearValidators();
                              this.docForm.controls['contactNo'].updateValueAndValidity();
                              this.docForm.controls.companysqft.clearValidators();
                              this.docForm.controls['companysqft'].updateValueAndValidity();
                              this.docForm.controls.ownership.clearValidators();
                              this.docForm.controls['ownership'].updateValueAndValidity();
                              this.docForm.controls.insured.clearValidators();
                              this.docForm.controls['insured'].updateValueAndValidity();
                              this.docForm.controls.ceoName.clearValidators();
                              this.docForm.controls['ceoName'].updateValueAndValidity();
                              this.docForm.controls.conpanytype.clearValidators();
                              this.docForm.controls['conpanytype'].updateValueAndValidity(); 
                              this.docForm.controls.comregOnObj.clearValidators();
                              this.docForm.controls['comregOnObj'].updateValueAndValidity();
                              this.docForm.controls.conpanydep.clearValidators();
                              this.docForm.controls['conpanydep'].updateValueAndValidity();
                              this.docForm.controls.companyNetWorth.clearValidators();
                              this.docForm.controls['companyNetWorth'].updateValueAndValidity();
                              //garden
                              this.docForm.controls.gardenName.clearValidators();
                              this.docForm.controls['gardenName'].updateValueAndValidity(); 
                              this.docForm.controls.gardenadd.clearValidators();
                              this.docForm.controls['gardenadd'].updateValueAndValidity();  
                              this.docForm.controls.gardenSQFT.clearValidators();
                              this.docForm.controls['gardenSQFT'].updateValueAndValidity();
                              this.docForm.controls.gardenlayout.clearValidators();
                              this.docForm.controls['gardenlayout'].updateValueAndValidity();
                              this.docForm.controls.gadregOnObj.clearValidators();
                              this.docForm.controls['gadregOnObj'].updateValueAndValidity();
                              this.docForm.controls.gardenF.clearValidators();
        this.docForm.controls['gardenF'].updateValueAndValidity();
        this.docForm.controls.mainten.clearValidators();
        this.docForm.controls['mainten'].updateValueAndValidity();
        this.docForm.controls.garTech.clearValidators();
        this.docForm.controls['garTech'].updateValueAndValidity();
       
        
      } else {
        this.isHouse = false;
 
      }
 
      if (event == 'Land') {
        this.isLand = true;

        //land
        this.docForm.controls.location.setValidators(Validators.required);
        this.docForm.controls['location'].updateValueAndValidity();
        this.docForm.controls.area.setValidators(Validators.required);
        this.docForm.controls['area'].updateValueAndValidity();
        this.docForm.controls.landType.setValidators(Validators.required);
        this.docForm.controls['landType'].updateValueAndValidity();
        this.docForm.controls.landSqft.setValidators(Validators.required);
        this.docForm.controls['landSqft'].updateValueAndValidity();
        this.docForm.controls.ecAvaliable.setValidators(Validators.required);
        this.docForm.controls['ecAvaliable'].updateValueAndValidity();
        this.docForm.controls.landTaxNo.setValidators(Validators.required);
        this.docForm.controls['landTaxNo'].updateValueAndValidity();
        this.docForm.controls.regNo.setValidators(Validators.required);
        this.docForm.controls['regNo'].updateValueAndValidity();
        this.docForm.controls.landRegDateObj.setValidators(Validators.required);
        this.docForm.controls['landRegDateObj'].updateValueAndValidity();
        this.docForm.controls.landRegDate.setValidators(Validators.required);
        this.docForm.controls['landRegDate'].updateValueAndValidity();
        this.docForm.controls.source.setValidators(Validators.required);
        this.docForm.controls['source'].updateValueAndValidity();
        this.docForm.controls.landGuidelineValue.setValidators(Validators.required);
        this.docForm.controls['landGuidelineValue'].updateValueAndValidity();
        this.docForm.controls.marketValue.setValidators(Validators.required);
        this.docForm.controls['marketValue'].updateValueAndValidity();


        //house
        this.docForm.controls.houseName.clearValidators();
        this.docForm.controls['houseName'].updateValueAndValidity();
        this.docForm.controls.residencialType.clearValidators();
        this.docForm.controls['residencialType'].updateValueAndValidity();
        this.docForm.controls.squareFeet.clearValidators();
        this.docForm.controls['squareFeet'].updateValueAndValidity();
        this.docForm.controls.constructedOnObj.clearValidators();
        this.docForm.controls['constructedOnObj'].updateValueAndValidity();
        this.docForm.controls.floor.clearValidators();
        this.docForm.controls['floor'].updateValueAndValidity();
        this.docForm.controls.underLoan.clearValidators();
        this.docForm.controls['underLoan'].updateValueAndValidity();
        this.docForm.controls.guidelineValue.clearValidators();
        this.docForm.controls['guidelineValue'].updateValueAndValidity();
        this.docForm.controls.currentValue.clearValidators();
        this.docForm.controls['currentValue'].updateValueAndValidity();
        this.docForm.controls.depVal.clearValidators();
        this.docForm.controls['depVal'].updateValueAndValidity();
        this.docForm.controls.houseTaxNo.clearValidators();
        this.docForm.controls['houseTaxNo'].updateValueAndValidity();
        //Company
        this.docForm.controls.companyName.clearValidators();
        this.docForm.controls['companyName'].updateValueAndValidity();
        this.docForm.controls.companyadd.clearValidators();
        this.docForm.controls['companyadd'].updateValueAndValidity();
        this.docForm.controls.contactNo.clearValidators();
        this.docForm.controls['contactNo'].updateValueAndValidity();
        this.docForm.controls.companysqft.clearValidators();
        this.docForm.controls['companysqft'].updateValueAndValidity();
        this.docForm.controls.ownership.clearValidators();
        this.docForm.controls['ownership'].updateValueAndValidity();
        this.docForm.controls.insured.clearValidators();
        this.docForm.controls['insured'].updateValueAndValidity();
        this.docForm.controls.ceoName.clearValidators();
        this.docForm.controls['ceoName'].updateValueAndValidity();
        this.docForm.controls.conpanytype.clearValidators();
        this.docForm.controls['conpanytype'].updateValueAndValidity(); 
        this.docForm.controls.comregOnObj.clearValidators();
        this.docForm.controls['comregOnObj'].updateValueAndValidity();
        this.docForm.controls.conpanydep.clearValidators();
        this.docForm.controls['conpanydep'].updateValueAndValidity();
        this.docForm.controls.companyNetWorth.clearValidators();
        this.docForm.controls['companyNetWorth'].updateValueAndValidity();
        //garden
        this.docForm.controls.gardenName.clearValidators();
        this.docForm.controls['gardenName'].updateValueAndValidity(); 
        this.docForm.controls.gardenadd.clearValidators();
        this.docForm.controls['gardenadd'].updateValueAndValidity();  
        this.docForm.controls.gardenSQFT.clearValidators();
        this.docForm.controls['gardenSQFT'].updateValueAndValidity();
        this.docForm.controls.gardenlayout.clearValidators();
        this.docForm.controls['gardenlayout'].updateValueAndValidity();
        this.docForm.controls.gadregOnObj.clearValidators();
        this.docForm.controls['gadregOnObj'].updateValueAndValidity();
        this.docForm.controls.gardenF.clearValidators();
        this.docForm.controls['gardenF'].updateValueAndValidity();
        this.docForm.controls.mainten.clearValidators();
        this.docForm.controls['mainten'].updateValueAndValidity();
        this.docForm.controls.garTech.clearValidators();
        this.docForm.controls['garTech'].updateValueAndValidity();

      } else {
        this.isLand = false;
      }

      if (event == 'Company') {
        this.isCompany = true;
          //company
          this.docForm.controls.companyName.setValidators(Validators.required);
          this.docForm.controls['companyName'].updateValueAndValidity();
          this.docForm.controls.companyadd.setValidators(Validators.required);
          this.docForm.controls['companyadd'].updateValueAndValidity();
          this.docForm.controls.contactNo.setValidators(Validators.required);
          this.docForm.controls['contactNo'].updateValueAndValidity(); 
          this.docForm.controls.companysqft.setValidators;
          this.docForm.controls['companysqft'].updateValueAndValidity();
          this.docForm.controls.ownership.setValidators(Validators.required);
          this.docForm.controls['ownership'].updateValueAndValidity(); 
          this.docForm.controls.insured.setValidators;
          this.docForm.controls['insured'].updateValueAndValidity();
          this.docForm.controls.ceoName.setValidators;
          this.docForm.controls['ceoName'].updateValueAndValidity();
          this.docForm.controls.conpanytype.setValidators;
          this.docForm.controls['conpanytype'].updateValueAndValidity();
          this.docForm.controls.conpanydep.setValidators;
          this.docForm.controls['conpanydep'].updateValueAndValidity();
          this.docForm.controls.comregOnObj.setValidators(Validators.required);
          this.docForm.controls['comregOnObj'].updateValueAndValidity();
          this.docForm.controls.companyNetWorth.setValidators;
          this.docForm.controls['companyNetWorth'].updateValueAndValidity();


        //house
        this.docForm.controls.houseName.clearValidators();
        this.docForm.controls['houseName'].updateValueAndValidity();
        this.docForm.controls.residencialType.clearValidators();
        this.docForm.controls['residencialType'].updateValueAndValidity();
        this.docForm.controls.squareFeet.clearValidators();
        this.docForm.controls['squareFeet'].updateValueAndValidity();
        this.docForm.controls.constructedOnObj.clearValidators();
        this.docForm.controls['constructedOnObj'].updateValueAndValidity();
        this.docForm.controls.floor.clearValidators();
        this.docForm.controls['floor'].updateValueAndValidity();
        this.docForm.controls.underLoan.clearValidators();
        this.docForm.controls['underLoan'].updateValueAndValidity();
        this.docForm.controls.guidelineValue.clearValidators();
        this.docForm.controls['guidelineValue'].updateValueAndValidity();
        this.docForm.controls.currentValue.clearValidators();
        this.docForm.controls['currentValue'].updateValueAndValidity();
        this.docForm.controls.depVal.clearValidators();
        this.docForm.controls['depVal'].updateValueAndValidity();
        this.docForm.controls.houseTaxNo.clearValidators();
        this.docForm.controls['houseTaxNo'].updateValueAndValidity();
        //land  
        this.docForm.controls.location.clearValidators();
        this.docForm.controls['location'].updateValueAndValidity();
        this.docForm.controls.area.clearValidators();
        this.docForm.controls['area'].updateValueAndValidity();
        this.docForm.controls.landType.clearValidators();
        this.docForm.controls['landType'].updateValueAndValidity();
        this.docForm.controls.landSqft.clearValidators();
        this.docForm.controls['landSqft'].updateValueAndValidity();
        this.docForm.controls.ecAvaliable.clearValidators();
        this.docForm.controls['ecAvaliable'].updateValueAndValidity();
        this.docForm.controls.landTaxNo.clearValidators();
        this.docForm.controls['landTaxNo'].updateValueAndValidity();
        this.docForm.controls.regNo.clearValidators();
        this.docForm.controls['regNo'].updateValueAndValidity();
        this.docForm.controls.landRegDateObj.clearValidators();
        this.docForm.controls['landRegDateObj'].updateValueAndValidity();
        this.docForm.controls.landRegDate.clearValidators();
        this.docForm.controls['landRegDate'].updateValueAndValidity();
        this.docForm.controls.source.clearValidators();
        this.docForm.controls['source'].updateValueAndValidity();
        this.docForm.controls.landGuidelineValue.clearValidators();
        this.docForm.controls['landGuidelineValue'].updateValueAndValidity();
        this.docForm.controls.marketValue.clearValidators();
        this.docForm.controls['marketValue'].updateValueAndValidity();
        //garden
        this.docForm.controls.gardenName.clearValidators();
        this.docForm.controls['gardenName'].updateValueAndValidity(); 
        this.docForm.controls.gardenadd.clearValidators();
        this.docForm.controls['gardenadd'].updateValueAndValidity();  
        this.docForm.controls.gardenSQFT.clearValidators();
        this.docForm.controls['gardenSQFT'].updateValueAndValidity();
        this.docForm.controls.gardenlayout.clearValidators();
        this.docForm.controls['gardenlayout'].updateValueAndValidity();
        this.docForm.controls.gadregOnObj.clearValidators();
        this.docForm.controls['gadregOnObj'].updateValueAndValidity();
        this.docForm.controls.gardenF.clearValidators();
        this.docForm.controls['gardenF'].updateValueAndValidity();
        this.docForm.controls.mainten.clearValidators();
        this.docForm.controls['mainten'].updateValueAndValidity();
        this.docForm.controls.garTech.clearValidators();
        this.docForm.controls['garTech'].updateValueAndValidity();

        
        }else {
        this.isCompany = false;

        }

        if (event == 'Garden') {
          this.isGarden = true;
          this.docForm.controls.gardenName.setValidators(Validators.required);
          this.docForm.controls['gardenName'].updateValueAndValidity();
          this.docForm.controls.gardenadd.setValidators(Validators.required);
          this.docForm.controls['gardenadd'].updateValueAndValidity();
          this.docForm.controls.gardenSQFT.setValidators;
          this.docForm.controls['gardenSQFT'].updateValueAndValidity();
          this.docForm.controls.gardenlayout.setValidators;
          this.docForm.controls['gardenlayout'].updateValueAndValidity();
          this.docForm.controls.gadregOnObj.setValidators(Validators.required);
          this.docForm.controls['gadregOnObj'].updateValueAndValidity();
          this.docForm.controls.gardenF.setValidators;
          this.docForm.controls['gardenF'].updateValueAndValidity();
          this.docForm.controls.mainten.setValidators;
          this.docForm.controls['mainten'].updateValueAndValidity();
          this.docForm.controls.garTech.setValidators;
          this.docForm.controls['garTech'].updateValueAndValidity();

          //house
        this.docForm.controls.houseName.clearValidators();
        this.docForm.controls['houseName'].updateValueAndValidity();
        this.docForm.controls.residencialType.clearValidators();
        this.docForm.controls['residencialType'].updateValueAndValidity();
        this.docForm.controls.squareFeet.clearValidators();
        this.docForm.controls['squareFeet'].updateValueAndValidity();
        this.docForm.controls.constructedOnObj.clearValidators();
        this.docForm.controls['constructedOnObj'].updateValueAndValidity();
        this.docForm.controls.floor.clearValidators();
        this.docForm.controls['floor'].updateValueAndValidity();
        this.docForm.controls.underLoan.clearValidators();
        this.docForm.controls['underLoan'].updateValueAndValidity();
        this.docForm.controls.guidelineValue.clearValidators();
        this.docForm.controls['guidelineValue'].updateValueAndValidity();
        this.docForm.controls.currentValue.clearValidators();
        this.docForm.controls['currentValue'].updateValueAndValidity();
        this.docForm.controls.depVal.clearValidators();
        this.docForm.controls['depVal'].updateValueAndValidity();
        this.docForm.controls.houseTaxNo.clearValidators();
        this.docForm.controls['houseTaxNo'].updateValueAndValidity();
        //land  
        this.docForm.controls.location.clearValidators();
        this.docForm.controls['location'].updateValueAndValidity();
        this.docForm.controls.area.clearValidators();
        this.docForm.controls['area'].updateValueAndValidity();
        this.docForm.controls.landType.clearValidators();
        this.docForm.controls['landType'].updateValueAndValidity();
        this.docForm.controls.landSqft.clearValidators();
        this.docForm.controls['landSqft'].updateValueAndValidity();
        this.docForm.controls.ecAvaliable.clearValidators();
        this.docForm.controls['ecAvaliable'].updateValueAndValidity();
        this.docForm.controls.landTaxNo.clearValidators();
        this.docForm.controls['landTaxNo'].updateValueAndValidity();
        this.docForm.controls.regNo.clearValidators();
        this.docForm.controls['regNo'].updateValueAndValidity();
        this.docForm.controls.landRegDateObj.clearValidators();
        this.docForm.controls['landRegDateObj'].updateValueAndValidity();
        this.docForm.controls.landRegDate.clearValidators();
        this.docForm.controls['landRegDate'].updateValueAndValidity();
        this.docForm.controls.source.clearValidators();
        this.docForm.controls['source'].updateValueAndValidity();
        this.docForm.controls.landGuidelineValue.clearValidators();
        this.docForm.controls['landGuidelineValue'].updateValueAndValidity();
        this.docForm.controls.marketValue.clearValidators();
        this.docForm.controls['marketValue'].updateValueAndValidity();
        //Company
        this.docForm.controls.companyName.clearValidators();
        this.docForm.controls['companyName'].updateValueAndValidity();
        this.docForm.controls.companyadd.clearValidators();
        this.docForm.controls['companyadd'].updateValueAndValidity();
        this.docForm.controls.contactNo.clearValidators();
        this.docForm.controls['contactNo'].updateValueAndValidity();
        this.docForm.controls.companysqft.clearValidators();
        this.docForm.controls['companysqft'].updateValueAndValidity();
        this.docForm.controls.ownership.clearValidators();
        this.docForm.controls['ownership'].updateValueAndValidity();
        this.docForm.controls.insured.clearValidators();
        this.docForm.controls['insured'].updateValueAndValidity();
        this.docForm.controls.ceoName.clearValidators();
        this.docForm.controls['ceoName'].updateValueAndValidity();
        this.docForm.controls.conpanytype.clearValidators();
        this.docForm.controls['conpanytype'].updateValueAndValidity(); 
        this.docForm.controls.comregOnObj.clearValidators();
        this.docForm.controls['comregOnObj'].updateValueAndValidity();
        this.docForm.controls.conpanydep.clearValidators();
        this.docForm.controls['conpanydep'].updateValueAndValidity();
        this.docForm.controls.companyNetWorth.clearValidators();
        this.docForm.controls['companyNetWorth'].updateValueAndValidity();
        
        }else {
          this.isGarden = false;
        
        }

   }

   loanFlag(event)
{
  
      if (event == 'YES') {
        this.isLoan = true;
        this.docForm.controls.bankName.setValidators(Validators.required);
        this.docForm.controls['bankName'].updateValueAndValidity();
        this.docForm.controls.ifscCode.setValidators([Validators.required,Validators.pattern('[A-Za-z]{4}[A-Z0-9]{7}')]);
        this.docForm.controls['ifscCode'].updateValueAndValidity();
        this.docForm.controls.loanAmount.setValidators(Validators.required);
        this.docForm.controls['loanAmount'].updateValueAndValidity();
        this.docForm.controls.emiDateObj.setValidators(Validators.required);
        this.docForm.controls['emiDateObj'].updateValueAndValidity();
        
      } else if(event == 'NO'){
        this.isLoan = false;
      
        this.docForm.controls.bankName.clearValidators();
        this.docForm.controls['bankName'].updateValueAndValidity();
        this.docForm.controls.ifscCode.clearValidators();
        this.docForm.controls['ifscCode'].updateValueAndValidity();
        this.docForm.controls.loanAmount.clearValidators();
        this.docForm.controls['loanAmount'].updateValueAndValidity();
        this.docForm.controls.emiDateObj.clearValidators();
        this.docForm.controls['emiDateObj'].updateValueAndValidity();
      }
   }


   rentalFlag(event)
   {
    if (event == 'OwnProperty') {
      this.isOwnProperty = true;
      this.docForm.controls.preOwner.setValidators(Validators.required);
      this.docForm.controls['preOwner'].updateValueAndValidity();
      // this.docForm.controls.preOwnername.setValidators;
      // this.docForm.controls['preOwnername'].updateValueAndValidity();
      this.docForm.controls.transitionDateObj.setValidators(Validators.required);
      this.docForm.controls['transitionDateObj'].updateValueAndValidity();
      this.docForm.controls.transitionDate.setValidators(Validators.required);
      this.docForm.controls['transitionDate'].updateValueAndValidity();
      this.docForm.controls.propWorth.setValidators(Validators.required);
      this.docForm.controls['propWorth'].updateValueAndValidity();
      // this.docForm.controls.ownAddress.setValidators;
      // this.docForm.controls['ownAddress'].updateValueAndValidity();
      // this.docForm.controls.mailId.setValidators;
      // this.docForm.controls['mailId'].updateValueAndValidity();
      // this.docForm.controls.payStatus.setValidators;
      // this.docForm.controls['payStatus'].updateValueAndValidity();
      // this.docForm.controls.payAmt.setValidators;
      // this.docForm.controls['payAmt'].updateValueAndValidity();
      
      
        this.docForm.controls.advance.clearValidators();
        this.docForm.controls['advance'].updateValueAndValidity();
        this.docForm.controls.rentAmount.clearValidators();
        this.docForm.controls['rentAmount'].updateValueAndValidity();
        this.docForm.controls.dateToPayDateObj.clearValidators();
        this.docForm.controls['dateToPayDateObj'].updateValueAndValidity();
        this.docForm.controls.tenantName.clearValidators();
        this.docForm.controls['tenantName'].updateValueAndValidity();
        this.docForm.controls.tenentIdCard.clearValidators();
        this.docForm.controls['tenentIdCard'].updateValueAndValidity();
        this.docForm.controls.mobileNo.clearValidators();
        this.docForm.controls['mobileNo'].updateValueAndValidity();
       
        this.docForm.controls.landlordname.clearValidators();
        this.docForm.controls['landlordname'].updateValueAndValidity();
        this.docForm.controls.tenantName1.clearValidators();
        this.docForm.controls['tenantName1'].updateValueAndValidity();
        this.docForm.controls.phoneNo.clearValidators();
        this.docForm.controls['phoneNo'].updateValueAndValidity();
        this.docForm.controls.propertyAddress.clearValidators();
        this.docForm.controls['propertyAddress'].updateValueAndValidity();
        this.docForm.controls.squarefeet.clearValidators();
        this.docForm.controls['squarefeet'].updateValueAndValidity();
        this.docForm.controls.lesContract.clearValidators();
        this.docForm.controls['lesContract'].updateValueAndValidity();
        this.docForm.controls.lesAmount.clearValidators();
        this.docForm.controls['lesAmount'].updateValueAndValidity();
        this.docForm.controls['noticepd'].updateValueAndValidity(); 
        this.docForm.controls.noticepd.clearValidators();
        // this.docForm.controls.preOwner.clearValidators();
        // this.docForm.controls['preOwner'].updateValueAndValidity();
        this.docForm.controls.preOwnername.clearValidators();
        this.docForm.controls['preOwnername'].updateValueAndValidity();
        // this.docForm.controls.transitionDateObj.clearValidators();
        // this.docForm.controls['transitionDateObj'].updateValueAndValidity();
        // this.docForm.controls.transitionDate.clearValidators();
        // this.docForm.controls['transitionDate'].updateValueAndValidity();
        // this.docForm.controls.propWorth.clearValidators();
        // this.docForm.controls['propWorth'].updateValueAndValidity();
        this.docForm.controls.ownAddress.clearValidators();
        this.docForm.controls['ownAddress'].updateValueAndValidity();
        this.docForm.controls.mailId.clearValidators();
        this.docForm.controls['mailId'].updateValueAndValidity();
        this.docForm.controls.payStatus.clearValidators();
        this.docForm.controls['payStatus'].updateValueAndValidity();
        this.docForm.controls.payAmt.clearValidators();
        this.docForm.controls['payAmt'].updateValueAndValidity();
    }
    else {
      this.isOwnProperty = false;
     

    }
    
      if (event == 'Rent') {
        this.isRent = true;
      
        this.docForm.controls.advance.setValidators(Validators.required);
        this.docForm.controls['advance'].updateValueAndValidity();
        this.docForm.controls.rentAmount.setValidators(Validators.required);
        this.docForm.controls['rentAmount'].updateValueAndValidity();
        this.docForm.controls.dateToPayDateObj.setValidators(Validators.required);
        this.docForm.controls['dateToPayDateObj'].updateValueAndValidity();
        this.docForm.controls.tenantName.setValidators(Validators.required);
        this.docForm.controls['tenantName'].updateValueAndValidity();
        this.docForm.controls.tenentIdCard.setValidators(Validators.required);
        this.docForm.controls['tenentIdCard'].updateValueAndValidity();
        this.docForm.controls.mobileNo.setValidators(Validators.required);
        this.docForm.controls['mobileNo'].updateValueAndValidity();
        
        


        this.docForm.controls.preOwner.clearValidators();
        this.docForm.controls['preOwner'].updateValueAndValidity();
        this.docForm.controls.preOwnername.clearValidators();
        this.docForm.controls['preOwnername'].updateValueAndValidity();
        this.docForm.controls.transitionDateObj.clearValidators();
        this.docForm.controls['transitionDateObj'].updateValueAndValidity();
        this.docForm.controls.transitionDate.clearValidators();
        this.docForm.controls['transitionDate'].updateValueAndValidity();
        this.docForm.controls.propWorth.clearValidators();
        this.docForm.controls['propWorth'].updateValueAndValidity();
        this.docForm.controls.ownAddress.clearValidators();
        this.docForm.controls['ownAddress'].updateValueAndValidity();
        this.docForm.controls.mailId.clearValidators();
        this.docForm.controls['mailId'].updateValueAndValidity();
        this.docForm.controls.payStatus.clearValidators();
        this.docForm.controls['payStatus'].updateValueAndValidity();
        this.docForm.controls.payAmt.clearValidators();
        this.docForm.controls['payAmt'].updateValueAndValidity();
        this.docForm.controls.landlordname.clearValidators();
        this.docForm.controls['landlordname'].updateValueAndValidity();
        this.docForm.controls.tenantName1.clearValidators();
        this.docForm.controls['tenantName1'].updateValueAndValidity();
        this.docForm.controls.phoneNo.clearValidators();
        this.docForm.controls['phoneNo'].updateValueAndValidity();
        this.docForm.controls.propertyAddress.clearValidators();
        this.docForm.controls['propertyAddress'].updateValueAndValidity();
        this.docForm.controls.squarefeet.clearValidators();
        this.docForm.controls['squarefeet'].updateValueAndValidity();
        this.docForm.controls.lesContract.clearValidators();
        this.docForm.controls['lesContract'].updateValueAndValidity();
        this.docForm.controls.lesAmount.clearValidators();
        this.docForm.controls['lesAmount'].updateValueAndValidity();
        this.docForm.controls['noticepd'].updateValueAndValidity(); 
        this.docForm.controls.noticepd.clearValidators();
        
        

      } else {
        this.isRent = false;
        
      }

      if (event == 'Lease') {
        this.isLease = true;
      this.docForm.controls.landlordname.setValidators(Validators.required);
      this.docForm.controls['landlordname'].updateValueAndValidity(); 
      this.docForm.controls.tenantName1.setValidators(Validators.required);
      this.docForm.controls['tenantName1'].updateValueAndValidity();
      this.docForm.controls.phoneNo.setValidators(Validators.required);
      this.docForm.controls['phoneNo'].updateValueAndValidity();
      this.docForm.controls.propertyAddress.setValidators;
      this.docForm.controls['propertyAddress'].updateValueAndValidity(); 
      this.docForm.controls.squarefeet.setValidators;
      this.docForm.controls['squarefeet'].updateValueAndValidity(); 
      this.docForm.controls.lesContract.setValidators(Validators.required);
      this.docForm.controls['lesContract'].updateValueAndValidity(); 
      this.docForm.controls.lesAmount.setValidators(Validators.required);
      this.docForm.controls['lesAmount'].updateValueAndValidity(); 
      this.docForm.controls.noticepd.setValidators;
      this.docForm.controls['noticepd'].updateValueAndValidity(); 

        this.docForm.controls.preOwner.clearValidators();
        this.docForm.controls['preOwner'].updateValueAndValidity();
        this.docForm.controls.preOwnername.clearValidators();
        this.docForm.controls['preOwnername'].updateValueAndValidity();
        this.docForm.controls.transitionDateObj.clearValidators();
        this.docForm.controls['transitionDateObj'].updateValueAndValidity();
        this.docForm.controls.transitionDate.clearValidators();
        this.docForm.controls['transitionDate'].updateValueAndValidity();
        this.docForm.controls.propWorth.clearValidators();
        this.docForm.controls['propWorth'].updateValueAndValidity();
        this.docForm.controls.ownAddress.clearValidators();
        this.docForm.controls['ownAddress'].updateValueAndValidity();
        this.docForm.controls.mailId.clearValidators();
        this.docForm.controls['mailId'].updateValueAndValidity();
        this.docForm.controls.payStatus.clearValidators();
        this.docForm.controls['payStatus'].updateValueAndValidity();
        this.docForm.controls.payAmt.clearValidators();
        this.docForm.controls['payAmt'].updateValueAndValidity();
        // this.docForm.controls.landlordname.clearValidators();
        // this.docForm.controls['landlordname'].updateValueAndValidity();
        // this.docForm.controls.tenantName1.clearValidators();
        // this.docForm.controls['tenantName1'].updateValueAndValidity();
        // this.docForm.controls.phoneNo.clearValidators();
        // this.docForm.controls['phoneNo'].updateValueAndValidity();
        // this.docForm.controls.propertyAddress.clearValidators();
        // this.docForm.controls['propertyAddress'].updateValueAndValidity();
        // this.docForm.controls.squarefeet.clearValidators();
        // this.docForm.controls['squarefeet'].updateValueAndValidity();
        // this.docForm.controls.lesContract.clearValidators();
        // this.docForm.controls['lesContract'].updateValueAndValidity();
        // this.docForm.controls.lesAmount.clearValidators();
        // this.docForm.controls['lesAmount'].updateValueAndValidity();
        // this.docForm.controls['noticepd'].updateValueAndValidity(); 
        // this.docForm.controls.noticepd.clearValidators();
      }
      else {
        this.isLease = false;
        
       
      }
   }
   htypeFlag(event){
    if (event == 'Villa') {
      this.isVilla = true; 

      this.docForm.controls.swpool.setValidators;
      this.docForm.controls['swpool'].updateValueAndValidity();
      this.docForm.controls.parking.setValidators;
      this.docForm.controls['parking'].updateValueAndValidity();
      this.docForm.controls.noSecrity.setValidators;
      this.docForm.controls['noSecrity'].updateValueAndValidity();
      this.docForm.controls.roomno.setValidators;
      this.docForm.controls['roomno'].updateValueAndValidity();  
      
      this.docForm.controls.aprtmenttype.clearValidators();
      this.docForm.controls['aprtmenttype'].updateValueAndValidity();
      this.docForm.controls.apartmentparking.clearValidators();
      this.docForm.controls['apartmentparking'].updateValueAndValidity();
      this.docForm.controls.noSecrityAp.clearValidators();
      this.docForm.controls['noSecrityAp'].updateValueAndValidity();
      this.docForm.controls.indParking.clearValidators();
      this.docForm.controls['indParking'].updateValueAndValidity();
      this.docForm.controls.electricityno.clearValidators();
      this.docForm.controls['electricityno'].updateValueAndValidity(); 

      

    }
    else {
      this.isVilla = false;

    }

    if (event == 'Apartment') {
      this.isApartment = true;

      this.docForm.controls.aprtmenttype.setValidators;
      this.docForm.controls['aprtmenttype'].updateValueAndValidity();
      this.docForm.controls.apartmentparking.setValidators;
      this.docForm.controls['apartmentparking'].updateValueAndValidity();
      this.docForm.controls.noSecrityAp.setValidators;
      this.docForm.controls['noSecrityAp'].updateValueAndValidity();


      this.docForm.controls.swpool.clearValidators();
      this.docForm.controls['swpool'].updateValueAndValidity();
      this.docForm.controls.parking.clearValidators();
      this.docForm.controls['parking'].updateValueAndValidity();
      this.docForm.controls.noSecrity.clearValidators();
      this.docForm.controls['noSecrity'].updateValueAndValidity();
      this.docForm.controls.roomno.clearValidators();
      this.docForm.controls['roomno'].updateValueAndValidity();
      this.docForm.controls.indParking.clearValidators();
      this.docForm.controls['indParking'].updateValueAndValidity();
      this.docForm.controls.electricityno.clearValidators();
      this.docForm.controls['electricityno'].updateValueAndValidity(); 

    }
    else {
      this.isApartment = false;
    }

    if (event == 'Individual') {
      this.isIndividual = true;
      this.docForm.controls.indParking.setValidators;
      this.docForm.controls['indParking'].updateValueAndValidity();
      this.docForm.controls.electricityno.setValidators;
      this.docForm.controls['electricityno'].updateValueAndValidity();

      this.docForm.controls.swpool.clearValidators();
      this.docForm.controls['swpool'].updateValueAndValidity();
      this.docForm.controls.parking.clearValidators();
      this.docForm.controls['parking'].updateValueAndValidity();
      this.docForm.controls.noSecrity.clearValidators();
      this.docForm.controls['noSecrity'].updateValueAndValidity();
      this.docForm.controls.roomno.clearValidators();
      this.docForm.controls['roomno'].updateValueAndValidity();
      this.docForm.controls.aprtmenttype.clearValidators();
      this.docForm.controls['aprtmenttype'].updateValueAndValidity();
      this.docForm.controls.apartmentparking.clearValidators();
      this.docForm.controls['apartmentparking'].updateValueAndValidity();
      this.docForm.controls.noSecrityAp.clearValidators();
      this.docForm.controls['noSecrityAp'].updateValueAndValidity();


      

    }
    else {
      this.isIndividual = false;
    }
   }

   keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
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

  getAutoDebit(event: any) {
    if (event) {
      this.isAutoDebit = true;
    }
    else {
      this.isAutoDebit = false;
    }
  }

  getEcAvaliablet(event: any) {
    if (event) {
      this.isEcAvaliable = true;
    }
    else {
      this.isEcAvaliable = false;
    }
  }
  onAddRow() {
    let dtlArray = this.docForm.controls.sampleDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      advance:[""],
      dateToPayDate:[""],
      dateToPayDateObj:[""],
      rentAmount:[""],
      tenantName:[""],
      tenentIdCard:[""],
      mobileNo:[""],
      loginedUser:[""]        
  
    })
    dtlArray.insert(arraylen,newUsergroup);
  }

  }

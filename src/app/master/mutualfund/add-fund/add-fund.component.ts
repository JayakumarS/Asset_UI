import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup,FormBuilder,Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Fund } from '../mutualfund-model';
import { MutualFundService } from '../mutualfund.service';
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
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.sass'],
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

export class AddFundComponent implements OnInit {
  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  userId:any;
  submitted: boolean;
  fund:Fund;
  brokerFlag:boolean = false;
  hide = true;
  
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
   
    private cmnService:CommonService,private httpService: HttpServiceService,
    private notificationService: NotificationService,
    private mutualFundService: MutualFundService,
    private router:Router,public route: ActivatedRoute, private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,)
     {   
       this.docForm = this.fb.group({
       name:["",[Validators.required]],
       investmentexperience:["",[Validators.required]],
       accountnumber:["",[Validators.required]],
       //tin:["",[Validators.required]],
       tin:["",[Validators.required]],
       fundNo:[""],
       loginedUser: this.tokenStorage.getUserId(),
       fundType:["",[Validators.required]],
       broker:[""],
       brokerName:[""],
       brokerFee:[""],
       chargingFee:[""],
       operatingExpenses:[""],
       investmentMethod:[""],
       modeOfInvestment:[""],
       userName:[""],
       password:[""],
      //email: ['', [Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
       email: ['', Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')],
       totalAssured:[""],
       totalFund:[""],
       assured:[""],
       policyNumber:[""],
       premiumDueAmount:[""],
       premiumDueDate:[""],
       premiumDueDateObj:[""],
       taxCertificate:[""],
       statusInforce:[""],
       planName:[""],
       insurancePurpose:[""],
       premiumStartDate:[""],
       premiumStartDateObj:[""],
       premiumTerm:[""],
       policyTerm:[""],
       maturityDateObj:[""],
       maturityDate:[""],
       registeredNumber:[""],
       communicationAddress:[""],
       permanentAddress:[""],
       grossPremium:[""],
       annualPremium:[""],
       nextPremiumDateObj:[""],
       nextPremiumDate:[""],
       paymentMethod:[""],
       dobObj:[""],
       dob:[""],

      sampleDtl: this.fb.array([
        this.fb.group({
          fundname:["",[Validators.required]],
          inceptiondate:["",[Validators.required]],
          inceptiondateObj:["",[Validators.required]],
          assetclass:[""],
          tickersymbol:["",[Validators.required]],
          minimuminvestment:["",[Validators.required]],
          investmentstyle:[""],
          expenseratio:[""], 
          loginedUser: this.tokenStorage.getUserId(),
         

        })
      ])


    })
  }
  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    if(inputFlag=='inceptiondate'){
        let  sampleDtl= this.docForm.controls.sampleDtl as FormArray;
        sampleDtl.at(index).patchValue({
            inceptiondate: cdate
          });
        this.docForm.patchValue({inceptiondate:cdate});
      } 
      if(inputFlag=='premiumDueDate'){
        this.docForm.patchValue({premiumDueDate:cdate});
      } 
      if(inputFlag=='premiumStartDate'){
        this.docForm.patchValue({premiumStartDate:cdate});
      } 
      if(inputFlag=='maturityDate'){
        this.docForm.patchValue({maturityDate:cdate});
      } 
      if(inputFlag=='nextPremiumDate'){
        this.docForm.patchValue({nextPremiumDate:cdate});
      } 
      if(inputFlag=='dob'){
        this.docForm.patchValue({dob:cdate});
      }
    
    // if (inputFlag == 'inceptiondate') {
    //   this.docForm.patchValue({inceptiondate: cdate });
    // }
    //   let sampleDtl = this.docForm.controls.sampleDtl as FormArray;
    //   sampleDtl.at(index).patchValue({
    //     inceptiondate: cdate});
      
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

  }
  
  onSubmit(){
    this.submitted = true;
    this.fund = this.docForm.value;
 
     if(this.docForm.valid){ 
       this.mutualFundService.savefund(this.fund,this.router,this.notificationService);
     } else {
       this.notificationService.showNotification(
         "snackbar-danger",
         "Please fill all the required details!",
         "top",
         "right");
     }
 
   }

  fetchDetails(fundNo: any) {
    const obj = {
      editId: fundNo
    };
    this.mutualFundService.editfund(obj).subscribe({
      next: (res) => {
        if(res.fundBean.broker!=null && res.fundBean.broker!=undefined){
          this.getBroker(res.fundBean.broker);
        }
        
         this.docForm.patchValue({
        'fundNo':res.fundBean.fundNo,
          'name': res.fundBean.name,
          'investmentexperience': res.fundBean.investmentexperience,
          'accountnumber': res.fundBean.accountnumber,
          'tin':res.fundBean.tin,
          'id' :this.requestId,

          'fundType':res.fundBean.fundType,
          'broker':res.fundBean.broker,
          'brokerName':res.fundBean.brokerName,
          'brokerFee':res.fundBean.brokerFee,
          'chargingFee':res.fundBean.chargingFee,
          'operatingExpenses':res.fundBean.operatingExpenses,
          'investmentMethod':res.fundBean.investmentMethod,
          'modeOfInvestment':res.fundBean.modeOfInvestment,
          'userName':res.fundBean.userName,
          'password':res.fundBean.password,
          'email': res.fundBean.email,
          'totalAssured':res.fundBean.totalAssured,
          'totalFund':res.fundBean.totalFund,
          'assured':res.fundBean.assured,
          'policyNumber':res.fundBean.policyNumber,
          'premiumDueAmount':res.fundBean.premiumDueAmount,
          'premiumStartDate':res.fundBean.premiumStartDate,
          'premiumStartDateObj':res.fundBean.premiumStartDate != null ? this.commonService.getDateObj(res.fundBean.premiumStartDate) : "", 
          'premiumDueDate':res.fundBean.premiumDueDate ,
          'premiumDueDateObj': res.fundBean.premiumDueDate != null ? this.commonService.getDateObj(res.fundBean.premiumDueDate) : "",
          'taxCertificate':res.fundBean.taxCertificate,
          'statusInforce':res.fundBean.statusInforce,
          'planName':res.fundBean.planName,
          'insurancePurpose':res.fundBean.insurancePurpose,
          'premiumTerm':res.fundBean.premiumTerm,
          'policyTerm':res.fundBean.policyTerm,
          'maturityDateObj':res.fundBean.maturityDate != null ? this.commonService.getDateObj(res.fundBean.maturityDate) : "",
          'maturityDate':res.fundBean.maturityDate,
          'registeredNumber':res.fundBean.registeredNumber,
          'communicationAddress':res.fundBean.communicationAddress,
          'permanentAddress':res.fundBean.permanentAddress,
          'grossPremium':res.fundBean.grossPremium,
          'annualPremium':res.fundBean.annualPremium,
          'nextPremiumDateObj':res.fundBean.nextPremiumDate != null ? this.commonService.getDateObj(res.fundBean.nextPremiumDate) : "",
          'nextPremiumDate':res.fundBean.nextPremiumDate,
          'paymentMethod':res.fundBean.paymentMethod,
          'dobObj':res.fundBean.dob != null ? this.commonService.getDateObj(res.fundBean.dob) : "",
          'dob':res.fundBean.dob,
      });
      if (res.sampleDtlDetail != null && res.sampleDtlDetail.length >= 1) {
        let sampleDtlDetailArray = this.docForm.controls.sampleDtl as FormArray;
        sampleDtlDetailArray.clear();
        
        res.sampleDtlDetail.forEach(element => {
          let sampleDtlDetailArray = this.docForm.controls.sampleDtl as FormArray;
          let arraylen = sampleDtlDetailArray.length;
          let cdate = this.commonService.getDateObj(element.inceptiondate);
          let cdateObj = element.inceptiondate;
          if(element.inceptiondate==null){
            cdate = "";
            cdateObj = "";
          }
          let newUsergroup: FormGroup = this.fb.group({

            fundname: [( element.fundname)],
            assetclass: [( element.assetclass)],
            tickersymbol:[(element.tickersymbol)],
            inceptiondate: [cdateObj],
            inceptiondateObj:[cdate],
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
      this.fund = this.docForm.value;
      this.spinner.show();
      this.mutualFundService.updatefund(this.fund,this.router,this.notificationService);
    } 
    else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  reset(){
    if (!this.edit) {
      this.docForm.reset();
      location.reload();
      this.docForm = this.fb.group({
        name:[""],
       investmentexperience:[""],
       accountnumber:[""],
       tin:[""],
       fundNo:[""],
       fundType:[""],
       broker:['No'],
       brokerName:[""],
       brokerFee:[""],
       chargingFee:[""],
       operatingExpenses:[""],
       investmentMethod:[""],
       modeOfInvestment:[""],
       userName:[""],
       password:[""],
       email: [""],
       totalAssured:[""],
       totalFund:[""],
       assured:[""],
       policyNumber:[""],
       premiumDueAmount:[""],
       premiumStartDate:[""],
       premiumStartDateObj:[""],
       premiumDueDate:[""],
       premiumDueDateObj:[""],
       taxCertificate:[""],
       statusInforce:[""],
       planName:[""],
       insurancePurpose:[""],
       premiumTerm:[""],
       policyTerm:[""],
       maturityDateObj:[""],
       maturityDate:[""],
       registeredNumber:[""],
       communicationAddress:[""],
       permanentAddress:[""],
       grossPremium:[""],
       annualPremium:[""],
       nextPremiumDateObj:[""],
       nextPremiumDate:[""],
       paymentMethod:[""],
       dobObj:[""],
       dob:[""],

      sampleDtl: this.fb.array([ 
        this.fb.group({
          fundname:[""],
          inceptiondate:[""],
          inceptiondateObj:[""],
          assetclass:[""],
          tickersymbol:[""],
          minimuminvestment:[""],
          investmentstyle:[""],
          expenseratio:[""], 
        
          loginedUser: this.tokenStorage.getUserId(),
         

        })
      ])
    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }
onCancel(){

  if(window.sessionStorage.getItem("mutualFrom")=="mutual"){
    window.sessionStorage.setItem("mutualFrom","");
    this.router.navigate(['/master/multiple/allMaster/0']);
  }else if(window.sessionStorage.getItem("mutualFrom")=="normal"){
    window.sessionStorage.setItem("mutualFrom","");
    this.router.navigate(['/master/mutualfund/list-fund']);
  } else {
    this.router.navigate(['/master/mutualfund/list-fund']);
  }
}

removeRowSelf(index){
  let dtlArray = this.docForm.controls.sampleDtl as FormArray;
  // if(index != 0){
  dtlArray.removeAt(index);
  // }

}
showNotification(colorName, text, placementFrom, placementAlign) {

}

validateCustomer(event){
  
}

keyPressNumber(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}


keyPressString(event: any) {
  const pattern = /[A-Z, a-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressNumeric(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

keyPressName(event: any) {
  const pattern = /[ a-z A-Z,0-9 ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

onAddRow() {
  let dtlArray = this.docForm.controls.sampleDtl as FormArray;
  let arraylen = dtlArray.length;
  let newUsergroup: FormGroup = this.fb.group({
    fundname:[""],
    assetclass:[""],
    tickersymbol:[""],
    inceptiondate:[""],
    inceptionObj:[""],
    minimuminvestment:[""],
    investmentstyle:[""],
    expenseratio:[""],
    loginedUser:[""]        

  })
  dtlArray.insert(arraylen,newUsergroup);
}

getBroker(input:any){

if(input=='Yes'){
this.brokerFlag=true;
} else if(input=='No'){
  this.brokerFlag=false;
}

}

}

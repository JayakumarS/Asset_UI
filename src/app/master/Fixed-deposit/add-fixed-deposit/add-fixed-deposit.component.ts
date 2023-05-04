import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { SalesInvoiceService } from 'src/app/inventory/sales-invoice/sales-invoice.service';
import { SalesOrderService } from 'src/app/inventory/sales-order/sales-order.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Deposit } from '../fixed-deposit.model';
import { FixedDepositService } from '../fixed-deposit.service';
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
  selector: 'app-add-fixed-deposit',
  templateUrl: './add-fixed-deposit.component.html',
  styleUrls: ['./add-fixed-deposit.component.sass'],
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
export class AddFixedDepositComponent implements OnInit  {

interestRates: any;
docForm: FormGroup;
   deposit:Deposit;
    edit: boolean = false;
    grnBasedMutipleAssetFlag: boolean = false;
    quantityBasedMutipleAssetFlag: boolean = false;
    requestId: any;
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

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private fixedDepositService: FixedDepositService,
    private cmnService:CommonService,
    private httpService: HttpServiceService,
    private salesOrderService: SalesOrderService,
    private router:Router,
    public route: ActivatedRoute,    
    private spinner: NgxSpinnerService,
    public tokenStorage: TokenStorageService,
    ) { 
      this.docForm = this.fb.group({
        bankName:[""],
        investmentTerm:[""],
        autoRenewal:[""],
        // maturitydate:[""],
        // maturitydateobj:[""],
        fdName:[""],
        loginedUser: this.tokenStorage.getUserId(),
       fdendDate:[""],
       fdenddateObj:[""],
       fixeddeposittype:[""],
        fdstartDate:[""],
        fdstartdateObj:[""],
       
        fdRef:[""],
        fdamt:[""],
        penalityAmt:[""],
        ifscCode:[""],
        fdaccountNo:[""],
        interest :[""],     
        applicationNo:[""],
        dueAmount:[""],
        id:[""]
  
      })
  

    }
    getDateString(event, inputFlag, index) {
      let cdate = this.commonService.getDate(event.target.value);
      if (inputFlag == 'maturitydate') {
        this.docForm.patchValue({maturitydate: cdate });
      }
      if (inputFlag == 'fdendDate') {
        this.docForm.patchValue({fdendDate: cdate });
      }
      if (inputFlag == 'fdstartDate') {
        this.docForm.patchValue({fdstartDate: cdate });
      }
      // let OrderDtlArray = this.docForm.controls.OrderDtl as FormArray;
      // OrderDtlArray.at(index).patchValue({duedate: cdate });
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
    this.deposit = this.docForm.value;

    if(this.docForm.valid){ 
      this.fixedDepositService.savefd(this.deposit,this.router,this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }

  }

  fetchDetails(requestId: any): void{
    this.edit=true;
    const obj = {
      editId: requestId
    }
    this.fixedDepositService.editfd(obj).subscribe({
      next: (res) => {
        let hdate = this.cmnService.getDateObj(res.fixeddepositBean.fdendDate);
        let rdate = this.cmnService.getDateObj(res.fixeddepositBean.fdstartDate);
      this.docForm.patchValue({
          'bankName': res.fixeddepositBean.bankName,
          'investmentTerm': res.fixeddepositBean.investmentTerm,
          'autoRenewal': res.fixeddepositBean.autoRenewal,
          'dueAmount': res.fixeddepositBean.dueAmount,
          'fdendDate': res.fixeddepositBean.fdendDate,
          'fdenddateObj' :hdate,
          'fdstartdateObj' :rdate,
          'fixeddeposittype': res.fixeddepositBean.fixeddeposittype,
          'fdstartDate': res.fixeddepositBean.fdstartDate,
          'fdRef': res.fixeddepositBean.fdRef,
          'fdamt': res.fixeddepositBean.fdamt,
          'penalityAmt': res.fixeddepositBean.penalityAmt,
          'ifscCode': res.fixeddepositBean.ifscCode,
          'fdaccountNo': res.fixeddepositBean.fdaccountNo,
          'interest': res.fixeddepositBean.interest,
          'applicationNo': res.fixeddepositBean.applicationNo,
          'fdName': res.fixeddepositBean.fdName,
          'id' :this.requestId
          

      });
    },
    error: (error) => {
    }
  });
  }
  update(){
    this.deposit = this.docForm.value;
    if(this.docForm.valid){
      this.fixedDepositService.updateLine(this.deposit,this.router,this.notificationService);
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
      location.reload();
      this.docForm = this.fb.group({
        bankName:[""],
        investmentTerm:[""],
        autoRenewal:[""],
        // maturitydate:[""],
        // maturitydateobj:[""],
        fdName:[""],
        loginedUser: this.tokenStorage.getUserId(),
       fdendDate:[""],
       fdenddateObj:[""],
       fixeddeposittype:[""],
        fdstartDate:[""],
        fdstartdateObj:[""],
       
        fdRef:[""],
        fdamt:[""],
        penalityAmt:[""],
        ifscCode:[""],
        fdaccountNo:[""],
        interest :[""],     
        applicationNo:[""],
        dueAmount:[""],
        id:[""]
      });
  } else {
    this.fetchDetails(this.requestId);
  }
  }


  onCancel(){
    this. router.navigate(['/master/Fixed-deposit/list-fixed-deposit'])

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
  
  }

  validateCustomer(event){
    
  }
  keyPressString(event: any){
  
  }
  onAddRow(){
    let dtlArray = this.docForm.controls.OrderDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      fixeddepositeamount:[""],
      fixeddepositetype:[""],
      Intrest:[""],
      Dueamount:[""],
      duedate:[""],
      Tax:[""]
    })
    dtlArray.insert(arraylen,newUsergroup);
    
    
    
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
 
  removeRowSelf(index) {
    let dtlArray = this.docForm.controls.OrderDtl as FormArray;
    // if(index != 0){
    dtlArray.removeAt(index);
    // }
  }

    
    }
   
     
    

    
  




    
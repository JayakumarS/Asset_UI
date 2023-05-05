import { Component, OnInit } from '@angular/core';
import { Line } from '../../line-master/line-master.model'; 
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BranchService } from '../../branch/branch.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/common-service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { LoanReceivablesService } from '../loan-receivables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Loan } from '../loan-receivables.model';

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
  selector: 'app-add-receivables',
  templateUrl: './add-receivables.component.html',
  styleUrls: ['./add-receivables.component.sass'],
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
export class AddReceivablesComponent implements OnInit {
  [x: string]: any;
  docForm: FormGroup;
  edit: boolean=false;
 loan:Loan;

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
    


    
  

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
    private loanReceivablesService : LoanReceivablesService,
    private cmnService:CommonService,private httpService: HttpServiceService,
    private notificationService: NotificationService, 
    private router:Router,public route: ActivatedRoute,    private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,)
     {   
       this.docForm = this.fb.group({
       customername:["", [Validators.required]],
       amount:["", [Validators.required]],
       invoicenumber:["", [Validators.required]],
       paymentreference:["", [Validators.required]],
       baddebts:["", [Validators.required]],
       interestreceivable:["", [Validators.required]],
       loginedUser: this.tokenStorage.getUserId(),
       accounttype:["", [Validators.required]],
       paymentstatus:["", [Validators.required]],
       paymentstatusObj:["", [Validators.required]],
       currency:["", [Validators.required]],
       duedate:["", [Validators.required]],
       duedateObj:["", [Validators.required]],
       id:[""]

    })
  }
  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    
    // if (inputFlag == 'duedate') {
    //   let FundDtlArray = this.docForm.controls.FundDtl as FormArray;
    //   FundDtlArray.at(index).patchValue({duedate: cdate});
      
    // }
    if(inputFlag=='duedate'){
      this.docForm.patchValue({duedate:cdate});
    }
  }
    
  ngOnInit(): void {

    this.docForm = this.fb.group({
      customername:["", [Validators.required]],
      amount:["", [Validators.required]],
      invoicenumber:["", [Validators.required]],
      paymentreference:["", [Validators.required]],
      baddebts:["", [Validators.required]],
      interestreceivable:["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),
      accounttype:["", [Validators.required]],
      paymentstatus:["", [Validators.required]],
      paymentstatusObj:["", [Validators.required]],
      currency:["", [Validators.required]],
      duedate:["", [Validators.required]],
      duedateObj:["", [Validators.required]],
      id:[""]

   });

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
      this.loan = this.docForm.value;
    
      if(this.docForm.valid){ 
        this.loanReceivablesService.saveReceivble(this.loan,this.router,this.notificationService);
      } else {
        this.notificationService.showNotification(
          "snackbar-danger",
          "Please fill all the required details!",
          "top",
          "right");
      }
    }

  

  fetchDetails(id:any){
    const obj = {
      editId: id
    }
    this.edit = true;
    
      this.loanReceivablesService.editlist(obj).subscribe({
        next: (res) => {
        this.docForm.patchValue({
            'customername': res.customername,
            'amount':res.amount,
            'invoicenumber': res.invoicenumber,
            'paymentreference':res.paymentreference,
            'baddebts' :res.baddebts,
            'interestreceivable' :res.interestreceivable,
            'accounttype':res.accounttype,
            'paymentstatus':res.paymentstatus,
            'duedateObj':this.commonService.getDateObj(res.duedate),
            'duedate':res.duedate,
            'currency':res.currency,
            'id' :this.requestId,     

        });
      },
      error: (error) => {
      }
      })
      }

    
  

  update(){
    
    this.loan = this.docForm.value;
    
      if(this.docForm.valid){ 
        this.loanReceivablesService.updateReceivble(this.loan,this.router,this.notificationService);
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
        customername:[""],
        amount:[""],
        invoicenumber:[""],
        paymentreference:[""],
        baddebts:[""],
        interestreceivable:[""],
        loginedUser: this.tokenStorage.getUserId(),
        accounttype:[""],
        paymentstatus:[""],
        paymentstatusObj:[""],
        currency:[""],
        duedate:[""],
        duedateObj:[""],
        id:[""]
      });
  } else {
    this.fetchDetails(this.requestId);
  }
  }
  cancel(){
    this.router.navigate(['/master/loan-receivables/list-receivables']);

  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
  
  }

  validateCustomer(event){
    
  }
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  string(event: any) {
    const pattern = /[A-Z a-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressString(event: any){
  
  }
  
 
   

  }

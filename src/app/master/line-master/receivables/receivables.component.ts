import { Component, OnInit } from '@angular/core';
import { Line } from '../line-master.model';
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
import { LineMasterService } from '../line-master.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
};@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.sass']
  
})
export class ReceivablesComponent implements OnInit {
  docForm: FormGroup;
  edit: any;
  lineMaster:Line;
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
  

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
   
    private cmnService:CommonService,private httpService: HttpServiceService,
    private notificationService: NotificationService, private lineMasterService: LineMasterService,
    private router:Router,public route: ActivatedRoute,    private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,)
     {   
       this.docForm = this.fb.group({
       customername:[""],
       amount:[""],
       invoicenumber:[""],
       paymentreference:[""],
       baddebts:[""],
       interestreceivable:[""],
       loginedUser: this.tokenStorage.getUserId(),

      FundDtl: this.fb.array([
        this.fb.group({
          // fundname:[""],
          accounttype:[""],
          paymentstatus:[""],
          paymentstatusObj:[""],
          currency:[""],
          duedate:[""],
          duedateObj:[""],
         

        })
      ])


    })
  }
  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    
    if (inputFlag == 'duedate') {
      let FundDtlArray = this.docForm.controls.FundDtl as FormArray;
      FundDtlArray.at(index).patchValue({duedate: cdate});
      
    }
  }
    
  ngOnInit(): void {
    
    
  }
  
    onSubmit(){
      this.lineMaster = this.docForm.value;
  
      if(this.docForm.valid){ 
        this.lineMasterService.saverece(this.lineMaster,this.router,this.notificationService);
      } else {
        this.notificationService.showNotification(
          "snackbar-danger",
          "Please fill all the required details!",
          "top",
          "right");
      }
  
    }

  

  fetchDetails(id:any){
  
}
  update(){
    


  }
  reset(){
   
  }
  cancel(){
    

  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
  
  }

  validateCustomer(event){
    
  }
  keyPressnumber(event:any){

  }
  keyPressString(event: any){
  
  }
  
  onAddRow() {
    let dtlArray = this.docForm.controls.FundDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      accounttype:[""],
      paymentstatus:[""],
      paymentstatusObj:[""],
      currency:[""],
      duedate :[""],  
      duedateObj:[""] 
  
  
      
  
    
           

    })
    dtlArray.insert(arraylen,newUsergroup);
  }
  removeRowSelf(index) {
      const CustInvoiceDetailBeanArray = this.docForm.controls.FundDtl as FormArray;
      CustInvoiceDetailBeanArray.removeAt(index);
    }
   

  }

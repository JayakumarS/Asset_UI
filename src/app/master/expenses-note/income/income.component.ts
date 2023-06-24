




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


import { NotificationService } from 'src/app/core/service/notification.service';
import { ExpensesNoteService } from '../expenses-note.service';
import { expenese } from '../expenses-note.model';

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
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.sass'],
  
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

export class IncomeComponent implements OnInit {

  currentDate: string;
  currentTime: string;
 
  cashinout: boolean = true;
    docForm: FormGroup;
    expenese:expenese;
   
    edit: boolean = false;
    requestId: any;
   
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
    expenseslist=[];
    totalValue:number;
  // Pagination
  config: {
    id : string,
    
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
    
  };
  branchList: any;
  companyId: string;
  constructor(
    
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private cmnService:CommonService,
    private httpService: HttpServiceService,
    private router:Router,
    private expensesNoteService: ExpensesNoteService,
    public route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
    public tokenStorage: TokenStorageService) {
      const currentDate = new Date();
      const currentTime = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  this.currentDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  this.currentTime = `${currentTime.toLocaleTimeString()} `;


   }



   ngOnInit(): void {

    this.docForm = this.fb.group({
       
    
      cashinout:["INCOME"],
      category:["", [Validators.required]],
      detail:[""],
      amount:["", [Validators.required]],
      currency:[""],
      date:[this.currentDate],
      time:[this.currentTime],
      paymentMethod:["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),

      
    
     
   



    })
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });
    
  }



  

  reset(){

    if (!this.edit) {
      this.docForm.reset();
      location.reload();
      this.docForm = this.fb.group({
    
      
        loginedUser: this.tokenStorage.getUserId(),
        cashinout:[""],
        category:[""],
        detail:[""],
        amount:[""],
        currency:[""],
        time:[""],
        date:[""],
        paymentMethod:[""],
    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }





  onSubmit(){
    this.submitted = true;
   this.expenese = this.docForm.value;
  
    if(this.docForm.valid){ 
      this.expensesNoteService.saveexpenses(this.expenese,this.router,this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }
 

  fetchDetails(requestId: any): void{
   
  }


  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressNumber(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressName(event: any) {
    const pattern = /[A-Z,a-z ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cancel(){
    if(window.sessionStorage.getItem("expensesFrom")=="expenses"){
      window.sessionStorage.setItem("expensesFrom","");
      this.router.navigate(['/master/multiple/allMaster/0']);
    }else if(window.sessionStorage.getItem("expensesFrom")=="normal"){
      window.sessionStorage.setItem("expensesFrom","");
      this.router.navigate(['/master/expenses/list']);
    }

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
  
  }



 

  onUpdate(){
   
  }



  
}
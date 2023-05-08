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
import { JewelleryService } from '../jewellery.service';
import { jewel } from '../jewellery.model';

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
  selector: 'app-add-jewellery-details',
  templateUrl: './add-jewellery-details.component.html',
  styleUrls: ['./add-jewellery-details.component.sass'],
  
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

export class AddJewelleryDetailsComponent implements OnInit {

    docForm: FormGroup;
    jewellery:jewel;

    edit: boolean = false;
    requestId: any;
    //jewelleryDtl: [];
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
    Jewel:jewel;
  branchList: any;
  companyId: string;
  constructor(
    private JewelleryService: JewelleryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private notificationService: NotificationService,
    private cmnService:CommonService,
    private httpService: HttpServiceService,
    private router:Router,
    public route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
    public tokenStorage: TokenStorageService) {
    

   }



   ngOnInit(): void {

    this.docForm = this.fb.group({
       
      caseinhand:[""],
      cashatbank:["", [Validators.required]],
      cloan:["", [Validators.required]],
      cdate:["", [Validators.required]],
      cdateObj:["", [Validators.required]],
      jdate:["", [Validators.required]],
      jdateObj:["", [Validators.required]],
      type:["", [Validators.required]],
      material:["", [Validators.required]],
      weight:["", [Validators.required]],
      price:[""],
      loan:["", [Validators.required]],
      id:[""],
     

      loginedUser: this.tokenStorage.getUserId(),
      

      // jewelleryDtl: this.fb.array([
      //   this.fb.group({
      //     jdate:[""],
      //     jdateObj:[""],
      //     type:[""],
      //     weight:[""],
      //     price:[""],
      //     loan:[""],
      //    })
      // ])


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












  
   getDateString(event, inputFlag, index) {
    let cdatedate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'cdate') {
      this.docForm.patchValue({ cdate: cdatedate });
    }
    
    if (inputFlag == 'jdate') {
      this.docForm.patchValue({ jdate: cdatedate });
    // if (inputFlag == 'jdate') {
    //   let jewelleryDtlArray = this.docForm.controls.jewelleryDtl as FormArray;
    //   jewelleryDtlArray.at(index).patchValue({ jdate: cdatedate });
    // }
    }
  }



  // getDateString1(event, inputFlag, index) {
  //   let cdate = this.commonService.getDate(event.target.value);
  //   if (inputFlag == 'poDate') {
  //     this.docForm.patchValue({ poDate: cdate });
  //   }
  //   if (inputFlag == 'edd') {
  //     let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
  //     purchaseOrderDetailArray.at(index).patchValue({
  //       edd: cdate
  //     });
  //   }
  // }
  // ngOnInit(): void {
  //   this.docForm = this.fb.group({
  //     caseinhand:[""],
  //       cashatbank:[""],
  //       cloan:[""],
  //       cdate:[""],
  //       cdateObj:[""],
  
  //       OrderDtl: this.fb.array([
  //         this.fb.group({
  //           type:["",[Validators.required]],
  //           weight:[""],
  //           price:[""],
  //           loan:[""],
  //           jdate:[""],
  //           jdateObj:[""]
  //         })
  //       ])
  //   });
  // }
 
  // onSubmit()
  // {
  //   this.jewellery = this.docForm.value;

  //    if(this.docForm.valid){ 
  //     this.JewelleryService.savejewellery(this.jewellery,this.router,this.notificationService);
  //   } else {
  //     this.notificationService.showNotification(
  //       "snackbar-danger",
  //       "Please fill all the required details!",
  //       "top",
  //       "right");
  //   }

//  }



onSubmit(){
  this.jewellery = this.docForm.value;

  if(this.docForm.valid){ 
    this.JewelleryService.savejewellery(this.jewellery,this.router,this.notificationService);
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
    // next: (res) => {
    // let hdate = this.cmnService.getDateObj(res.JewelBean.cdate);
    // this.customer= res.JewelBean.customer;
    this.JewelleryService.editJewel(obj).subscribe({
      next: (res) => {
        let hdate = this.cmnService.getDateObj(res.jewelBean.cdate);
        let rdate = this.cmnService.getDateObj(res.jewelBean.jdate);
      this.docForm.patchValue({
          'caseinhand': res.jewelBean.caseinhand,
          'cashatbank': res.jewelBean.cashatbank,
          'cloan': res.jewelBean.cloan,
          'cdate': res.jewelBean.cdate,
          'jdate': res.jewelBean.jdate,
          'cdateObj':hdate,
          'jdateObj': rdate,
          'type': res.jewelBean.type,
          'material': res.jewelBean.material,
          'weight': res.jewelBean.weight,
          'price': res.jewelBean.price,
          'loan': res.jewelBean.loan,
          'id' :this.requestId
      

      
      });
    },
    error: (error) => {
    }
  });
  
}
  reset(){
    if (!this.edit) {
      location.reload();
      this.docForm.reset();
      this.docForm = this.fb.group({
        caseinhand:[""],
        cashatbank:[""],
        cloan:[""],
        cdate:[""],
        cdateObj:[""],
        jdate:[""],
        jdateObj:[""],
        type:[""],
        material:[""],
        weight:[""],
        price:[""],
        loan:[""]
      });
  } else {
    this.fetchDetails(this.requestId);
  }
  }


  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 cancel(){
  if(window.sessionStorage.getItem("jewelFrom")=="jewel"){
    window.sessionStorage.setItem("jewelFrom","");
    this.router.navigate(['/master/multiple/allMaster/0']);
  }else if(window.sessionStorage.getItem("jewelFrom")=="normal"){
    window.sessionStorage.setItem("jewelFrom","");
    this.router.navigate(['/master/jewellery/list-jewellery-details']);
  }

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
  
  }


  onAddRow(){
    let dtlArray = this.docForm.controls.jewelleryDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      type:[""],
      weight:[""],
      price:[""],
      loan:[""],
      jdate:[""]
    })
    dtlArray.insert(arraylen,newUsergroup);
  
  }
  
  removeRowSelf(index) {
    let dtlArray = this.docForm.controls.jewelleryDtl as FormArray;
    // if(index != 0){
    dtlArray.removeAt(index);
    // }
  }

  onUpdate(){
    this.Jewel = this.docForm.value;
    if(this.docForm.valid){
      this.JewelleryService.updateJewel(this.Jewel,this.router,this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

}
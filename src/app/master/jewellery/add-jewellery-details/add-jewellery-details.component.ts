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
    isGIFT: boolean = false;
    LOCKER: boolean = true ;
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
       
    
      cdate:[""],
      cdateObj:[""],
      type:[""],
      material:["", [Validators.required]],
      weight:["", [Validators.required]],
      id:[""],
      loginedUser: this.tokenStorage.getUserId(),

      //extra
      selforgift:["SELF"],
      location:[""],
      lockerInHand:["LOCKER"],
      lockerRent:[""],
      lockerSize:[""],
      bankName:[""],
      lockerNo:[""],
      currentValue:["", [Validators.required]],
      specification:[""],
      description:[""],
      noOfPiece:["", [Validators.required]],
      purchasedfrom:["", [Validators.required]],
      purchaseValue:[""],
      jewelName:["", [Validators.required]],
      jewelcolour:[""],
      gemstones:[""],
      caratweight:[""]
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

  getOwner(check: any) {
    if (check == 'GIFT') {
      this.isGIFT = true;
    } else {
      this.isGIFT = false;
    }
 
  
  }
 
  
  getLOCKER(check: any) {
    if (check == 'LOCKER') {
      this.LOCKER = true;
      this.docForm.controls.bankName.setValidators(Validators.required);
      this.docForm.controls.lockerNo.setValidators(Validators.required);
      this.docForm.controls.lockerRent.setValidators(Validators.required);

    } else if(check == 'IN HAND') {
      this.LOCKER = false;
    } else{
      this.LOCKER = false;
    }

   

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

        this.getLOCKER(res.jewelBean.lockerInHand);

      this.docForm.patchValue({
          'cdate': res.jewelBean.cdate,
          'jdate': res.jewelBean.jdate,
          
          'cdateObj':res.jewelBean.cdate != null ? this.commonService.getDateObj(res.jewelBean.cdate) : "",


          // 'cdateObj':hdate,
          'jdateObj': rdate,
          'type': res.jewelBean.type,
          'material': res.jewelBean.material,
          'weight': res.jewelBean.weight,

          'selforgift': res.jewelBean.selforgift,
          'location': res.jewelBean.location,
          'lockerInHand': res.jewelBean.lockerInHand,
          'lockerRent': res.jewelBean.lockerRent,
          'lockerSize': res.jewelBean.lockerSize,
          'bankName': res.jewelBean.bankName,
          'lockerNo': res.jewelBean.lockerNo,
          'currentValue': res.jewelBean.currentValue,
          'specification': res.jewelBean.specification,
          'description': res.jewelBean.description,
          'noOfPiece': res.jewelBean.noOfPiece,
          'purchasedfrom': res.jewelBean.purchasedfrom,
          'purchaseValue': res.jewelBean.purchaseValue,
          'jewelName': res.jewelBean.jewelName,
          'jewelcolour': res.jewelBean.jewelcolour,
          'gemstones': res.jewelBean.gemstones,
          'caratweight': res.jewelBean.caratweight,
        
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
        loan:[""],
        gemstones:[""],
        caratweight:[""]
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
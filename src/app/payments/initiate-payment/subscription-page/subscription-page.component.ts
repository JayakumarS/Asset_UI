import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SubscriptionPageService } from '../subscription-page.service';
import { Payments } from '../../payments.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrialComponentComponent } from 'src/app/admin/dashboard/main/trial-component/trial-component.component';


@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.sass'],providers: [SubscriptionPageService]
})
export class SubscriptionPageComponent implements OnInit {
  
  currencyList = [
    {id: 'INR', text: 'INR'},
    {id: 'USD', text: 'USD'},
    {id: 'AED', text: 'AED'},
    {id: 'MYR', text: 'MYR'},
    {id: 'SGD', text: 'SGD'},
  ];
  stdAmt:string;
  busAmt:string;
  preAmt:string;
  extAmt:string;
  refPercent : number;
  docForm:FormGroup;
  users : any;
  loading: boolean = false;
  
  pay ={
    amount:0,
    currency:'INR',
    receipt:'ASSETCHEK',
    exAmount:0,
  };
  subType: any;
  userId : String;
  audcurrency : any;
  strikeOutFlag: boolean = false;
  oldstdAmt: string;
  roleId:any
  subs:any
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public subscriptionPageService: SubscriptionPageService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,    
    private spinner: NgxSpinnerService,
    private tokenStorage: TokenStorageService
    ) { 
    
    this.docForm = this.fb.group({
      currency:["INR"],
      noOfUsers:["", [Validators.required]],
      promotionCode:[""]
    });
  
  }

  ngOnInit(): void {
    this.roleId = this.tokenStorage.getRoleId()
    this.getNoOfUsers();
    this.loading = true;
  }

  //no of users
  getNoOfUsers(){
    this.userId = this.tokenStorage.getUserId();
    this.httpService.get<any>(this.subscriptionPageService.getNoOfUsers+"?userId="+this.userId).subscribe(res => {
      if(res.success){
        this.loading = false;
        this.docForm.patchValue({noOfUsers: res.noOfUsers})
        this.docForm.patchValue({currency: res.audCurrency})
        this.users = res.noOfUsers;
        this.audcurrency = res.audCurrency;

        if (this.users >0){
          this.changeCurrency(this.audcurrency);
        }else {
          this.users = 1;
          this.docForm.patchValue({noOfUsers: 1});
          this.changeCurrency(this.audcurrency);
        }

        this.oldstdAmt=this.stdAmt;
        //res.audCurrency;

    //     //multiply the no of users with amount
    // let num = 50000 * this.users;
    // this.stdAmt = "₹"+num.toString();
    // let num1 = 1000 * this.users;
    // this.busAmt = "₹"+ num1.toString();
    // let num2 = 5000 * this.users;
    // this.preAmt = "₹"+ num2;
    // let num3 = 10000 * this.users;
    // this.extAmt = "₹"+ num3.toString();
      }
      
    });

  }

  changeCurrency(currency){
    if(currency=="INR"){
      if (this.refPercent != 0 && this.refPercent != undefined){
        let innum = 50000 * this.users;
        let num = innum - (innum * this.refPercent);
        this.stdAmt = "₹"+num.toString();
      }else {
        let innum = 50000 * this.users;
        this.stdAmt = "₹" + innum.toString();
    }
      this.busAmt = "₹1000";
      this.preAmt = "₹5000";
      this.extAmt = "₹10000";
    }else if(currency=="USD"){
      if (this.refPercent != 0 && this.refPercent != undefined){
        let innum = 10 * this.users;
        let num = innum - (innum * this.refPercent);
        this.stdAmt = "$"+num.toString();
        } else {
          let innum = 10 * this.users;
          this.stdAmt = "$" + innum.toString();
      }
      this.busAmt = "$100";
      this.preAmt = "$200";
      this.extAmt = "$1000";
    }else if(currency=="AED"){
      if (this.refPercent != 0 && this.refPercent != undefined){
        let innum = 10 * this.users;
        let num = innum - (innum * this.refPercent);
        this.stdAmt = "AED "+num.toString();
        }else {
          let innum = 10 * this.users;
          this.stdAmt = "AED" + innum.toString();
        }      
      this.busAmt = "AED 400";
      this.preAmt = "AED 800";
      this.extAmt = "AED 3800";
    }else if(currency=="MYR"){
      if (this.refPercent != 0 && this.refPercent != undefined){
        let innum = 10 * this.users;
        let num = innum - (innum * this.refPercent);
        this.stdAmt = "RM"+num.toString();
        }else {
          let innum = 10 * this.users;
          this.stdAmt = "RM" + innum.toString();
        }
      this.busAmt = "RM400";
      this.preAmt = "RM800";
      this.extAmt = "RM3800";
    }else if(currency=="SGD"){
      if (this.refPercent != 0 && this.refPercent != undefined){
        let innum = 10 * this.users;
        let num = innum - (innum * this.refPercent);
        this.stdAmt = "S$"+num.toString();
        }else {
          let innum = 10 * this.users;
          this.stdAmt = "S$"+innum.toString();
        }
      this.busAmt = "S$120";
      this.preAmt = "S$240";
      this.extAmt = "S$1200";
    }
  }

  initiatePaymentModule(type){
    
    if(this.docForm.valid){
          this.subType = type;
        
          if(type =='standard'){
            this.pay.amount = 50000 * this.users;
          }
          else if(type=='Professional'){
            this.pay.amount = 499900 * this.users;
          }
          else if(type=='Enterprice'){
            this.pay.amount = 999900 * this.users;
          }
          else if(type=='Ultimate'){
            this.pay.amount = 7499900 * this.users;
          }
    
    
          this.pay ={
          amount:0,
          currency:'USD',
          receipt:'ASSETCHEK',exAmount:0,
      }
      

        
          if(type =='standard'){
            this.pay.amount = 50000 * this.users;
          }
          else if(type=='Professional'){
            this.pay.amount = 10000 * this.users;
          }
          else if(type=='Enterprice'){
            this.pay.amount = 20000 * this.users;
          }
          else if(type=='Ultimate'){
            this.pay.amount = 100000 * this.users;
          }
    
          this.pay ={
          amount:0,
          currency:'AED',
          receipt:'ASSETCHEK',exAmount:0,
      }
      

        
          if(type =='standard'){
            this.pay.amount = 50000 * this.users;
          }
          else if(type=='Professional'){
            this.pay.amount = 40000 * this.users;
          }
          else if(type=='Enterprice'){
            this.pay.amount = 80000 * this.users;
          }
          else if(type=='Ultimate'){
            this.pay.amount = 380000 * this.users;
          }
    
    
          this.pay ={
          amount:0,
          currency:'MYR',
          receipt:'ASSETCHEK',exAmount:0,
      }
      

        
          if(type =='standard'){
            this.pay.amount = 50000 * this.users;
          }
          else if(type=='Professional'){
            this.pay.amount = 40000 * this.users;
          }
          else if(type=='Enterprice'){
            this.pay.amount = 80000 * this.users;
          }
          else if(type=='Ultimate'){
            this.pay.amount = 380000 * this.users;
          }
    
    
          this.pay ={
          amount:0,
          currency:'SGD',
          receipt:'ASSETCHEK',
          exAmount:0,
      }
      

        
          if(type =='standard'){
            this.pay.amount = 50000 * this.users;
          }
          else if(type=='Professional'){
            this.pay.amount = 12000 * this.users;
          }
          else if(type=='Enterprice'){
            this.pay.amount = 24000 * this.users;
          }
          else if(type=='Ultimate'){
            this.pay.amount = 120000 * this.users;
          }
          
    
          this.pay.currency = this.docForm.get("currency").value; 
          this.pay.receipt = 'ASSETCHEK';
    
    if(type =='standard'){
      if(this.docForm.get("currency").value =='INR'){
        this.pay.amount = 50000 * this.users *100;
        this.pay.exAmount = 50000 * this.users;
        }else if (this.docForm.get("currency").value =='USD'){
          this.pay.amount = 1000 * this.users;
          this.pay.exAmount =1000 * this.users;
        }else if (this.docForm.get("currency").value == 'AED'){
          this.pay.amount = 1000 * this.users;
          this.pay.exAmount = 1000 * this.users;
        }else if (this.docForm.get("currency").value == 'MYR'){
          this.pay.amount = 1000 * this.users;
          this.pay.exAmount = 1000 * this.users;
        }else if (this.docForm.get("currency").value == 'SGD'){
          this.pay.amount = 1000 * this.users;
          this.pay.exAmount = 1000 * this.users;
        }
    }
      else if(type=='Professional'){
        if(this.docForm.get("currency").value =='INR'){
          this.pay.amount = 1000*100 * this.users;
          this.pay.exAmount=  1000 * this.users;
        }else if (this.docForm.get("currency").value =='USD'){
          this.pay.amount = 100*100 * this.users;
          this.pay.exAmount=  100 * this.users;
        }else if (this.docForm.get("currency").value == 'AED'){
          this.pay.amount = 40000 * this.users;
          this.pay.exAmount=  40000 * this.users;
        }else if (this.docForm.get("currency").value == 'MYR'){
          this.pay.amount = 40000 * this.users;
          this.pay.exAmount=  40000 * this.users;
        }else if (this.docForm.get("currency").value == 'SGD'){
          this.pay.amount = 12000 * this.users;
          this.pay.exAmount=  12000 * this.users;
        }
      }
      else if(type=='Enterprice'){
        if(this.docForm.get("currency").value =='INR'){
          this.pay.amount = 50000*100 * this.users;
          this.pay.exAmount=50000 * this.users;
        }else if (this.docForm.get("currency").value =='USD'){
          this.pay.amount = 20000 * this.users;
          this.pay.exAmount= 20000 * this.users;
        }else if (this.docForm.get("currency").value == 'AED'){
          this.pay.amount = 80000 * this.users;
          this.pay.exAmount=  80000 * this.users;
        }else if (this.docForm.get("currency").value == 'MYR'){
          this.pay.amount = 80000 * this.users;
          this.pay.exAmount= 80000 * this.users;
        }else if (this.docForm.get("currency").value == 'SGD'){
          this.pay.amount =  24000 * this.users;
          this.pay.exAmount= 24000 * this.users;
        }
      }
      else if(type=='Ultimate'){
        if(this.docForm.get("currency").value =='INR'){
          this.pay.amount = 10000*100 * this.users;
          this.pay.exAmount= 10000 * this.users;
        }else if (this.docForm.get("currency").value =='USD'){
          this.pay.amount =  100000 * this.users;
          this.pay.exAmount= 100000 * this.users;
        }else if (this.docForm.get("currency").value == 'AED'){
          this.pay.amount = 380000 * this.users;
          this.pay.exAmount= 380000 * this.users;
        }else if (this.docForm.get("currency").value == 'MYR'){
          this.pay.amount = 380000 * this.users;
          this.pay.exAmount=380000 * this.users;
        }else if (this.docForm.get("currency").value == 'SGD'){
          this.pay.amount = 120000 * this.users;
          this.pay.exAmount= 120000 * this.users;
        }
      }
      
      if (this.refPercent != 0 && this.refPercent != undefined){
        let num = this.pay.amount - (this.pay.amount * this.refPercent);
        this.pay.amount = num;

        let exnum = this.pay.exAmount - (this.pay.exAmount * this.refPercent);
        this.pay.exAmount = exnum;
        }
        
      this.spinner.show();
      this.httpService.post<any>(this.subscriptionPageService.initiatePaymentUrl, this.pay).subscribe(data => {
      this.spinner.hide();

        this.payWithRazor(data);
        },
        (err: HttpErrorResponse) => {
          
      });

    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill No.of Users",
        "top",
        "right"
      );
    }



  }




  payWithRazor(data) {
    
    var amt = this.pay.amount * 100;
   
    const options: any = {
      key: 'rzp_test_VTDYOGZm0Ivt3N', //For Test
     // key: 'rzp_live_ABLgrHfsy2Fhkb', //For Live
      amount: this.pay.amount.toString(), // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Asset Chek', // company name or product name
      description: 'Asset Chek Payment Transaction',  // product description
      image: '/assets/images/AssetChekLogo.png', // company logo or product image
      order_id: data.orderid, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      
      this.showNotification(
        "snackbar-success",
        "Your transaction is successful, "+response.razorpay_payment_id,
        "top",
        "right"
      );
      
      // call your backend api to verify payment signature & capture transaction
      let payhistory ={
        orderid:response.razorpay_order_id,
        paymentid:response.razorpay_payment_id,
        signature:response.razorpay_signature,
        subscriptype:this.subType,
        subscripamt:this.pay.exAmount.toString(),
        userId:this.tokenStorage.getUserId(),
        firstName:this.tokenStorage.getUsername(),
        // noOfUsers:this.docForm.get("noOfUsers").value,
        promoCode:this.docForm.get("promotionCode").value,
        currency:this.docForm.get("currency").value,    
    }
    
    this.savePaymentHistory(payhistory);
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
      
    });
    const rzp = new this.subscriptionPageService.nativeWindow.Razorpay(options);
    rzp.open();
  }

  verifyPromoCode(){

    var promoCode = this.docForm.controls.promotionCode.value;
    
    if(promoCode!=""){
      
      this.httpService.get<any>(this.subscriptionPageService.verifyPromoCodeUrl+"?promoCode="+promoCode+"&userId="+this.userId).subscribe(data => {
          if(data.success){
            
            //get promocode percentage  
            this.httpService.get<any>(this.subscriptionPageService.getPromoCodePercent+"?promoCode="+promoCode+"&userId="+this.userId).subscribe(res => {
              if(res.success){
                this.refPercent = res.percentage/100;
                this.changeCurrency(this.audcurrency);
              }
         
            this.showNotification(
              "snackbar-success",
              "Promocode is valid",
              "top",
              "right"
            );
            this.strikeOutFlag=true;

          });
          }else{
            this.docForm.patchValue({
              promotionCode: [""],
             
            })
            this.showNotification(
              "snackbar-danger",
              data.message,
              "top",
              "right"
            );
            this.strikeOutFlag=false;
          }
      },
        (err: HttpErrorResponse) => {
          
      });

    }
    
  }


  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 300,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  savePaymentHistory(payemntObj){
    this.spinner.show();
    this.httpService.post<any>(this.subscriptionPageService.paymentHistoryUrl, payemntObj).subscribe(data => {
      this.spinner.hide();
      if (data.isSuccess == true){
  
          this.logout();
        
      }
    },
      (err: HttpErrorResponse) => {
        
    });
  }


  logout() {   

      this.tokenStorage.signOut();
      localStorage.removeItem("currentUser");
     // this.router.navigate(['/authentication/signin']);
      window.location.href="/authentication/signin"
 
   }

  keyPressNumber(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNameNumber(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  Trailpopup(){
    
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(TrialComponentComponent, {
      height: "270px",
      width: "400px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {
        const obj = {  userId: this.tokenStorage.getUserId(),
          userName: this.tokenStorage.getUsername(),
          role_Id: this.tokenStorage.getRoleId()
        
        }
        this.subscriptionPageService.updateroleNew(obj).subscribe((res: any) => {
          this.showNotification(
            "snackbar-success",
            "login again to use Trial account...!!!",
            "bottom",
            "center"
          );
          this.logout();
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );


      } else{
      }


    });
  }
  
}

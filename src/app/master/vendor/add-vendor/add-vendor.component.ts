// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-vendor',
//   templateUrl: './add-vendor.component.html',
//   styleUrls: ['./add-vendor.component.sass']
// })
// export class AddVendorComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VendorService } from '../vendor.service';
import { Commodity } from '../vendor-model';
import { CommodityResultBean } from '../vendor-result-bean';
import { NotificationService } from 'src/app/core/service/notification.service';


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.sass']
})



export class AddVendorComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  commodityMaster : Commodity;
  requestId: number;
  countryList:[];
  edit:boolean=false;
  currencyList: [];
  constructor(private fb: FormBuilder,private router:Router,
    public route: ActivatedRoute,private snackBar: MatSnackBar,
    private vendorService: VendorService,private httpService: HttpServiceService, private notificationService: NotificationService) {
    this.docForm = this.fb.group({
      
      //AssetChek
      vendorId:[""],
      vendorName:["",[Validators.required]],
      vendorShortName:["",[Validators.required]],
      vendorAddress:["",[Validators.required]],
      vendorCountry:["",[Validators.required]],
      vendorEmail:['', [Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      currency:["",[Validators.required]],
      vendorContact:["",[Validators.required]],
      vendorPhoneNumber:["",[Validators.required]],

      

    });
    }


   ngOnInit(): void {

    this.docForm = this.fb.group({
      
      //AssetChek
      vendorId:[""],
      vendorName:["",[Validators.required]],
      vendorShortName:["",[Validators.required]],
      vendorAddress:["",[Validators.required]],
      vendorCountry:["",[Validators.required]],
      vendorEmail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      currency:["",[Validators.required]],
      vendorContact:["",[Validators.required]],
      vendorPhoneNumber:["",[Validators.required]],



    });
    this.httpService.get<CommodityResultBean>(this.vendorService.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.currencyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.httpService.get<CommodityResultBean>(this.vendorService.countryListUrl).subscribe(
      (data) => {
        this.countryList = data.countryList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
  }

  onsubmit(){
    
      if(this.docForm.valid){
    this.commodityMaster = this.docForm.value;
    console.log(this.commodityMaster);
    this.vendorService.addCommodity(this.commodityMaster,this.router,this.notificationService);
    
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  
  }

 


  fetchDetails(vendorId: any): void {
    const obj = {
      editId: parseInt(vendorId)
    }
    this.vendorService.editVonder(obj).subscribe({
      next: (res) => {
        this.httpService.get<CommodityResultBean>(this.vendorService.countryListUrl).subscribe(
          (data) => {
            this.countryList = data.countryList;
          },
        )
      this.docForm.patchValue({
        'vendorName': res.venderBean.vendorName,
        'vendorCountry': res.venderBean.vendorCountry,
        'currency': parseInt(res.venderBean.currency),
        'vendorPhoneNumber': res.venderBean.vendorPhoneNumber,
        'vendorShortName' : res.venderBean.vendorShortName,
        'vendorAddress': res.venderBean.vendorAddress,
        'vendorEmail':res.venderBean.vendorEmail,
        'vendorId': res.venderBean.vendorId,
        'vendorContact':res.venderBean.vendorContact

     });
    },
    
   });
}

keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  update(){
    this.commodityMaster = this.docForm.value;
    this.vendorService.updateCommodity(this.commodityMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/vendor/listVendor']);

  }

  onCancel(){
    this.router.navigate(['/master/vendor/listVendor']);
  
  }
  
  reset(){
    this.docForm = this.fb.group({
      //AssetChek
      vendorName:[""],
      vendorShortName:[""],
      vendorAddress:[""],
      vendorCountry:[""],
      vendorEmail:[""],
      currency:[""],
      vendorContact:[""],
      vendorPhoneNumber:[""]
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // validateEmail(event){
  //   this.httpService.get<any>(this.authService.validateEmailUrl+ "?tableName=" +"user_details"+"&columnName="+"email_id"+"&columnValue="+event).subscribe((res: any) => {
  //     if(res){
  //       this.authForm.controls['emailId'].setErrors({ emailPwd: true });
  //     }else{
  //       this.authForm.controls['emailId'].setErrors(null);
  //     }
  //   });
  // }

   //validate common mail 

//    commonMailValidator(control) {
//   const commonMailDomains = ['/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/'];
//    const email = control;
//    const domain = email.split('@')[1];
//    if (commonMailDomains.includes(domain)) {
//      this.docForm.patchValue({
//        'emailId':""
//      })
//      this.docForm.controls['emailId'].setErrors({ checkMail: true });
//    }else{
//      this.docForm.controls['emailId'].setErrors(null);
//    }
  
//  }



}

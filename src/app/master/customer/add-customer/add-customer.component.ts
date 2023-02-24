import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CustomerMaster } from '../customer-model';
import { CustomerService } from '../customer.service';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerAccountingPopupComponent } from './customer-accounting-popup/customer-accounting-popup.component';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatDialog } from '@angular/material/dialog';
import { AccountPopupComponent } from './account-popup/account-popup.component';
import { LocationMaster } from '../../location/location-master.model';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent extends  UnsubscribeOnDestroyAdapter  implements OnInit {
  locationMaster: LocationMaster;
  docForm: FormGroup;
  edit:boolean=false;
  hide3 = true;
  agree3 = false;
  customerMaster: CustomerMaster;
  requestId: number;
  locationList: [];
  countryDdList = [];
  locationDdList = [];
  stateDdList = [];
  cityDdList = [];
  list = [];
  value = [];
  value1= [];
  value2 = [];
  value3 = [];
  value4=[];
  value5=[];
  submitted: boolean=false;
  isactive: boolean=false;
  state: string;
  cityShipperList = [];
  cityDeliveryList = [];
  cityBillingList = [];
  getLocationDropdown=[];
  company:any;
  locationemailDdList:[];
  ifscForm: FormGroup;
  countrybasedStateList1:[];
  stateBasedCityList:[];
  countrybasedStateList:[];
  billingState:[];
  countryList:[];
  stateBasedCityList1:[];
  countrybasedStateList2:[];
  stateBasedCityList2:[];
  companyId: any;

  constructor(private fb: FormBuilder,
              private httpService: HttpServiceService,
              private snackBar: MatSnackBar,
              private router: Router,
              private cmnService: CommonService,
              public customerService: CustomerService,
              private commonService: CommonService,
              private serverUrl: serverLocations,
              private ced: CommonService,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService,
              public route: ActivatedRoute,
              private tokenStorageService:TokenStorageService
              )
    {
      super();

      
  }
  ngOnInit(): void {
    this.docForm = this.fb.group({
      'companyId':this.tokenStorageService.getCompanyId(),
      'branchId':this.tokenStorageService.getBranchId(),
      isactive:[],
      cus_id: [""],
      auditorname: [""],
      registercode: [""],
      person: [""],
      email: ['', [ Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: [""],
      address: [""],
      addresstwo: [""],
      city: [""],
      country: [""],
      state: [""],
      postalcode: [""],
      panno: ["",Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
      vatno: [""],
      gstno: ["",Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}')],
      cstno: [""],
      remarks: [""],
      active: [true],
      location: [""],
      vendorLocation: [""],
      shipperAddress: [""],
      billingAddress: [""],
      shipperState: [""],
      shipperZip: [""],
      shipperCity: [""],
      shipperCountry: [""],
      billingState: [""],
      billingCity: [""],
      billingZip: [""],
      billingCountry: [""],
      deliveryAddress: [""],
      deliveryState: [""],
      deliveryCity: [""],
      deliveryZip: [""],
      deliveryCountry: [""],
      internalNotes: [""],
      resPerson: [""],
      method: [""],
      creditLimit: [""],
      acctReceivable: [""],
      supplier: [""],
      totalReceivable: [""],
      companyid: [""],
      branchid: [""],
      loginedUser: this.tokenStorageService.getUserId(),

      contactDetail: this.fb.array([
        this.fb.group({
          name: [""],
          position: [""],
          conEmail: ["",Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')],
          conPhone: [""],
          mobile: [""]
        })
      ]),
      accountDetail: this.fb.array([
        this.fb.group({
          bankName: [""],
          accType: [""],
          accNo: [""],
          ifscCode: ["",Validators.pattern('[A-Za-z]{4}[0-9]{7}')],
          address: [""],
          state: [""],
          accName: [""],
          country: [""],
          zip: [""],
          addresstwo: [""],
           })
      ]),

      
        });
 

    this.route.params.subscribe(params => {
      if ( params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit = true;
       // For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }

     }); 


     this.company=this.tokenStorageService.getCompanyId();
     this.httpService.get<any>(this.customerService.locationemailDdList+"?companyId="+parseInt(this.company)).subscribe(
       (data) => {
         console.log(data);
         this.locationemailDdList = data.customerDetails;
       },
       (error: HttpErrorResponse) => {
         console.log(error.name + " " + error.message);
       }
     );
     this.httpService.get(this.customerService.getLocationDropdown+ "?locationid=" + this.tokenStorageService.getCompanyId()).subscribe((res: any) => {
      this.getLocationDropdown = res.getLocationDropdown;
     });

     
     this.company=this.tokenStorageService.getCompanyId();
     this.httpService.get<any>(this.customerService.getLocationDropdown+"?companyId="+parseInt(this.company)).subscribe(
       (data) => {
         console.log(data);
         this.locationList = data.customerDetails;
       },
       (error: HttpErrorResponse) => {
         console.log(error.name + " " + error.message);
       }
     );


     this.httpService.get(this.customerService.getLocationDropdown+ "?locationid=" + this.tokenStorageService.getCompanyId()).subscribe((res: any) => {
      this.getLocationDropdown = res.getLocationDropdown;
     });



    this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+ this.tokenStorageService.getCompanyId()).subscribe((res: any) => {
        this.countryDdList = res;
      });
      
  

    // Location dropdown
    this.httpService.get<any>(this.commonService.getuserlocation).subscribe({
  next: (data) => {
    this.locationDdList = data;
  },
  error: (error) => {

  }
});

  // State dropdown
    this.httpService.get<any>(this.commonService.getStateDropdown).subscribe({
    next: (data) => {
      this.stateDdList = data;
    },
    error: (error) => {

    }
  });



// country dropdown
//     this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
//   next: (data) => {
//     this.countryDdList = data;
//   },
//   error: (error) => {

//   }
// });


  }
  fetchCountryBasedState(country: any){
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList = res;
    })
  }
  stateBasedCity(state:any){
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.stateBasedCityList = res;
  })
}

zipcodevalidation2(event:any){
    if(event.length != 6){ 
      this.docForm.controls['billingZip'].setErrors({ billing: true });
    }else{
      this.docForm.controls['billingZip'].setErrors(null);
    } 
  }
  fetchCountryBasedState1(country:any){
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList1 = res;
    })
  }
 
  stateBasedCity1(state:any){
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.stateBasedCityList1 = res;
  })
  }
  fetchCountryBasedState2(country:any){
    this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + country).subscribe((res: any) => {
      this.countrybasedStateList2 = res;
    })
  }
  stateBasedCity2(state:any){
    this.httpService.get(this.commonService.getstateBasedCity + "?state=" + state).subscribe((res: any) => {
      this.stateBasedCityList2 = res;
  })
  }
  zipcodevalidation1(event:any){
    if(event.length != 6){ 
      this.docForm.controls['shipperZip'].setErrors({ shipper: true });
    }else{
      this.docForm.controls['shipperZip'].setErrors(null);
    } 
  }
  zipcodevalidation3(event:any){
    if(event.length != 6){ 
      this.docForm.controls['deliveryZip'].setErrors({ delivery: true });
    }else{
      this.docForm.controls['deliveryZip'].setErrors(null);
    } 
  }
  // pincode validation 

  pincodevalidation(event:any){
    if(event.length != 6){ 
        this.docForm.controls['postalcode'].setErrors({ customer_master: true });
      }else{
        this.docForm.controls['postalcode'].setErrors(null);
      } 
  }
  // city list
    getCityDropdown(state: any): void {
        this.httpService.get(this.commonService.getCityDropdown + "?state=" + state).subscribe((res: any) => {
          this.cityDdList = res.addressBean;
      });
    }
     // city shipper list
     getCityShipperDropdown(state: any): void {
      this.httpService.get(this.commonService.getCityShipperDropdown+ "?state=" + state).subscribe((res: any) => {
        this.cityShipperList = res.addressBean;
    });
  }
   // city delivery list
   getCityDeliveryDropdown(state: any): void {
    this.httpService.get(this.commonService.getCityDeliveryDropdown+ "?state=" + state).subscribe((res: any) => {
      this.cityDeliveryList = res.addressBean;
  });
}

  // city Billing list
  getCityBillingDropdown(state: any): void {
    this.httpService.get(this.commonService.getCityBillingDropdown+ "?state=" + state).subscribe((res: any) => {
      this.cityBillingList = res.addressBean;
  });
  }
locationdropdown(company:any){
  this.httpService.get(this.customerService.getLocationDropdown+ "?companyId=" + company).subscribe((res: any) => {
    this.getLocationDropdown = res.customerBean;
});


}



  onSubmit() {
    if (this.docForm.valid){
      if(this.docForm.value.active==true)
      {
       this.docForm.value.active="True"
      }
      else if(this.docForm.value.active==false)
      {
       this.docForm.value.active="False"
      }
      this.customerMaster = this.docForm.value;
      this.spinner.show();
      if(this.customerMaster.cstno.length==0){
        this.customerMaster.cstno='';
      }
      if(this.customerMaster.gstno.length==0){
        this.customerMaster.gstno='';
      }
      if(this.customerMaster.panno.length==0){
        this.customerMaster.panno='';
      }
    

      this.customerService.item(this.customerMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please Fill The All Required fields",
        "bottom",
        "center"
      );
    }
  }


fetchDetails(cus_id: any): void {
  const obj = {
    editId: cus_id
  }

  this.customerService.editCustomer(obj).subscribe({
    next: (res) => {
      this.getCityDropdown(res.customerBean.state);
      this.getCityShipperDropdown(res.customerBean.shipperState);
      this.getCityBillingDropdown(res.customerBean.billingState);
      this.getCityDeliveryDropdown(res.customerBean.deliveryState);
      // this.fetchCountryBasedState(res.customerBean.billingCountry);
      // this.fetchCountryBasedState1(res.customerBean.shipperCountry);
      // this.fetchCountryBasedState2(res.customerBean.deliveryCountry);
      // this.stateBasedCity(parseInt(res.customerBean.billingCity));
      // this.stateBasedCity1(res.customerBean.shipperCity);
      // this.stateBasedCity2(res.customerBean.deliveryCity);
      //this.locationdropdown(res.customerBean.getLocationDropdown);
      this.fetchCountryBasedState(res.customerBean.billingCountry)
      this.stateBasedCity(res.customerBean.billingState)
      this.fetchCountryBasedState2(res.customerBean.deliveryCountry)
      this.stateBasedCity2(res.customerBean.deliveryState)
      this.fetchCountryBasedState1(parseInt(res.customerBean.shipperCountry))
      this.stateBasedCity1(res.customerBean.shipperState)
      this.docForm.patchValue({
      'cus_id': res.customerBean.cus_id,
      'auditorname': res.customerBean.auditorname,
      'registercode': res.customerBean.registercode,
      'person': res.customerBean.person,
      'email': res.customerBean.email,
      'phone' : res.customerBean.phone,
      'address': res.customerBean.address,
      'addresstwo': res.customerBean.addresstwo,
      'city': res.customerBean.city,
      'state': res.customerBean.state,
      'country': res.customerBean.country,
      'postalcode': res.customerBean.postalcode,
      'panno': res.customerBean.panno,
      'vatno': res.customerBean.vatno,
      'gstno': res.customerBean.gstno,
      'cstno': res.customerBean.cstno,
      'remarks': res.customerBean.remarks,
      'active': res.customerBean.active,
      'resPerson': res.customerBean.resPerson,
      'location': res.customerBean.location,
      'vendorLocation': res.customerBean.vendorLocation,
      'shipperAddress': res.customerBean.shipperAddress,
      'billingAddress': res.customerBean.billingAddress,
      'shipperState': parseInt(res.customerBean.shipperState),
      'shipperZip': res.customerBean.shipperZip,
      'shipperCity': parseInt(res.customerBean.shipperCity),
      'shipperCountry': parseInt(res.customerBean.shipperCountry),
      'billingState': parseInt(res.customerBean.billingState),
      'billingCity': parseInt(res.customerBean.billingCity),
      'billingZip': res.customerBean.billingZip,
      'billingCountry': res.customerBean.billingCountry,
      'deliveryAddress': res.customerBean.deliveryAddress,
      'deliveryState': parseInt(res.customerBean.deliveryState),
      'deliveryCity': parseInt(res.customerBean.deliveryCity),
      'deliveryZip': res.customerBean.deliveryZip,
      'deliveryCountry': parseInt(res.customerBean.deliveryCountry),
      'internalNotes': res.customerBean.internalNotes,
      'method': res.customerBean.method,
      'acctReceivable': res.customerBean.acctReceivable,
      'supplier': res.customerBean.supplier,
      'totalReceivable': res.customerBean.totalReceivable,
      'creditLimit': res.customerBean.creditLimit,
    })
      if (res.contactDetails != null && res.contactDetails.length >= 1) {
      let contactDetailsArray = this.docForm.controls.contactDetail as FormArray;
      contactDetailsArray.clear();
      res.contactDetails.forEach(element => {
        let contactDetailsArray = this.docForm.controls.contactDetail as FormArray;
        let arraylen = contactDetailsArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          name: [ element.name],
          position: [ element.position],
          conEmail: [ element.conEmail],
          conPhone: [element.conPhone],
          mobile: [ element.mobile],
        })
        contactDetailsArray.insert(arraylen, newUsergroup);
      });
    }
      if (res.accountDetails != null && res.accountDetails.length >= 1) {
      let accountDetailArray = this.docForm.controls.accountDetail as FormArray;
      accountDetailArray.clear();
      res.accountDetails.forEach(element => {
        let accountDetailArray = this.docForm.controls.accountDetail as FormArray;
        let arraylen = accountDetailArray.length;
        let newUsergroup: FormGroup = this.fb.group({
            bankName: [element.bankName],
            accType: [element.accType],
            accNo: [element.accNo],
            ifscCode: [element.ifscCode],
            address: [element.address],
            state: [element.state],
            country: [element.country],
            zip: [element.zip],
            acctReceivable: [element.acctReceivable],
            supplier: [element.supplier],
            totalReceivable: [element.totalReceivable],
            creditLimit: [element.creditLimit]
          })
          accountDetailArray.insert(arraylen, newUsergroup);
        });
      }

    },
    error: (error) => {
      this.spinner.hide();
      // error code here
    }
  });
}
active(){
  
  if(this.docForm.value.isactive==true){
    this.fetchCountryBasedState(this.docForm.value.billingCountry)
    this.stateBasedCity(this.docForm.value.billingState)
    this.fetchCountryBasedState1(this.docForm.value.billingCountry)
this.stateBasedCity1(this.docForm.value.billingState)
this.fetchCountryBasedState2(this.docForm.value.billingCountry)
this.stateBasedCity2(this.docForm.value.billingState)
    //  this.httpService.get(this.commonService.getCountryBasedStateList + "?country=" + this.docForm.value.billingCountry).subscribe((res: any) => {
    //   this.countrybasedStateList = res;
    this.docForm.patchValue({
     
    'shipperAddress': this.docForm.value.billingAddress,
    'shipperState': this.docForm.value.billingState,
    'shipperCity': parseInt(this.docForm.value.billingCity),
    'shipperZip':this.docForm.value.billingZip,
    'shipperCountry': parseInt(this.docForm.value.billingCountry),
    'deliveryAddress': this.docForm.value.billingAddress,
    'deliveryState': parseInt(this.docForm.value.billingState),
    'deliveryCity': parseInt(this.docForm.value.billingCity),
    'deliveryZip':this.docForm.value.billingZip,
    'deliveryCountry':parseInt(this.docForm.value.billingCountry),
    
 })
//})
  }
  else  if(this.docForm.value.isactive==false){
    this.docForm.patchValue({
     'shipperAddress':"",
   'shipperState':"",
   'shipperCity':"",
   'shipperZip':"",
   'shipperCountry':"",
   'deliveryAddress':"",
   'deliveryState':"",
   'deliveryCity':"",
   'deliveryZip':"",
   'deliveryCountry':"",
 })

}

}
keyPressPCB(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressPCC(event:any){
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 6 && !pattern.test(inputChar)) {
    event.preventDefault();
  }

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
keyPressAlphaNumericA(event: any){
  const pattern = /[A-Z,a-z 0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressString(event: any){
  const pattern = /[A-Z,a-z ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}


update() {
  this.submitted = true;
  this.customerMaster = this.docForm.value;
  this.spinner.show();
  this.customerService.updateCustomer(this.customerMaster).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Edit Record Successfully",
            "bottom",
            "center"
          );
          this.onCancel();
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Updated Successfully...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
openPopupContactDetails() {

  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(CustomerAccountingPopupComponent, {

    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data != null) {
      let contactDetailArray = this.docForm.controls.contactDetail as FormArray;
      let arraylen = contactDetailArray.length;
      let newUsergroup: FormGroup = this.fb.group({
          name: [data.contact.name],
          position: [data.contact.position],
          conEmail: [data.contact.conEmail],
          conPhone: [data.contact.conPhone],
          mobile: [data.contact.mobile]
    })
      contactDetailArray.insert(arraylen, newUsergroup);
    }
  });
}

removeRow(index) {
  let contactDetailArray = this.docForm.controls.contactDetail as FormArray;
  contactDetailArray.removeAt(index);
}
getAuditor(data:any){
  var a=this.tokenStorageService.getCompanyId();
  this.companyId=parseInt(this.tokenStorageService.getCompanyId());
  this.httpService.get<any>(this.customerService.getAuditor + "?requestId=" + data+"&companyId="+this.companyId).subscribe(
    (data6) => {
      if(data6.customerBean.count==0){
       

      }else{
        this.showNotification(
          "snackbar-danger",
          "Auditor Name  is already used",
          "top",
          "right"
        );
        this.docForm.patchValue({
          'auditorname': "",

        });      }
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
    )
}

openPopupAccountDetails() {

  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }

  const dialogRef = this.dialog.open(AccountPopupComponent, {

    direction: tempDirection,
    disableClose: true
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
    if (data != null) {
      let accountDetailArray = this.docForm.controls.accountDetail as FormArray;
      let arraylen = accountDetailArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        bankName: [data.account.bankName],
        accType: [data.account.accType],
        accNo: [data.account.accNo],
        ifscCode: [data.account.ifscCode],
        address: [data.account.address],
        state: [data.account.state],
        addresstwo: [data.account.addresstwo]

    })
      accountDetailArray.insert(arraylen, newUsergroup);
    }
  });
}

removeRowAccount(index) {
  let accountDetailArray = this.docForm.controls.accountDetail as FormArray;
  accountDetailArray.removeAt(index);
}

reset(){
  if (!this.edit) {
    location.reload()
    this.docForm.reset();
    this.docForm.patchValue({
      cus_id: [""],
      auditorname: [""],
      registercode: [""],
      person: [""],
      email: [""],
      phone: [""],
      address: [""],
      addresstwo: [""],
      city: [""],
      state: [""],
      postalcode: [""],
      panno: [""],
      vatno: [""],
      gstno: [""],
      cstno: [""],
      remarks: [""],
      active: [true],
      'loginedUser': this.tokenStorageService.getUserId(),
      companyId: this.tokenStorageService.getCompanyId(),
      branchId: this.tokenStorageService.getBranchId()
    })
  } else {
    this.fetchDetails(this.requestId);
  }
}


onCancel(){

  this.router.navigate(['/master/customer/list-customer']);


}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
removeRow1(index){

  let itemMasteDtlArray = this.docForm.controls.customerBean as FormArray;
  itemMasteDtlArray.removeAt(index);
}

addRow(){

  let itemMasteDtlArray = this.docForm.controls.customerBean as FormArray;
  let arraylen = itemMasteDtlArray.length;
  let newUsergroup: FormGroup = this.fb.group({

  })
  itemMasteDtlArray.insert(arraylen, newUsergroup);
}


string(event: any) {
  const pattern = /[A-Z a-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
validateCustomer(event){
  this.httpService.get<any>(this.customerService.uniqueValidateUrl+ "?tableName=" +"customer_master"+"&columnName="+"name"+"&columnValue="+event).subscribe((res: any) => {
    if(res){
      this.docForm.controls['auditorname'].setErrors({ customer_master: true });
    }else{
      this.docForm.controls['auditorname'].setErrors(null);
    }
  });
}


}
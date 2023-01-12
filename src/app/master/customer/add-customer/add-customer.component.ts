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
  tokenStorage: any;
  locationList: [];
  countryList = [];
  locationDdList = [];
  stateDdList = [];
  cityDdList = [];
  list= [];


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
              )
    {
      super();

      this.docForm = this.fb.group({
      cus_id: [""],
      auditorname: [""],
      registercode: [""],
      person: [""],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: [""],
      address: [""],
      addresstwo: [""],
      city: [""],
      state: [""],
      postalcode: ["", [Validators.required]],
      panno: [""],
      vatno: [""],
      gstno: [""],
      cstno: [""],
      remarks: [""],
      active: [""],
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
      deliverycity: [""],
      deliveryZip: [""],
      deliveryCountry: [""],
      internalNotes: [""],
      resPerson: [""],
      method: [""],

      contactDetail: this.fb.array([
        this.fb.group({
          name: [""],
          position: [""],
          conEmail: [""],
          conPhone: [""],
          mobile: [""]
        })
      ]),
      accountDetail: this.fb.array([
        this.fb.group({
          bankName: [""],
          accType: [""],
          accNo: [""],
          ifscCode: [""],
          address: [""],
          state: [""],
          accName:[""],
          addresstwo: [""],
          acctReceivable: [""],
          supplier: [""],
          totalReceivable: [""],
          creditLimit: [""],

        })
      ]),


    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       // For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }

     });
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationList = data;
      },
      error: (error) => {
      }
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
  // City dropdown
  this.httpService.get<any>(this.commonService.getCityDropdown).subscribe({
    next: (data) => {
      this.cityDdList = data;
    },
    error: (error) => {

    }
  });
// country dropdown
    this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
  next: (data) => {
    this.countryList = data;
  },
  error: (error) => {

  }
});
  }

  onSubmit() {
    if (this.docForm.valid){
      this.customerMaster = this.docForm.value;
      this.spinner.show();
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

    this.docForm.patchValue({
      'cus_id': res.customerBean.cus_id,
      'auditorname': res.customerBean.auditorname,
      'registercode': res.customerBean.registercode,
      'person': res.customerBean.person,
      'email': res.customerBean.email,
      'phone' : res.customerBean.phone,
      'address': res.customerBean.address,
      'addresstwo':res.customerBean.addresstwo,
      'city': res.customerBean.city,
      'state':res.customerBean.state,
      'postalcode':res.customerBean.postalcode,
      'panno':res.customerBean.panno,
      'vatno':res.customerBean.vatno,
      'gstno':res.customerBean.gstno,
      'cstno':res.customerBean.cstno,
      'remarks':res.customerBean.remarks,
      'active':res.customerBean.active,
      'resperson':res.customerBean.resperson

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
keyPressPCC(event:any){
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 6 && !pattern.test(inputChar)) {
    event.preventDefault();
  }

}

update(){
  this.customerMaster = this.docForm.value;
  this.customerService.updateCustomer(this.customerMaster);
  this.showNotification(
    "snackbar-success",
    "Edit Record Successfully...!!!",
    "bottom",
    "center"
  );
  this.router.navigate(['/master/customer/list-customer']);

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
    this.docForm.reset();
    this.docForm.patchValue({
      cus_id:[""],
      auditorname: [""],
      registercode: [""],
      person:[""],
      email:[""],
      phone:[""],
      address:[""],
      addresstwo:[""],
      city:[""],
      state:[""],
      postalcode:[""],
      panno:[""],
      vatno:[""],
      gstno:[""],
      cstno:[""],
      remarks:[""],
      active:[""],
      'loginedUser': this.tokenStorage.getUserId()
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



}
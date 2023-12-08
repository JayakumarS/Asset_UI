import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailRowComponent } from '../detail-row/detail-row.component';
import { PurchaseRequest } from '../purchase-request.model';
import { PurchaseRequestService } from '../purchase-request.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import * as moment from 'moment';
import { PurchaseOrderService } from 'src/app/inventory/purchase-order/purchase-order.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { UomCategoryService } from 'src/app/inventory/uom-category/uom-category.service';
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
};

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.sass'],
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



export class AddPurchaseComponent implements OnInit {
docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  requestId: number;
  edit:boolean=false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  purchaseRequestDetail= new DetailRowComponent;
  purchaseRequest: PurchaseRequest;
  purchaseTypeList: [];
  itemCodeNameList = [];
  locationList = [];
  uomList = [];
  vendorList = [];
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  purchaseForList: [];
  discountTypeList: [];
  itemList:[];
  categoryList:[];
  locationDdList:[];
  companyId: any;
  stateList=[];
  districtList=[];
  countryList=[];
  cityList=[];
  submitted: boolean = false;
  editDetails: any;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,  
    private tokenStorage: TokenStorageService,    private notificationService: NotificationService,
    public uomCategoryService: UomCategoryService, private spinner: NgxSpinnerService,
    private commonService: CommonService,private purchaseOrderService :PurchaseOrderService,
    private purchaseRequestService: PurchaseRequestService,public route: ActivatedRoute,private httpService: HttpServiceService) { 
   
  }
  ngOnInit(): void {
    this.docForm = this.fb.group({
      requestType: ["", [Validators.required]],
      requestDate: [moment().format('DD/MM/YYYY')],
      requestDateObj: [moment().format('YYYY-MM-DD'), [Validators.required]],
      vendorId :["", [Validators.required]],
      vendorAddress: [""],
      destinationLocation: [""],
      vendorCity: [""],
      vendorState: [""],
      vendorCountry: [""],
      vendorDistrict:[""],
      vendorZip: [""],
      termsConditions: [""],
      remarks: [""],
      //After detail row
      subTotal: [""],
      discount: [""],
      discountTot:[""],
      otherCharges: [""],
      total: [""],
      purchaseRequestId:[""],

      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
      purchaseRequestDetail: this.fb.array([
        this.fb.group({
          purchaseRequestId: [""],
          itemId: [''],
          edd: [''],
          eddObj: [''],
          uomId: [''],
          qty: ['',[Validators.required]],
          unitPrice: ['',[Validators.required]],
          price: [''],
          discountType: [''],
          discount: [''],
          discountPercent: [''],
          netPrice: [''],
          requisitionId: ['']
        })
      ]),

    });



    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });
     this.fetchLocation();
    this.dataarray.push(this.purchaseRequestDetail)
    this.dataarray1.push(this.purchaseRequestDetail)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.salesEntryData.push(this.dataarray1)

    this.companyId=this.tokenStorage.getCompanyId(),
       //category Type list
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 11).subscribe({
      next: (data) => {
        this.purchaseForList = data;
      },
      error: (error) => {
      }
    });
    //category Type list
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 12).subscribe({
      next: (data) => {
        this.purchaseTypeList = data;
      },
      error: (error) => {
      }
    });



     //Company Based Uom
     this.httpService.get(this.uomCategoryService.fetchUomCategoryName + "?company=" + this.companyId).subscribe((res: any) => {
      this.categoryList = res.uomCategoryList;
     },
       (err: HttpErrorResponse) => {
         // error code here
       }
     );   
    //Discount Type List 
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 28).subscribe({
      next: (data) => {
        this.discountTypeList = data;
      },
      error: (error) => {
      }
    });

    //Location Dropdown List
   this.companyId=this.tokenStorage.getCompanyId(),
    this.httpService.get<any>(this.commonService.getLocationDropdown+"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.locationList = data;
      },
      error: (error) => {
      }
    });

    //Vendor  Dropdown List
     this.companyId=this.tokenStorage.getCompanyId();
     if(this.companyId==null || this.companyId=='' || this.companyId==undefined || this.companyId=="null"){
      this.companyId=0;
     } else {
      this.companyId=parseInt(this.tokenStorage.getCompanyId());
     }
     this.fetchItem(this.companyId);
    this.httpService.get<any>(this.commonService.getVendorDropdown +"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.vendorList = data;
      },
      error: (error) => {
      }
    });
    

    
  }

  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }
    this.spinner.show();
    this.purchaseRequestService.editPurchase(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        let hdate = this.commonService.getDateObj(res.purchaseRequest.requestDate);
        this.fetchItem(this.companyId);
        this.getPincodeDetails(res.purchaseRequest.vendorZip)
       
        this.docForm.patchValue({
          'purchaseRequestId': res.purchaseRequest.purchaseRequestId,
          'requestDate': res.purchaseRequest.requestDate,
          'requestDateObj': hdate,
          'requestType': res.purchaseRequest.requestType,
          'vendorId': res.purchaseRequest.vendorId,
          'vendorAddress': res.purchaseRequest.vendorAddress,
          'vendorCity': res.purchaseRequest.vendorCity,
          'vendorState': res.purchaseRequest.vendorState,
          'vendorCountry': res.purchaseRequest.vendorCountry,
          'vendorDistrict':res.purchaseRequest.vendorDistrict,
          'vendorZip': res.purchaseRequest.vendorZip,
          'destinationLocation': res.purchaseRequest.destinationLocation,
          'termsConditions': res.purchaseRequest.termsConditions,
          'remarks': res.purchaseRequest.remarks,

          //After detail row
          'subTotal': Number(res.purchaseRequest.subTotal).toFixed(2),
          'discountTot': Number(res.purchaseRequest.discountTot).toFixed(2),
          'otherCharges': Number(res.purchaseRequest.otherCharges).toFixed(2),
          'total': Number(res.purchaseRequest.total).toFixed(2), 
        })


       

        if (res.purchaseRequestDetailList != null && res.purchaseRequestDetailList.length >= 1) {
          let purchaseRequestDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
          purchaseRequestDetailArray.removeAt(0);
          res.purchaseRequestDetailList.forEach(element => {
            let purchaseRequestDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
            let cdate = this.commonService.getDateObj(element.edd);
            let cdateObj = element.edd;
            if(element.edd==null){
              cdate = "";
              cdateObj = "";
            }
            let arraylen = purchaseRequestDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              purchaseRequestId: [element.purchaseRequestId],
              itemId: [element.itemId]+"",
              edd: [cdateObj],
              eddObj: [cdate],
              uomId: [element.uomId]+"",
              qty: [element.qty],
              unitPrice: [Number(element.unitPrice).toFixed(2)],
              price: [Number(element.price).toFixed(2)],
              discount: [Number(element.discount).toFixed(2)],
              discountType: [element.discountType],
              discountPercent: [Number(element.discountPercent).toFixed(2)],
              netPrice: [Number(element.netPrice).toFixed(2)],
              requisitionId: [element.requisitionId],
            })
            purchaseRequestDetailArray.insert(arraylen, newUsergroup);
          });

          console.log(this.docForm.value.discount)
        }
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }









 // Location dropdown
 fetchLocation(){
  this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
    next: (data) => {
      this.locationDdList = data;
    },
    error: (error) => {

    }
  }
  );
}

    //Comapny Based Item
    fetchItem(CompanyId:any):void {
      this.httpService.get(this.purchaseOrderService.fetchItem + "?company=" + CompanyId).subscribe((res: any) => {
        this.itemList = res.itemList;
       },
         (err: HttpErrorResponse) => {
           // error code here
         }
       );
    }
keyPressNumeric2(event: any) {
  const pattern = /[0-9 +]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressName(event: any) {
  const pattern = /[A-Z,a-z]/;
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

keyPressNumberInt(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

 //// country ,state and city dropdowns /////////////////////
 getPincodeDetails(pincode){
  if(pincode!=""){
    this.httpService.get(this.commonService.getPincodeDetailsUrl + "?pinCode=" + pincode).subscribe((res: any) => {
      if(res.success){
        this.stateList = res.stateList;
        this.districtList = res.districtList;
        this.countryList = res.countryList;
        this.cityList = res.cityList;
        if(!this.edit){
          this.docForm.patchValue({
         'vendorCountry':this.countryList[0].id,
          'vendorState':this.stateList[0].id,
          'vendorDistrict':this.districtList[0].id,
          'vendorCity':this.cityList[0].id,
          })
        }else if(this.edit){
          this.docForm.patchValue({
            'vendorCountry':this.countryList[0].id,
             'vendorState':this.stateList[0].id,
             'vendorDistrict':this.districtList[0].id,
             'vendorCity':this.cityList[0].id,
             })
        }else if(this.editDetails.addressOneZipCode==null){
          this.docForm.patchValue({
          'vendorCountry':this.countryList[0].id,
          'vendorState':this.stateList[0].id,
          'vendorDistrict':this.districtList[0].id,
          'vendorCity':this.cityList[0].id,
          })
        }
      }else{
        this.notificationService.showNotification(
          "snackbar-danger",
          res.message,
          "top",
          "right");
      }
    })
  }
}


  onSubmit() {
      if (this.docForm.valid) {
      this.purchaseRequest = this.docForm.value
      this.purchaseRequestService.addPurchase(this.purchaseRequest).subscribe({
        next: (data) => {
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
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }


  }

  update() {
    if (this.docForm.valid) {
      this.purchaseRequest = this.docForm.value;
      this.spinner.show();
      this.purchaseRequestService.UpdatePurchase(this.purchaseRequest).subscribe({
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
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  addRow() {
    let purchaseRequestDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
    let arraylen = purchaseRequestDetailArray.length;

    let newUsergroup: FormGroup = this.fb.group({
      purchaseRequestId: [""],
      itemId: [""],
      edd: [""],
      eddObj: [""],
      uomId: [""],
      qty: [""],
      unitPrice: [""],
      price: [""],
      discountType: [""],
      discount: [""],
      discountPercent: [""],
      netPrice: [""],
      requisitionId: [""]
    })
    purchaseRequestDetailArray.insert(arraylen, newUsergroup);
  }

  removeRow(index){
    this.dataarray.splice(index, 1);
  }

  addRow1(){
    this.purchaseRequestDetail=new DetailRowComponent()
    this.dataarray1.push(this.purchaseRequestDetail)

  }
  removeRow1(index){
    this.dataarray1.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);
   }

   reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId': this.tokenStorage.getCompanyId(),
        'branchId': this.tokenStorage.getBranchId(),
        'requestDate': moment().format('DD/MM/YYYY'),
        'requestDateObj': moment().format('YYYY-MM-DD'),
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
// For Date related code
getDateString(event, inputFlag, index) {
  let cdate = this.commonService.getDate(event.target.value);
  if (inputFlag == 'requestDate') {
    this.docForm.patchValue({ requestDate: cdate });
  }
  if (inputFlag == 'edd') {
    let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
    purchaseOrderDetailArray.at(index).patchValue({
      edd: cdate
    });
  }
}


//FOR DISCOUNT PERCENTAGE VALIDATION ADDED BY 
discountPercentageValidation(data: any, index: number) {
  if (data.get('discountPercent').value != undefined && data.get('discountPercent').value != null && data.get('discountPercent').value != '') {
    if (data.get('discountPercent').value < 1) {
      data.controls.discountPercent.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
      data.controls.discountPercent.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
      data.controls['discountPercent'].updateValueAndValidity();
    } else if (data.get('discountPercent').value > 100) {
      data.controls.discountPercent.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
      data.controls['discountPercent'].updateValueAndValidity();
    } else {
      data.controls.discountPercent.clearValidators();
      data.controls['discountPercent'].updateValueAndValidity();
    }
  } else {
    data.controls.discountPercent.clearValidators();
    data.controls['discountPercent'].updateValueAndValidity();
  }
}

//FOR CALCULATE PRICE ADDED BY 
calculatePrice(data: any, index: number) {
  if (data.get('qty').value != undefined && data.get('qty').value != null && data.get('qty').value != '' && data.get('unitPrice').value != undefined && data.get('unitPrice').value != null && data.get('unitPrice').value != '') {
    let totalPrice = Number(Number(data.get('qty').value) * Number(data.get('unitPrice').value)).toFixed(2);
    let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
    purchaseOrderDetailArray.at(index).patchValue({
      price: totalPrice,
      netPrice: totalPrice
    });
    this.calculateNetPrice(data, index);
  }
}

//FOR CALCULATE NET PRICE ADDED BY 
calculateNetPrice(data: any, index: number) {
  if (data.get('discountType').value != undefined && data.get('discountType').value != null && data.get('discountType').value != '' && data.get('price').value != undefined && data.get('price').value != null && data.get('price').value != 0.00 && data.get('price').value != '') {
    if (data.get('discountType').value === 59) {
      if (data.get('discount').value != undefined && data.get('discount').value != null && data.get('discount').value != '') {
        let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
        let totalNetPrice = Number(Number(data.get('price').value) - Number(data.get('discount').value)).toFixed(2);
        purchaseOrderDetailArray.at(index).patchValue({
          netPrice: totalNetPrice
        });
      } else {
        let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
        purchaseOrderDetailArray.at(index).patchValue({
          netPrice: Number(data.get('price').value).toFixed(2)
        });
      }
    } else if (data.get('discountType').value === 58) {
      if (data.get('discount').value != undefined && data.get('discount').value != null && data.get('discount').value != '') {
        let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
        let discountAmount = (Number(data.get('discount').value) / 100) * Number(data.get('price').value);
        let totalNetPrice = Number(Number(data.get('price').value) - Number(discountAmount)).toFixed(2);
        purchaseOrderDetailArray.at(index).patchValue({
          discount:data.get('discount').value,
          netPrice: totalNetPrice,
          discountTot: discountAmount
        });
      } else {
        let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
        purchaseOrderDetailArray.at(index).patchValue({
          netPrice: Number(data.get('price').value).toFixed(2)
        });
      }
    }
  } else {
    let purchaseOrderDetailArray = this.docForm.controls.purchaseRequestDetail as FormArray;
    purchaseOrderDetailArray.at(index).patchValue({
      netPrice: Number(data.get('price').value).toFixed(2)
    });
  }
  this.calculateFinalsubTotalDiscountAndTotal();
}

//FOR CALCULATE SUB TOTAL,DISCOUNT AND TOTAL ADDED BY 
calculateFinalsubTotalDiscountAndTotal() {
  //Start Calculate SubTotal And Total
  let totalAmount = Number(0.00);
  let discountAmount = Number(0.00);
  this.docForm.controls.purchaseRequestDetail['controls'].forEach((element) => {
    if (element.get('netPrice').value != undefined && element.get('netPrice').value != null && element.get('netPrice').value != '') {
      totalAmount = Number(totalAmount) + Number(element.get('netPrice').value);
    }
    if (element.get('discount').value != undefined && element.get('discount').value != null && element.get('discount').value != '') {
      discountAmount = Number(discountAmount) + Number(element.get('discount').value);
    }
  });
  this.docForm.patchValue({
    'subTotal': Number(totalAmount).toFixed(2),
    'total': Number(totalAmount).toFixed(2),
    // 'discount':  Number(discountAmount).toFixed(2),
    'discountTot':  Number(discountAmount).toFixed(2),
  });
  //End

  if (this.docForm.controls.otherCharges.value != undefined && this.docForm.controls.otherCharges.value != null && this.docForm.controls.otherCharges.value != '') {
    let subtotalPlusOtherCharges = Number(Number(this.docForm.controls.subTotal.value) + Number(this.docForm.controls.otherCharges.value)).toFixed(2);
    this.docForm.patchValue({
      'total': subtotalPlusOtherCharges
    });
  }

 
}

}
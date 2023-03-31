import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { GrnService } from '../grn.service';
import { Grn } from '../grn-model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from 'src/app/core/service/notification.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { PurchaseOrderService } from '../../purchase-order/purchase-order.service';
import * as moment from 'moment';



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
  selector: 'app-add-grn',
  templateUrl: './add-grn.component.html',
  styleUrls: ['./add-grn.component.sass'],
  // Date Related code
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
export class AddGrnComponent implements OnInit {
  docForm: FormGroup;
  grn: Grn;
  grnDetailList = [];
  purchaseOrderNumber = [];
  vendorList = [];
  locationList: [];
  itemCodeNameList = [];
  edit: boolean = false;
  requestId: any;
  companyId: any;
  purchaseTypeList:[];
  locationDdList:[];
  stateList=[];
  districtList=[];
  countryList=[];
  cityList=[];
  editDetails: any;

  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public grnService: GrnService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private purchaseOrderService: PurchaseOrderService) {

    this.docForm = this.fb.group({
      grnId: [""],
      grnDate: [moment().format('DD/MM/YYYY')],
      grnDateObj: [moment().format('YYYY-MM-DD'), [Validators.required]],
      purchaseOrderId: ["", [Validators.required]],
      poType: ["", [Validators.required]],
      vendorId: [""],
      vendorAddress: [""],
      vendorCity: [""],
      vendorState: [""],
      vendorZip:[""],
      vendorDistrict:[""],
      vendorCountry: [""],
      transMode: 1,
      invoiceNo: [""],
      invoiceDate: [moment().format('DD/MM/YYYY')],
      invoiceDateObj: [moment().format('YYYY-MM-DD')],
      sourceLocId: [""],
      deliveryLocId: [""],
      delOrderNo: [""],
      delOrderDate: [""],
      delOrderDateObj: [""],
      loginedUser: this.tokenStorage.getUserId(),
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

      grnDetailList: this.fb.array([
        this.fb.group({
          itemId: [""],
          unitPrice: [""],
          receivingQty: ["",[Validators.required]],
        })
      ])

    });


  }

  ngOnInit() {
    //purchaseOrderNumber Dropdown List
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }
    this.httpService.post<any>(this.commonService.getPurchaseOrderNumberDropdown,obj).subscribe({
      next: (data) => {
        this.purchaseOrderNumber = data;
      },
      error: (error) => {
      }
    });

    //Vendor  Dropdown List
    this.httpService.get<any>(this.commonService.getVendorDropdown+"?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.vendorList = data;
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

     this.fetchLocation();

    //Item Master Dropdown List
    this.httpService.get<any>(this.commonService.getItemMasterDropdown).subscribe({
      next: (data) => {
        this.itemCodeNameList = data;
      },
      error: (error) => {
      }
    });

    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 12).subscribe({
      next: (data) => {
        this.purchaseTypeList = data;
      },
      error: (error) => {
      }
    });




    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For Editable mode
        this.fetchDetails(this.requestId);
      }
    });
  }

  //Company Based Location
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

  onSubmit() {
    if(this.docForm.value.invoiceNo!=null){
    if (this.docForm.valid) {
      this.grn = this.docForm.value;
      this.spinner.show();
      this.grnService.addGrn(this.grn).subscribe({
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
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }else{
    this.showNotification(
      "snackbar-danger",
      "Please Raise Invoive for this particular GRN...!",
      "bottom",
      "center"
    );
  }
  }


  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }
    this.spinner.show();
    this.grnService.editGrn(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        let ggrnDateObj = this.commonService.getDateObj(res.grn.grnDate);
        let ginvoiceDateObj = this.commonService.getDateObj(res.grn.invoiceDate);
        let gdelOrderDateObj = this.commonService.getDateObj(res.grn.delOrderDate);
        this.getPincodeDetails(res.grn.vendorZip);
        this.editDetails =res.grn;
        this.docForm.patchValue({
          'grnId': res.grn.grnId,
          'grnDateObj': ggrnDateObj,
          'grnDate': res.grn.grnDate,
          'purchaseOrderId': res.grn.purchaseOrderId,
          'poType': res.grn.poType,
          'vendorId': res.grn.vendorId,
          'vendorAddress': res.grn.vendorAddress,
          'vendorCity': res.grn.vendorCity,
          'vendorState': res.grn.vendorState,
          'vendorZip':res.grn.vendorZip,
          'vendorDistrict':res.grn.vendorDistrict,
          'vendorCountry': res.grn.vendorCountry,
          'invoiceNo': res.grn.invoiceNo,
          'invoiceDate': res.grn.invoiceDate,
          'invoiceDateObj': ginvoiceDateObj,
          'sourceLocId': res.grn.sourceLocId,
          'deliveryLocId': res.grn.deliveryLocId,
          'delOrderNo': res.grn.delOrderNo,
          'delOrderDate': res.grn.delOrderDate,
          'delOrderDateObj': gdelOrderDateObj
        })

        if (res.grnDetailList != null && res.grnDetailList.length >= 1) {
          let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
          grnDetailArray.clear();
          res.grnDetailList.forEach(element => {
            let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
            let arraylen = grnDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              itemId: [element.itemId],
              unitPrice: [Number(element.unitPrice).toFixed(2)],
              receivingQty: [element.receivingQty],
            })
            grnDetailArray.insert(arraylen, newUsergroup);
          });
        }

      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }

  update() {
    if (this.docForm.valid) {
      this.grn = this.docForm.value;
      this.spinner.show();
      this.grnService.updateGrn(this.grn).subscribe({
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


  reset() {
    if (!this.edit) {
      this.docForm.reset();
      // // let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
      // grnDetailArray.clear();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId': this.tokenStorage.getCompanyId(),
        'branchId': this.tokenStorage.getBranchId(),
        'grnDate': moment().format('DD/MM/YYYY'),
        'grnDateObj': moment().format('YYYY-MM-DD'),
        'invoiceDate': moment().format('DD/MM/YYYY'),
        'invoiceDateObj': moment().format('YYYY-MM-DD'),
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  validationLocations(id){
    if(this.docForm.get('sourceLocId').value!="" && id ){
      if(this.docForm.get('sourceLocId').value == id){
        this.showNotification(
          "snackbar-danger",
          "Source Location and Destination Location Should not be Same!",
          "top",
          "right"
        );
  
        this.docForm.get('deliveryLocId').setValue('');
  
      }
    }
  }

  getBoolean(value) {
    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
      case "t":
        return true;
      default:
        return false;
    }
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressAlp(event: any) {
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

  onCancel() {
    this.router.navigate(['/inventory/grn/listGrn']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getDateString(event, inputFlag) {
    let cdate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'grnDate') {
      this.docForm.patchValue({ grnDate: cdate });
    } else if (inputFlag == 'invoiceDate') {
      this.docForm.patchValue({ invoiceDate: cdate });
    } else if (inputFlag == 'delOrderDate') {
      this.docForm.patchValue({ delOrderDate: cdate });
    }
  };


  removeRow(index) {
    let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
    grnDetailArray.removeAt(index);
  }

  addRow() {
    let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
    let arraylen = grnDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      itemId: [""],
      unitPrice: [""],
      receivingQty: ["",[Validators.required]],
    })
    grnDetailArray.insert(arraylen, newUsergroup);
  }


  getPurchaseOrderDetails(POID: number) {
    if (POID != undefined && POID != null) {
      this.spinner.show();
      this.httpService.get<any>(this.purchaseOrderService.getPurchaseOrderDetails + "?purchaseOrderId=" + POID).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.getPincodeDetails(res.purchaseOrder.vendorZip);
          if (res.success) {
            if (res.purchaseOrder != null) {
              this.docForm.patchValue({
                'poType': res.purchaseOrder.purchaseType,
                'vendorId': res.purchaseOrder.vendorId,
                'vendorAddress': res.purchaseOrder.vendorAddress,
                'vendorZip': res.purchaseOrder.vendorZip,
                'vendorCity': res.purchaseOrder.vendorCity,
                'vendorState': res.purchaseOrder.vendorState,
                'vendorCountry': res.purchaseOrder.vendorCountry,
                'invoiceNo': res.purchaseOrder.invoiceNo
                // 'deliveryLocId': res.purchaseOrder.destinationLocation
              })
            }
            if (res.purchaseOrderDetailList != null && res.purchaseOrderDetailList.length >= 1) {
              let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
              grnDetailArray.clear();
              res.purchaseOrderDetailList.forEach(element => {
                let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
                let arraylen = grnDetailArray.length;
                let newUsergroup: FormGroup = this.fb.group({
                  itemId: [element.itemId],
                  unitPrice: [element.unitPrice],
                  receivingQty: ["",[Validators.required]],
                })
                grnDetailArray.insert(arraylen, newUsergroup);
              });
            }
          }
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }
  }
  keyPressNumeric2(event: any) {
    const pattern = /[0-9 +]/;
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
        }else if(this.edit &&this.editDetails.vendorZip==""){
          this.docForm.patchValue({
            'vendorCountry':this.countryList[0].id,
             'vendorState':this.stateList[0].id,
             'vendorDistrict':this.districtList[0].id,
             'vendorCity':this.cityList[0].id,
             })
        }else if(this.editDetails.vendorZip==null){
          this.docForm.patchValue({
          'vendorCountry':this.countryList[0].id,
          'vendorState':this.stateList[0].id,
          'vendorDistrict':this.districtList[0].id,
          'vendorCity':this.cityList[0].id,
          })
        }else if(this.editDetails.vendorZip!=""){
          this.docForm.patchValue({
          'vendorCountry':this.countryList[0].id,
          'vendorState':this.stateList[0].id,
          'vendorDistrict':this.districtList[0].id,
          'vendorCity':this.cityList[0].id,
          })
        }else if(this.editDetails.vendorZip !=null){
          for(let i=0;i<this.editDetails.length;i++){
            this.docForm.patchValue({
              'vendorCountry':this.countryList[i].id,
              'vendorState':this.stateList[i].id,
              'vendorDistrict':this.districtList[i].id,
              'vendorCity':this.cityList[i].id,
              })
          }
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
}

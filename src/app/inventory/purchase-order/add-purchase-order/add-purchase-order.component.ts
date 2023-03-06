import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrder } from '../purchase-order-model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UomCategoryService } from '../../uom-category/uom-category.service';
import { Company } from 'src/app/master/company/company-model';

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
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.sass'],
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

export class AddPurchaseOrderComponent implements OnInit {
  docForm: FormGroup;
  purchaseOrder: PurchaseOrder;
  itemCodeNameList = [];
  locationList = [];
  uomList = [];
  vendorList = [];
  lopFile: any;
  requestId: any;
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean = false;
  purchaseRequestDtlBean = [];
  filePathUrl: string;
  string:any;
  purchaseTypeList: [];
  purchaseForList: [];
  discountTypeList: [];
  itemList:[];
  categoryList:[];
  locationDdList:[];

  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  companyId: any;
  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public purchaseOrderService: PurchaseOrderService,
    public uomCategoryService: UomCategoryService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations) {

    this.docForm = this.fb.group({
      purchaseOrderId: [""],
      poDate: [moment().format('DD/MM/YYYY')],
      poDateObj: [moment().format('YYYY-MM-DD'), [Validators.required]],
      purchaseType: ["", [Validators.required]],
      vendorId: ["", [Validators.required]],
      vendorAddress: [""],
      vendorCity: [""],
      vendorState: [""],
      vendorCountry: [""],
      vendorZip: [""],
      destinationLocation: [""],
      termsConditions: [""],
      remarks: [""],

      //After detail row
      subTotal: [""],
      discount: [""],
      otherCharges: [""],
      total: [""],

      lopFile: [""],
      lopUpload: [""],
      loginedUser: this.tokenStorage.getUserId(),
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

      purchaseOrderDetail: this.fb.array([
        this.fb.group({
          purchaseOrderId: [""],
          itemId: [''],
          edd: [''],
          eddObj: [''],
          uomId: [''],
          qty: [''],
          unitPrice: [''],
          price: [''],
          discountType: [''],
          discount: [''],
          discountPercent: [''],
          netPrice: [''],
          requisitionId: ['']
        })
      ]),
    });
  }

  ngOnInit() {

    

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
    
    this.httpService.get<any>(this.commonService.getVendorDropdown +"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.vendorList = data;
      },
      error: (error) => {
      }
    });

    this.fetchItem(this.companyId);

    //Item Master Dropdown List
    this.httpService.get<any>(this.commonService.getItemMasterNameWithItemCodeDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.itemCodeNameList = data;
      },
      error: (error) => {

      }
    }
    );
    
      //Company Based Uom
      this.httpService.get(this.uomCategoryService.fetchUomCategoryName + "?company=" + this.companyId).subscribe((res: any) => {
        this.categoryList = res.uomCategoryList;
       },
         (err: HttpErrorResponse) => {
           // error code here
         }
       );    

       this.fetchLocation();

    //Discount Type List 
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 28).subscribe({
      next: (data) => {
        this.discountTypeList = data;
      },
      error: (error) => {
      }
    });


    //UOM Dropdown List
    this.httpService.get<any>(this.commonService.getUOMDropdown).subscribe({
      next: (data) => {
        this.uomList = data;
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

  onSubmit() {
    if (this.docForm.valid) {
      this.purchaseOrder = this.docForm.value;
      this.spinner.show();
      this.purchaseOrderService.addPurchaseOrder(this.purchaseOrder).subscribe({
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
  }

  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }
    this.spinner.show();
    this.purchaseOrderService.editPurchaseOrder(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        let hdate = this.commonService.getDateObj(res.purchaseOrder.poDate);
        this.fetchItem(this.companyId);


        this.docForm.patchValue({
          'purchaseOrderId': res.purchaseOrder.purchaseOrderId,
          'poDate': res.purchaseOrder.poDate,
          'poDateObj': hdate,
          'purchaseType': res.purchaseOrder.purchaseType,
          'vendorId': res.purchaseOrder.vendorId,
          'vendorAddress': res.purchaseOrder.vendorAddress,
          'vendorCity': res.purchaseOrder.vendorCity,
          'vendorState': res.purchaseOrder.vendorState,
          'vendorCountry': res.purchaseOrder.vendorCountry,
          'vendorZip': res.purchaseOrder.vendorZip,
          'destinationLocation': res.purchaseOrder.destinationLocation,
          'termsConditions': res.purchaseOrder.termsConditions,
          'remarks': res.purchaseOrder.remarks,

          //After detail row
          'subTotal': Number(res.purchaseOrder.subTotal).toFixed(2),
          'discount': Number(res.purchaseOrder.discount).toFixed(2),
          'otherCharges': Number(res.purchaseOrder.otherCharges).toFixed(2),
          'total': Number(res.purchaseOrder.total).toFixed(2), 
          'lopUpload':  res.purchaseOrder.lopUpload
        })


        if (res.purchaseOrder.lopUpload != undefined && res.purchaseOrder.lopUpload != null && res.purchaseOrder.lopUpload != '') {
          this.filePathUrl = res.purchaseOrder.lopUpload;
        }

        if (res.purchaseOrderDetailList != null && res.purchaseOrderDetailList.length >= 1) {
          let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
          purchaseOrderDetailArray.removeAt(0);
          res.purchaseOrderDetailList.forEach(element => {
            let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
            let cdate = this.commonService.getDateObj(element.edd);
            let arraylen = purchaseOrderDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              purchaseOrderId: [element.purchaseOrderId],
              itemId: [element.itemId]+"",
              edd: [element.edd],
              eddObj: cdate,
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
            purchaseOrderDetailArray.insert(arraylen, newUsergroup);
          });
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
   

  update() {
    if (this.docForm.valid) {
      this.purchaseOrder = this.docForm.value;
      this.spinner.show();
      this.purchaseOrderService.updatePurchaseOrder(this.purchaseOrder).subscribe({
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
      // let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
      // purchaseOrderDetailArray.clear();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId': this.tokenStorage.getCompanyId(),
        'branchId': this.tokenStorage.getBranchId(),
        'poDate': moment().format('DD/MM/YYYY'),
        'poDateObj': moment().format('YYYY-MM-DD'),
      })
    } else {
      this.fetchDetails(this.requestId);
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
    this.router.navigate(['/inventory/purchaseOrder/listPurchaseOrder']);
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
    if (inputFlag == 'poDate') {
      this.docForm.patchValue({ poDate: cdate });
    }
    if (inputFlag == 'edd') {
      let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
      purchaseOrderDetailArray.at(index).patchValue({
        edd: cdate
      });
    }
  }




  removeRow(index) {
    let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
    purchaseOrderDetailArray.removeAt(index);
    this.calculateFinalsubTotalDiscountAndTotal();
  }

  addRow() {
    let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
    let arraylen = purchaseOrderDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      purchaseOrderId: [""],
      itemId: [''],
      edd: [''],
      eddObj: [''],
      uomId: [''],
      qty: [''],
      unitPrice: [''],
      price: [''],
      discountType: [''],
      discount: [''],
      discountPercent: [''],
      netPrice: [''],
      requisitionId: ['']
    })
    purchaseOrderDetailArray.insert(arraylen, newUsergroup);
  }

  //Vendor Address Details
  getVendorAddressDetails(vendorId: number) {
    this.httpService.get<any>(this.commonService.getVendorAddressDetails + "?vendorId=" + vendorId).subscribe({
      next: (data) => {
        this.docForm.patchValue({
          'vendorId': data.id,
          'vendorAddress': data.address,
          'vendorCity': data.cityName,
          'vendorState': data.stateName,
          'vendorCountry': data.countryName,
          'vendorZip': data.zip,
        })
      },
      error: (error) => {
      }
    });
  }

  //FOR DOCUMENT UPLOAD ADDED BY  Gokul
  onSelectFile(event) {
    var docfile = event.target.files[0];
    if (!this.acceptFileTypes.includes(docfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "bottom",
        "center"
      );
      return;
    }
    if (docfile.size > 5242880) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 5mb",
        "bottom",
        "center"
      );
      return;
    }
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "PurchaseOrder");

    this.httpService.post<any>(this.commonService.commonUploadFile, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'lopUpload': data.filePath
            })
            this.filePathUrl = data.filePath;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload File",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "bottom",
          "center"
        );
      }
    });
  }


  //FOR DOCUMENT VIEW ADDED BY Gokul
  viewDocuments(filePath: any, fileName: any) {
    this.spinner.show();
    this.commonService.viewDocument(filePath).pipe().subscribe({
      next: (result: any) => {
        this.spinner.hide();
        var blob = result;
        var fileURL = URL.createObjectURL(blob);
        if (fileName.split('.').pop().toLowerCase() === 'pdf') {
          window.open(fileURL);
        } else {
          var a = document.createElement("a");
          a.href = fileURL;
          a.target = '_blank';
          a.download = fileName;
          a.click();
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          "Failed to View File",
          "bottom",
          "center"
        );
      }
    });
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
      let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
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
          let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
          let totalNetPrice = Number(Number(data.get('price').value) - Number(data.get('discount').value)).toFixed(2);
          purchaseOrderDetailArray.at(index).patchValue({
            netPrice: totalNetPrice
          });
        } else {
          let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
          purchaseOrderDetailArray.at(index).patchValue({
            netPrice: Number(data.get('price').value).toFixed(2)
          });
        }
      } else if (data.get('discountType').value === 58) {
        if (data.get('discountPercent').value != undefined && data.get('discountPercent').value != null && data.get('discountPercent').value != '') {
          let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
          let discountAmount = (Number(data.get('discountPercent').value) / 100) * Number(data.get('price').value);
          let totalNetPrice = Number(Number(data.get('price').value) - Number(discountAmount)).toFixed(2);
          purchaseOrderDetailArray.at(index).patchValue({
            netPrice: totalNetPrice,
            discount: discountAmount
          });
        } else {
          let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
          purchaseOrderDetailArray.at(index).patchValue({
            netPrice: Number(data.get('price').value).toFixed(2)
          });
        }
      }
    } else {
      let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
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
    this.docForm.controls.purchaseOrderDetail['controls'].forEach((element) => {
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
      'discount':  Number(discountAmount).toFixed(2),
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

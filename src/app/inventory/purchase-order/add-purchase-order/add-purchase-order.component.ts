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
  purchaseTypeList: [];
  purchaseForList: [];
  discountTypeList: [];

  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public purchaseOrderService: PurchaseOrderService,
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
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationList = data;
      },
      error: (error) => {
      }
    });

    //Vendor  Dropdown List
    this.httpService.get<any>(this.commonService.getVendorDropdown).subscribe({
      next: (data) => {
        this.vendorList = data;
      },
      error: (error) => {
      }
    });

    //Item Master Dropdown List
    this.httpService.get<any>(this.commonService.getItemMasterNameWithItemCodeDropdown).subscribe({
      next: (data) => {
        this.itemCodeNameList = data;
      },
      error: (error) => {
      }
    });

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
          'subTotal': res.purchaseOrder.subTotal,
          'discount': res.purchaseOrder.discount,
          'otherCharges': res.purchaseOrder.otherCharges,
          'total': res.purchaseOrder.total,
          'lopUpload': res.purchaseOrder.lopUpload
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
              itemId: [element.itemId],
              edd: [element.edd],
              eddObj: cdate,
              uomId: [element.uomId],
              qty: [element.qty],
              unitPrice: [element.unitPrice],
              price: [element.price],
              discount: [element.discount],
              discountType: [element.discountType],
              discountPercent: [element.discountPercent],
              netPrice: [element.netPrice],
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
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId()
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
  }




  removeRow(index) {
    let purchaseOrderDetailArray = this.docForm.controls.purchaseOrderDetail as FormArray;
    purchaseOrderDetailArray.removeAt(index);
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

  //FOR DOCUMENT UPLOAD ADDED BY GOKUL
  onSelectFile(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "PurchaseOrder");

    this.httpService.post<any>(this.commonService.commonUploadFile, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          this.docForm.patchValue({
            'lopUpload': data.filePath
          })
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

  //FOR DOCUMENT VIEW ADDED BY GOKUL
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

}

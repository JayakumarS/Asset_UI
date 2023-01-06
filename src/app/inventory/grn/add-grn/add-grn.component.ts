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
  purchaseOrderNumberList= [];
  vendorList = [];
  countryList = [];
  locationList: [];
  itemList = [];
  uomList = [];
  edit: boolean = false;
  requestId: any;

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
      organizationName: ["", [Validators.required]],
      purchaseOrderNo: ["",[Validators.required]],
      grnDate:[moment().format('YYYY-MM-DD'),[Validators.required]],
      poType: ["", [Validators.required]],
      vendorId: [""],
      vendorAddress:[""],
      vendorCity:[""],
      vendorState:[""],
      vendorCountry:[""],
      transMode:1,
      invoiceNo: [""],
      dueDate: [""],
      invoiceDate: [moment().format('YYYY-MM-DD')],
      sourceLocId: [""],
      deliveryLocId: [""],
      description: [""],
      delOrderNo: [""],
      delOrderDate: [""],

      //After Detail Row
      subTotal:[""],
      discount:[""],
      otherCharges:[""],
      total:[""],
      remarks:[""],
      loginedUser: this.tokenStorage.getUserId(),

      grnDetailList: this.fb.array([
      this.fb.group({
        itemId: [""],  
        price: [""],
        discount: [""],
        discountPercentage:[""],
        netPrice: [""],
        finalTotal:[""],
      })
    ])
 
  });


  }

  ngOnInit() {
   //PurchaseOrderNumber Dropdown List
   this.httpService.get<any>(this.commonService.getPurchaseOrderNumberDropdown).subscribe({
    next: (data) => {
      this.purchaseOrderNumberList = data;
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

  //Country  Dropdown List
  this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
    next: (data) => {
      this.countryList = data;
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

  //Item Master Dropdown List
  this.httpService.get<any>(this.commonService.getItemMasterDropdown).subscribe({
    next: (data) => {
      this.itemList = data;
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
    }else{
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
    this.grnService.editGrn(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          
        })
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
    }else{
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
        'countryCode': '',
        'countryName': '',
        'currencyId': '',
        // 'clientType': '',
        'countryIsActive': false,
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
    const pattern = /[A-Z,a-z 0-9]/;
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

  getDateString(event,inputFlag){
    let cdate = this.commonService.getDate(event.target.value);
    if(inputFlag=='delOrderDate'){
      this.docForm.patchValue({delOrderDate:cdate});
    }
  };

  

  getPurchaseInvoiceDetails(POID:number) {
    if (POID != undefined && POID != null) {
      this.spinner.show();
      this.httpService.get<any>(this.purchaseOrderService.getPurchaseOrderDetailsList + "?purchaseOrderId="+POID).subscribe({
        next: (res: any) => {
        this.spinner.hide();
        if (res.success) {
          if(res.purchaseOrderDetailList!=null && res.purchaseOrderDetailList.length>=1){
            let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
            grnDetailArray.clear();
            res.purchaseOrderDetailList.forEach(element => {
              let grnDetailArray = this.docForm.controls.grnDetailList as FormArray;
              let arraylen = grnDetailArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                itemId: [element.itemId],  
                price: [element.price],
                discount: [element.discount],
                discountPercentage:[element.discountPercent],
                netPrice: [element.netPrice],
                finalTotal:[element.finalTotal],
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

}

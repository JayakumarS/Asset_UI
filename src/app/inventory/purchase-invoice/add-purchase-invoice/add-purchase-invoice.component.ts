import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseInvoiceService } from '../purchase-invoice.service';
import { PurchaseInvoice } from '../purchase-invoice.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { PurchaseOrderService } from '../../purchase-order/purchase-order.service';

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
  selector: 'app-add-purchase-invoice',
  templateUrl: './add-purchase-invoice.component.html',
  styleUrls: ['./add-purchase-invoice.component.sass'],
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

export class AddPurchaseInvoiceComponent implements OnInit {
  docForm: FormGroup;
  purchaseInvoice: PurchaseInvoice;
  currencyList: [];
  edit: boolean = false;
  requestId: any;
  purchaseInvoiceDetailList = [];
  hide3 = true;
  agree3 = false;
  dataarray = [];
  custList = [];
  DeliveryNoList = [];
  itemList = [];
  uomList = [];
  lpoList = [];
  vendorList = [];
  fetchLpoList = [];
  purchaseOrderNumberList= [];
  value1: number;
  value2: number;
  value3: number;

  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public purchaseInvoiceService: PurchaseInvoiceService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private purchaseOrderService:PurchaseOrderService) {

    this.docForm = this.fb.group({
      purchaseInvoiceNo: [""],
      purchaseInvoiceId: [""],
      purchaseInvoiceDate: [""],
      purchaseInvoiceDateObj: [""],
      partyInvoiceNo: [""],
      purchaseOrderNo: [""],
      partyInvoiceDate: [""],
      partyInvoiceDateObj: [""],
      dueDateObj: [""],
      dueDate: [""],
      companyName: ["ASSETCHEK"],
      narration: [""],
      vendor: [""],
      amount: [""],
      currency: [""],
      exchangerate: [""],
      loginedUser: this.tokenStorage.getUserId(),


      purchaseInvoiceDetailList: this.fb.array([
        this.fb.group({
          itemId: [""],
          qty: [""],
          uomid: [""],
          quotePrice: [""],
          ginDtlId: [""],
          userId: [""]
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

    //Currency  Dropdown List
    this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe({
      next: (data) => {
        this.currencyList = data;
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
      this.purchaseInvoice = this.docForm.value;
      this.spinner.show();
      this.purchaseInvoiceService.addPurchaseInvoice(this.purchaseInvoice).subscribe({
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
    this.purchaseInvoiceService.editPurchaseInvoice(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        let hpurchaseInvoiceDate= this.commonService.getDateObj(res.purchaseInvoice.purchaseInvoiceDate);
        let hpartyInvoiceDate = this.commonService.getDateObj(res.purchaseInvoice.partyInvoiceDate);
        let hdueDate = this.commonService.getDateObj(res.purchaseInvoice.dueDate);

        this.docForm.patchValue({
          'purchaseInvoiceId': res.purchaseInvoice.purchaseInvoiceId,
          'purchaseOrderNo': res.purchaseInvoice.purchaseOrderNo,
          'partyInvoiceNo': res.purchaseInvoice.partyInvoiceNo,
          'companyName': res.purchaseInvoice.companyName,
          'purchaseInvoiceDateObj': hpurchaseInvoiceDate,
          'purchaseInvoiceDate': res.purchaseInvoice.purchaseInvoiceDate,
          'partyInvoiceDateObj': hpartyInvoiceDate,
          'partyInvoiceDate': res.purchaseInvoice.partyInvoiceDate,
          'dueDateObj': hdueDate,
          'dueDate': res.purchaseInvoice.dueDate,
          'vendor': res.purchaseInvoice.vendor,
          'lpoNo': res.purchaseInvoice.lpoNo,
          'currency': res.purchaseInvoice.currency,
          'amount': res.purchaseInvoice.amount,
          'narration': res.purchaseInvoice.narration,
          'exchangerate': res.purchaseInvoice.exchangerate,
        });
      if(res.purchaseInvoiceDetailList!=null && res.purchaseInvoiceDetailList.length>=1){
        let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
        purchaseInvoiceDtlArray.removeAt(0);
        res.purchaseInvoiceDetailList.forEach(element => {
          let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
          let arraylen = purchaseInvoiceDtlArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            itemId: [element.itemId],
            qty: [element.qty],
            uomid: [element.uomid],
            quotePrice: [element.quotePrice]
          })
          purchaseInvoiceDtlArray.insert(arraylen, newUsergroup);
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
      this.purchaseInvoice = this.docForm.value;
      this.spinner.show();
      this.purchaseInvoiceService.updatePurchaseInvoice(this.purchaseInvoice).subscribe({
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
        'companyName': 'ASSETCHEK',
        'loginedUser': this.tokenStorage.getUserId()
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  // For Date related code
  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'purchaseInvoiceDate') {
      this.docForm.patchValue({ purchaseInvoiceDate: cdate });
    } else if (inputFlag == 'partyInvoiceDate') {
      this.docForm.patchValue({ partyInvoiceDate: cdate });
    } else if (inputFlag == 'dueDate') {
      this.docForm.patchValue({ dueDate: cdate });
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
    this.router.navigate(['/inventory/purchaseInvoice/listPurchaseInvoice']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  addRow() {
    let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
    let arraylen = purchaseInvoiceDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      itemId: [""],
      qty: [""],
      uomid: [""],
      quotePrice: [""],
    })
    purchaseInvoiceDtlArray.insert(arraylen, newUsergroup);
  }

  removeRow(index) {
    let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
    purchaseInvoiceDtlArray.removeAt(index);
  }

  getPurchaseInvoiceDetails(POID:number) {
    if (POID != undefined && POID != null) {
      this.spinner.show();
      this.httpService.get<any>(this.purchaseOrderService.getPurchaseOrderDetailsList + "?purchaseOrderId="+POID).subscribe({
        next: (res: any) => {
        this.spinner.hide();
        if (res.success) {
          if(res.purchaseOrderDetailList!=null && res.purchaseOrderDetailList.length>=1){
            let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
            purchaseInvoiceDtlArray.clear();
            res.purchaseOrderDetailList.forEach(element => {
              let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
              let arraylen = purchaseInvoiceDtlArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                itemId: [element.itemId],
                qty: [element.purchaseQty],
                uomid: [element.purchaseUOM],
                quotePrice: [element.price]
              })
              purchaseInvoiceDtlArray.insert(arraylen, newUsergroup);
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

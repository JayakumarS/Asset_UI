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
import * as moment from 'moment';
import { GrnService } from '../../grn/grn.service';
import { HttpErrorResponse } from '@angular/common/http';
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
  itemCodeNameList = [];
  uomList = [];
  vendorList = [];
  grnNumberList = [];
  locationList = [];
  itemList:[];
  companyId:any;
  locationDdList:[];

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
    public purchaseOrderService: PurchaseOrderService,
    private grnService: GrnService) {

    this.docForm = this.fb.group({
      purchaseInvoiceNo: [""],
      purchaseInvoiceId: [""],
      purchaseInvoiceDate: [moment().format('DD/MM/YYYY')],
      purchaseInvoiceDateObj: [moment().format('YYYY-MM-DD'), [Validators.required]],
      partyInvoiceNo: ["", [Validators.required]],
      grnId: ["", [Validators.required]],
      partyInvoiceDate: [""],
      partyInvoiceDateObj: [""],
      dueDate: [moment().format('DD/MM/YYYY')],
      dueDateObj: [moment().format('YYYY-MM-DD'), [Validators.required]],
      description: [""],
      total: [""],
      vendorId: ["", [Validators.required]],
      amount: [""],
      locationId: ["", [Validators.required]],
      currencyId: ["", [Validators.required]],
      exchangerate: [""],
      loginedUser: this.tokenStorage.getUserId(),
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),


      purchaseInvoiceDetailList: this.fb.array([
        this.fb.group({
          itemId: [""],
          unitPrice: [""],
          receivingQty: [""],
        })
      ])
    });

  }

  ngOnInit() {
    //GRN Dropdown List
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }
    this.httpService.post<any>(this.commonService.getGRNNumberDropdown,obj).subscribe({
      next: (data) => {
        this.grnNumberList = data;
      },
      error: (error) => {
      }
    });

    this.fetchItem(this.tokenStorage.getCompanyId());
    this.fetchLocation();

    //Vendor  Dropdown List
    this.httpService.get<any>(this.commonService.getVendorDropdown+"?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.vendorList = data;
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



    //Currency  Dropdown List
    this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe({
      next: (data) => {
        this.currencyList = data;
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
        let hpurchaseInvoiceDate = this.commonService.getDateObj(res.purchaseInvoice.purchaseInvoiceDate);
        let hpartyInvoiceDate = this.commonService.getDateObj(res.purchaseInvoice.partyInvoiceDate);
        let hdueDate = this.commonService.getDateObj(res.purchaseInvoice.dueDate);

        this.docForm.patchValue({
          'purchaseInvoiceId': res.purchaseInvoice.purchaseInvoiceId,
          'grnId': res.purchaseInvoice.grnId,
          'partyInvoiceNo': res.purchaseInvoice.partyInvoiceNo,
          'description': res.purchaseInvoice.description,
          'purchaseInvoiceDateObj': hpurchaseInvoiceDate,
          'purchaseInvoiceDate': res.purchaseInvoice.purchaseInvoiceDate,
          'partyInvoiceDateObj': hpartyInvoiceDate,
          'partyInvoiceDate': res.purchaseInvoice.partyInvoiceDate,
          'dueDateObj': hdueDate,
          'dueDate': res.purchaseInvoice.dueDate,
          'vendorId': res.purchaseInvoice.vendorId,
          'lpoNo': res.purchaseInvoice.lpoNo,
          'locationId': res.purchaseInvoice.locationId,
          'currencyId': res.purchaseInvoice.currencyId,
          'amount': res.purchaseInvoice.amount,
          // 'total': Number(res.purchaseInvoice.total).toFixed(2),
          'total' : res.purchaseInvoice.total,
          'exchangerate': res.purchaseInvoice.exchangerate,
        });
        if (res.purchaseInvoiceDetailList != null && res.purchaseInvoiceDetailList.length >= 1) {
          let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
          purchaseInvoiceDtlArray.removeAt(0);
          res.purchaseInvoiceDetailList.forEach(element => {
            let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
            let arraylen = purchaseInvoiceDtlArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              itemId: [element.itemId+""],
              unitPrice: [Number(element.unitPrice).toFixed(2)],
              receivingQty: [element.receivingQty]
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
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId': this.tokenStorage.getCompanyId(),
        'branchId': this.tokenStorage.getBranchId(),
        'purchaseInvoiceDate': moment().format('DD/MM/YYYY'),
        'purchaseInvoiceDateObj': moment().format('YYYY-MM-DD'),
        'dueDate': moment().format('DD/MM/YYYY'),
        'dueDateObj': moment().format('YYYY-MM-DD'),
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
      unitPrice: [""],
      receivingQty: [""],
    })
    purchaseInvoiceDtlArray.insert(arraylen, newUsergroup);
  }

  removeRow(index) {
    let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
    purchaseInvoiceDtlArray.removeAt(index);
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

  getGRNDetails(GRNID: number) {
    if (GRNID != undefined && GRNID != null) {
      this.spinner.show();
      this.httpService.get<any>(this.grnService.getGRNDetails + "?grnId=" + GRNID).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res.success) {
            this.docForm.patchValue({
              'total': res.grnDetailList[0].unitPrice,
              'vendorId': res.grn.vendorId,
            })
            if (res.grnDetailList != null && res.grnDetailList.length >= 1) {
              let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
              purchaseInvoiceDtlArray.clear();
              res.grnDetailList.forEach(element => {
                let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailList as FormArray;
                let arraylen = purchaseInvoiceDtlArray.length;
                let newUsergroup: FormGroup = this.fb.group({
                  itemId: [element.id],
                  unitPrice: [element.unitPrice],
                  receivingQty: [element.receivingQty]
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

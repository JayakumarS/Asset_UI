import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, startWith } from 'rxjs';
import { TransferService } from 'src/app/admin/transferasset/transfer.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

import { CommonService } from 'src/app/common-service/common.service';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { SalesInvoice } from '../sales-invoice.model';
import { SalesInvoiceService } from '../sales-invoice.service';

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
  selector: 'app-add-sales-invoice',
  templateUrl: './add-sales-invoice.component.html',
  styleUrls: ['./add-sales-invoice.component.sass'],
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
export class AddSalesInvoiceComponent implements OnInit {
  docForm: FormGroup;

  array: any;
  edit:boolean=false;
  options: any;
  filteredOptions: any;
  myControl: any;
  submitted: boolean;
  // tslint:disable-next-line:ban-types
  requestId: String;
  salesInvoice: SalesInvoice;
  company: [];
  currencyList: [];
  customerDropDown: [];
  dataarray = [];
  cusMasterData = [];
  user: string;
  // tslint:disable-next-line:new-parens
  salesDetailRowData = new SalesEntryDetailRowComponent;
  itemDropDown: [];
  uomDropDown: [];
  saleOrderDropDown: [];

  constructor(
    private salesInvoiceService: SalesInvoiceService,
    private spinner: NgxSpinnerService,
    public commonService: CommonService,
    private fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public tokenStorage: TokenStorageService,
    public transferservice: TransferService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,


  ) {}



  ngOnInit(): any {
    this.docForm = this.fb.group({
      salesInvoiceNo: [""],
      companyName: [""],
      cusInvoiceDate: [""],
      customer: [""],
      amount: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      salesOrderNo: [""],
      exRate: [""],
      exKshRate: [""],
      narration: [""],
      delivaryNo: [""],
      loginedUser: this.tokenStorage.getUserId(),
      company: this.tokenStorage.getCompanyId(),

      salesInvoiceDetail: this.fb.array([
        this.fb.group({
          item: [""],
          qty: [""],
          uom: [""],
          price: [""]


        })
      ])
    });
    this.route.params.subscribe(params => {
      if (params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit = true;
       this.dataarray.push(this.salesDetailRowData);
       this.cusMasterData.push(this.docForm);
       this.cusMasterData.push(this.dataarray);
       // For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });

 // Currency  Dropdown List
    this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe({
  next: (data) => {
    this.currencyList = data;
  },
  error: (error) => {
  }
});

    this.user = this.tokenStorage.getCompanyId();


    this.httpService.get<any>(this.commonService.getCustomerDropdown + "?userId=" + (this.user)).subscribe({
    next: (data) => {
      this.customerDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });
    this.httpService.get<any>(this.salesInvoiceService.itemDropdown + "?companyId=" + (this.user)).subscribe({
    next: (data) => {
      this.itemDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });

    this.httpService.get<any>(this.salesInvoiceService.getUomListDropdown + "?companyId=" + (this.user)).subscribe({
    next: (data) => {
      this.uomDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });

    this.httpService.get<any>(this.salesInvoiceService.getSalesOrderListDropdown + "?companyId=" + (this.user)).subscribe({
    next: (data) => {
      this.saleOrderDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });

}

  onSubmit() {
    this.submitted = true;
    if (this.docForm.valid){
      this.salesInvoice = this.docForm.value;
      this.spinner.show();
      this.salesInvoiceService.AddSalesInvoiceComponent(this.salesInvoice).subscribe({
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
 onCancel(){
     this.router.navigate(['/inventory/salesInvoice/list-sales-invoice']);
}

fetchDetails(salesInvoiceNo: any): void {
   const obj = {
    editid: salesInvoiceNo
  };
   this.salesInvoiceService.editSalesInvoice(obj).subscribe({
    next: (res) => {
    this.docForm.patchValue({
      'salesInvoiceNo': res.salesInvoiceBean.salesInvoiceNo,
        'companyName': res.salesInvoiceBean.companyName,
        'cusInvoiceDate': res.salesInvoiceBean.cusInvoiceDate,
        'customer' : res.salesInvoiceBean.customer,
        'amount' : res.salesInvoiceBean.amount,
        'currency': res.salesInvoiceBean.currency,
        'salesOrderNo':  res.salesInvoiceBean.salesOrderNo,
        'exRate': res.salesInvoiceBean.exRate,
        'exKshRate': res.salesInvoiceBean.exKshRate,
        'narration': res.salesInvoiceBean.narration,
        'delivaryNo': res.salesInvoiceBean.delivaryNo,
        'item': res.salesInvoiceBean.item,
        'uom': res.salesInvoiceBean.uom,
        'qty': res.salesInvoiceBean.qty,
        'price': res.salesInvoiceBean.price,


    });
    if (res.salesInvoiceDetail != null && res.salesInvoiceDetail.length >= 1) {
      let salesInvoiceDetailArray = this.docForm.controls.salesInvoiceDetail as FormArray;
      salesInvoiceDetailArray.clear();
      res.salesInvoiceDetail.forEach(element => {
        let salesInvoiceDetailArray = this.docForm.controls.salesInvoiceDetail as FormArray;
        let arraylen = salesInvoiceDetailArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          item: [ element.item],
          uom: [ element.uom],
          qty: [ element.qty],
          price: [element.price],
        })
        salesInvoiceDetailArray.insert(arraylen, newUsergroup);
      });
    }
  },
  error: (error) => {
  }
});
}

update() {
  this.salesInvoice = this.docForm.value;
  this.spinner.show();
  this.salesInvoiceService.update(this.salesInvoice).subscribe({
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

  reset() {
    if (!this.edit) {
    this.docForm = this.fb.group({
      companyName: [],
      cusInvoiceDate: [],
      customer: [],
      amount: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      salesOrderNo: [""],
      exRate: [""],
      exKshRate: [""],
      narration: [""],
      delivaryNo: [""],
      salesInvoiceDetail: this.fb.array([
        this.fb.group({
          item: [""],
          qty: [""],
          uom: [""],
          price: [""]

        })
      ])
    });
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

  addRow() {

    const CustInvoiceDetailBeanArray = this.docForm.controls.salesInvoiceDetail as FormArray;
    const arraylen = CustInvoiceDetailBeanArray.length;
    const newUsergroup: FormGroup = this.fb.group({
      item: [""],
      qty: [""],
      uom: [""],
      price: [""],
    });
    CustInvoiceDetailBeanArray.insert(arraylen, newUsergroup);
  }

  // For Date related code
  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'transferDate') {
      this.docForm.patchValue({ transferDate: cdate });
    }
  }

  removeRow(index) {
    const CustInvoiceDetailBeanArray = this.docForm.controls.salesInvoiceDetail as FormArray;
    CustInvoiceDetailBeanArray.removeAt(index);
  }


  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  openPopupdeliveryOrderDtlList() {

    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

  }


}



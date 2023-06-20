import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { SalesOrderService } from '../sales-order.service';
import { SalesOrder } from '../sales-order-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SalesInvoiceService } from '../../sales-invoice/sales-invoice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatDialog } from '@angular/material/dialog';
import { AddUploadViewComponent } from '../add-upload-view/add-upload-view.component';


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
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.sass'],
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
export class AddSalesOrderComponent implements OnInit {
  docForm: FormGroup;
  salesOrder:SalesOrder;
  edit: any;
  requestId: any;
  currencyList: [];
  submitted: boolean;
  customerDropDown: [];
  user: string;
  customer: any;
  itemDropDown: [];
  uomDropDown: [];
  assetDropdown: [];
  value: any;
  value1: any;
  currencyListbasedCompany=[];
  totalValue:number;
  filePathUrl: any;
  uploadFile: boolean = false;
  
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]

  subs: any;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
    private salesInvoiceService: SalesInvoiceService,
    private cmnService:CommonService,private httpService: HttpServiceService,private salesOrderService: SalesOrderService,
    private router:Router,public route: ActivatedRoute,    private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,
    private serverUrl: serverLocations,public dialog: MatDialog,

    )
     {    this.docForm = this.fb.group({
      salesNo:[""],
      customer:[""],
      currency:[""],
      dateofdelivery:[""],
      dateofdeliveryObj:[""],
      termsandcondition:[""],
      companyId:[""],
      salesOrderNo:[""],
      total:[""],
      uploadFiles: [""],

      salesOrderDtl: this.fb.array([
        this.fb.group({
          product:["",[Validators.required]],
          uom:[""],
          rate:["",[Validators.required]],
          qty:["",[Validators.required]],
          price:[""],
          total:[""],
          asset:["",[Validators.required]]

        })
      ])


    })
  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='dateofdelivery'){
      this.docForm.patchValue({dateofdelivery:cdate});
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
     this.edit=true;
    this.fetchDetails(this.requestId) ;

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
  this.user = this.tokenStorage.getCompanyId();


    this.httpService.get<any>(this.commonService.getCustomerDropdown + "?userId=" + (this.user)).subscribe({
    next: (data) => {
      this.customerDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });

  ///////////////company based Currency List
  this.httpService.get<any>(this.salesOrderService.getCompanyBasedCurrency + "?userId=" + (this.user)).subscribe({
    next: (data) => {
      this.currencyListbasedCompany = data.salesOrderBean;
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
  }

  fetchDetails(salesOrderNo:any){
    const obj = {
      editid: salesOrderNo
    };
    this.salesOrderService.editSalesOrder(obj).subscribe({
      next: (res) => {
        let hdate = this.cmnService.getDateObj(res.salesOrderBean.dateofdelivery);

        if (res.salesOrderBean.uploadFiles != undefined && res.salesOrderBean.uploadFiles != null && res.salesOrderBean.uploadFiles != '') {
          this.filePathUrl = res.salesOrderBean.uploadFiles;
        }

       this.customer= res.salesOrderBean.customer;
      this.docForm.patchValue({
         'salesNo': res.salesOrderBean.salesNo,
          'salesOrderNo': res.salesOrderBean.salesOrderNo,
          'customer':parseInt( res.salesOrderBean.customer),
          'currency': parseInt( res.salesOrderBean.currency),
          'dateofdelivery' : res.salesOrderBean.dateofdelivery,
          'dateofdeliveryObj': hdate,
          'termsandcondition' : res.salesOrderBean.termsandcondition,
          'total': res.salesOrderBean.total

      });
      if (res.salesOrderDetail != null && res.salesOrderDetail.length >= 1) {
        let salesOrderDetailArray = this.docForm.controls.salesOrderDtl as FormArray;
        salesOrderDetailArray.clear();
        
        res.salesOrderDetail.forEach(element => {
          let salesOrderDetailArray = this.docForm.controls.salesOrderDtl as FormArray;
          let arraylen = salesOrderDetailArray.length;
          this.fetchAssetDetails(element.product);
          let newUsergroup: FormGroup = this.fb.group({
            product: [parseInt( element.product)],
            uom: [parseInt( element.uom)],
            asset:[parseInt(element.asset)],
            rate: [ element.rate],
            total: [ element.total],
            qty: [ element.qty],
            price: [element.price],
          })
          salesOrderDetailArray.insert(arraylen, newUsergroup);
        });
      }
    },
    error: (error) => {
    }
  });
  }

  fetchAssetDetails(product: any) {
    this.httpService.get(this.salesInvoiceService.fetchAsset + "?product=" + product).subscribe((res: any) => {
      this.assetDropdown = res.addressBean;
    },
      (err: HttpErrorResponse) => {
      }
    );
  }



update() {
  this.salesOrder = this.docForm.value;
  this.spinner.show();
  this.salesOrderService.update(this.salesOrder).subscribe({
    next: (data) => {
      this.spinner.hide();
      if (data.success) {
        this.showNotification(
          "snackbar-success",
          "Edit Record Successfully",
          "bottom",
          "center"
        );
        this.cancel();
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
      customer:[""],
      currency:[""],
      dateofdelivery:[""],
      termsandcondition:[""],
      salesOrderDtl: this.fb.array([
        this.fb.group({
          product:[""],
          uom:[""],
          asset:[""],
          rate:[""],
          qty:[""],
          price:[""],
          total:[""],

        })
      ])
    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }


  removeRowSelf(index){
    let dtlArray = this.docForm.controls.salesOrderDtl as FormArray;
    // if(index != 0){
    dtlArray.removeAt(index);
    // }

  }

  addRowSelf(){
    let dtlArray = this.docForm.controls.salesOrderDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
          product:[""],
          uom:[""],
          rate:[""],
          qty:[""],
          price:[""],
          total:[""],
          asset:[""]
    })
    dtlArray.insert(arraylen,newUsergroup);

  }


onSubmit() {
  this.submitted = true;
  if (this.docForm.valid){
    this.salesOrder = this.docForm.value;
    this.spinner.show();
    this.salesOrderService.save(this.salesOrder).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.cancel();
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

// reset() {
//   location.reload()

//   if (!this.edit) {
//     this.docForm.reset();
//     this.docForm.patchValue({
//       customer:[""],
//       currency:[""],
//       dateofdelivery:[""],
//       termsandcondition:[""],

//     })
//   } else {
//     this.fetchDetails(this.requestId);
//   }
// }

cancel(){
  this.router.navigate(['/inventory/sales-order/list-sales-order']);

}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
Amountcalculation(index:any){
  let fetchAccHeadArray = this.docForm.controls.salesOrderDtl as FormArray;
  this.value=fetchAccHeadArray.value[index].qty * Number(fetchAccHeadArray.value[index].rate);
  fetchAccHeadArray.value[index].price=this.value;
  fetchAccHeadArray.at(index).patchValue({
    price:this.checkIsNaN(parseFloat(this.value)),
  });

  var i = 0;
  var length = fetchAccHeadArray.controls.length;
  this.totalValue = 0;
  for (i = 0; i < length; i++) {
    this.totalValue = this.totalValue + fetchAccHeadArray.value[i].price;
  }
  this.docForm.patchValue({
    total: this.totalValue
  });
}

Qtycalculation(index:any){
  let fetchAccHeadArray = this.docForm.controls.salesOrderDtl as FormArray;
  this.value1=fetchAccHeadArray.value[index].rate * Number(fetchAccHeadArray.value[index].qty);
  fetchAccHeadArray.value[index].price=this.value1;
  fetchAccHeadArray.at(index).patchValue({
    price:this.checkIsNaN(parseFloat(this.value1)),
  });
}

checkIsNaN = function(value){
  if(isNaN(value))
      value = 0

  return value;
}


keyPressNumeric1(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

onSelectFile(event) {
  var docfile = event.target.files[0];
  if (!this.acceptFileTypes.includes(docfile.type)) {
    this.docForm.get('uploadFiles').setValue("");
    this.showNotification(
      "snackbar-danger",
      ".pdf, .jpg, .png only allowed",
      "top",
      "right"
    );
    return;
  }
  if (docfile.size > 5242880) {
    this.docForm.get('uploadFiles').setValue("");
    this.showNotification(
      "snackbar-danger",
      "Please upload valid image with less than 5mb",
      "top",
      "right"
    );
    return;
  }
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName", fileExtension);
  frmData.append("folderName", "PurchaseInvoiceFile");

  this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
    next: (data) => {
      if (data.success) {
        if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
          this.docForm.patchValue({
            'uploadFiles': data.filePath
          })
          this.filePathUrl = data.filePath;
          this.uploadFile = true;
        }
      } else {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "top",
          "right"
        );
      }
    },
    error: (error) => {
      this.showNotification(
        "snackbar-danger",
        "Failed to upload File",
        "top",
        "right"
      );
    }
  });
}

viewDocuments(filePath: any, fileName: any) {
  var a = document.createElement("a");
  a.href = this.serverUrl.apiServerAddress + "asset_upload/" + filePath;
  a.target = '_blank';
  a.download = fileName;
  a.click();
}

singleAssetPopup(row) {
  console.log(row.tab.textLabel);
  if (row.tab.textLabel == 'Add Multiple Assets') {
    this.uploadpopupCall();
  }
}

uploadpopupCall() {
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(AddUploadViewComponent, {
    data: {
      action: "edit",
      data:this.filePathUrl
    },
    width: "640px",
    height: "640px",
    direction: tempDirection,
  });
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
     
      // this.showNotification(
      //   "black",
      //   "Edit Record Successfully...!!!",
      //   "top",
      //   "right"
      // );
    }
  });
}

}

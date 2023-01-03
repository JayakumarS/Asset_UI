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

@Component({
  selector: 'app-add-purchase-invoice',
  templateUrl: './add-purchase-invoice.component.html',
  styleUrls: ['./add-purchase-invoice.component.sass']
})
export class AddPurchaseInvoiceComponent implements OnInit {
  docForm: FormGroup;
  purchaseInvoice: PurchaseInvoice;
  currencyList: [];
  edit: boolean = false;
  requestId: any;
  purchaseInvoiceDetailBean = [];
  hide3 = true;
  agree3 = false;
  dataarray = [];
  custList = [];
  currList = [];
  DeliveryNoList = [];
  itemList = [];
  uomList = [];
  lpoList = [];
  vendorList = [];
  fetchLpoList = [];
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
    private snackBar: MatSnackBar) {

    this.docForm = this.fb.group({
      purchaseInvoiceNo: [""],
      purchaseInvoiceDate: [""],
      purchaseInvoiceDateObj: [""],
      partyInvoiceNo: [""],
      purchaseOrderNo: [""],
      partyInvoiceDate: [""],
      partyInvoiceDateObj: [""],
      dueDateObj: [""],
      dueDate: [""],
      companyName: ["ASSETCHEK"],
      deliveryNo: [""],
      narration: [""],
      customer: [""],
      amount: [""],
      currency: [""],
      exchangerate: [""],
      exchangeRateksh: [""],
      lpoNo: [""],
      bcAmount: [""],
      tcAmount: [""],


      purchaseInvoiceDetailBean: this.fb.array([
        this.fb.group({
          itemId: [""],
          qty: [""],
          uomid: [""],
          quotePrice: [""],
          ginDtlId: [""],
          deliveryNo: [""],
          userId: [""]
        })
      ])
    });

  }

  ngOnInit() {
    //Currency  Dropdown List
    this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe({
      next: (data) => {
        this.currencyList = data;
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
        let hdate = this.commonService.getDateObj(res.financePurchaseInvoiceBean.purchaseInvoiceDate);
        this.docForm.patchValue({
          'purchaseInvoiceNo': res.financePurchaseInvoiceBean.purchaseInvoiceNo,
          'purchaseOrderNo': res.financePurchaseInvoiceBean.purchaseOrderNo,
          'partyInvoiceNo': res.financePurchaseInvoiceBean.partyInvoiceNo,
          'companyName': res.financePurchaseInvoiceBean.companyName,
          'purchaseInvoiceDateObj': hdate,
          'purchaseInvoiceDate': res.financePurchaseInvoiceBean.purchaseInvoiceDate,
          'partyInvoiceDateObj': hdate,
          'partyInvoiceDate': res.financePurchaseInvoiceBean.partyInvoiceDate,
          'dueDateObj': hdate,
          'dueDate': res.financePurchaseInvoiceBean.dueDate,
          'customer': res.financePurchaseInvoiceBean.customer,
          'lpoNo': res.financePurchaseInvoiceBean.lpoNo,
          'currency': res.financePurchaseInvoiceBean.currency,
          'amount': res.financePurchaseInvoiceBean.amount,
          'narration': res.financePurchaseInvoiceBean.narration,
          'deliveryNo': res.financePurchaseInvoiceBean.deliveryNo,
          'exchangerate': res.financePurchaseInvoiceBean.exchangerate,
          'exchangeRateksh': res.financePurchaseInvoiceBean.exchangeRateksh,
          'tcAmount': res.financePurchaseInvoiceBean.tcAmount,
          'bcAmount': res.financePurchaseInvoiceBean.bcAmount,
        });
        let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailBean as FormArray;
        purchaseInvoiceDtlArray.removeAt(0);
        res.purchaseInvoiceDetailBean.forEach(element => {
          let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailBean as FormArray;
          let arraylen = purchaseInvoiceDtlArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            itemId: [element.itemId + ""],
            qty: [element.qty],
            uomid: [element.uomid + ""],
            quotePrice: [element.quotePrice],
            userId: [element.userId]
          })
          purchaseInvoiceDtlArray.insert(arraylen, newUsergroup);
        });
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
        'companyName':'ASSETCHEK',
        'loginedUser': this.tokenStorage.getUserId()
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  // For Date related code
getDateString(event,inputFlag,index){
  let cdate = this.commonService.getDate(event.target.value);
  if(inputFlag=='purchaseInvoiceDate'){
    this.docForm.patchValue({purchaseInvoiceDate:cdate});
  }else if(inputFlag=='partyInvoiceDate'){
    this.docForm.patchValue({partyInvoiceDate:cdate});
  }else if(inputFlag=='dueDate'){
    this.docForm.patchValue({dueDate:cdate});
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

  addRow(){
    let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailBean as FormArray;
    let arraylen = purchaseInvoiceDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      itemId:[""],
      qty:[""],
      uomid:[""],
      quotePrice:[""],
    })
    purchaseInvoiceDtlArray.insert(arraylen, newUsergroup);
  }
  
  removeRow(index){
    let purchaseInvoiceDtlArray = this.docForm.controls.purchaseInvoiceDetailBean as FormArray;
    purchaseInvoiceDtlArray.removeAt(index);
  }

}

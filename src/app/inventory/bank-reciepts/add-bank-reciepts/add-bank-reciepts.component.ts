import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DepartmentMasterService } from 'src/app/master/department-master/department-master.service';
import { SalesOrderService } from '../../sales-order/sales-order.service';
import { BankReceipt } from '../bank-reciepts.model';
import { BankReceiptservice } from '../bank-reciepts.service';

@Component({
  selector: 'app-add-bank-reciepts',
  templateUrl: './add-bank-reciepts.component.html',
  styleUrls: ['./add-bank-reciepts.component.sass'],
  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
        },
      }
    }]
})

export class AddBankRecieptsComponent implements OnInit {
  docForm: FormGroup;
  bankReceipt: BankReceipt;

  requestId: any;
  edit: boolean = false;
  companyList = [];
  bankReceiptDetailBean = [];
  currencyList = [];
  accountheadlist = [];
  userId: string;
  companyId: string;
  value: any;
  value1: any;
  value2: any;
  getUserBasedCompanyList = [];
  user: any;
  value5: any;
  value6: any;
  value62: any;
  value7: any;
  currencyListbasedCompany = [];
  salesInvoiceDropDown=[];

  constructor(private fb: FormBuilder, public router: Router,
    private httpService: HttpServiceService, public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private bankReceiptservice: BankReceiptservice,
    private notificationService: NotificationService,
    public commonService: CommonService,
    public tokenStorage: TokenStorageService,
    public salesOrderService: SalesOrderService,
    public departmentMasterService: DepartmentMasterService,
    private cmnService: CommonService,) {

    this.docForm = this.fb.group({
      voucherNo: [""],
      companyname: ["",[Validators.required]],
      receiptDate: ["",[Validators.required]],
      receiptDateObj: [""],
      chequeno: [""],
      chequeDate: [""],
      chequeDateObj: [""],
      payment: [""],
      bankAccount: [""],
      currency: [""],
      exchangerate: [""],
      receivedFrom: [""],
      tcAmountno: [""],
      bcAmountno: [""],
      narration: [""],
      totalBcAmt: [""],
      totalTcAmt: [""],
      salesInvoiceNo:[""],
      bankReceiptDetailBean: this.fb.array([
        this.fb.group({
          accountname: [""],
          subaccount: [""],
          invoiceno: [""],
          currencyno: [""],
          exchangerateno: [""],
          exchangerateKsh: [""],
          tcAmt: [""],
          bcAmt: [""]
        })
      ])
    });

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });

    this.userId = this.tokenStorage.getUserId();

    this.companyId = this.tokenStorage.getCompanyId(),
    /*************************************************************************/

    this.user = this.tokenStorage.getCompanyId();


    this.httpService.get<any>(this.bankReceiptservice.getSalesInvoice + "?companyId=" + (this.user)).subscribe({
      next: (data) => {
        this.salesInvoiceDropDown = data;
      },
      error: (error) => {
      }
    });

    /******************currency dropdown *************************************/
    this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe(
        (data) => {
          console.log(data);
          this.currencyList = data;

        });

    this.user = this.tokenStorage.getCompanyId();

    /******************company based user list *************************************/
    this.httpService.get<any>(this.departmentMasterService.companyListUrl + "?userId=" + this.user).subscribe(
      (data) => {
        this.getUserBasedCompanyList = data.getUserBasedCompanyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    /******************company based currency list *************************************/
    this.httpService.get<any>(this.salesOrderService.getCompanyBasedCurrency + "?userId=" + (this.user)).subscribe({
      next: (data) => {
        this.currencyListbasedCompany = data.salesOrderBean;
      },
      error: (error) => {
      }
    });


    /******************account_head *************************************/
    this.httpService.get<any>(this.commonService.getIncomeAccountHeadDropdown).subscribe(
      (data) => {
        this.accountheadlist = data;
      });

    /***************User Based Company List**************************/
    this.httpService.get<any>(this.bankReceiptservice.companyListUrl + "?userId=" + this.userId).subscribe(
      (data) => {
        this.companyList = data.getUserBasedCompanyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }

  /************************* calculations start ***************************/
  checkIsNaN = function (value) {
    if (isNaN(value))
      value = 0

    return value;
  }
  calculation123() {
    this.value = this.docForm.value.tcAmountno / this.docForm.value.exchangerate;
    this.docForm.value.bcAmountno = this.value;
    this.docForm.patchValue({
      'bcAmountno': this.checkIsNaN(this.value).toFixed(2),
      'tcAmountno': parseFloat(this.checkIsNaN(this.docForm.value.tcAmountno)).toFixed(2),

    })
  }
  calculation321() {
    this.value1 = this.docForm.value.tcAmountno / this.docForm.value.bcAmountno;
    this.docForm.value.exchangerate = this.value1;
    this.docForm.patchValue({
      'exchangerate': this.checkIsNaN(this.value1).toFixed(2),
      'bcAmountno': parseFloat(this.checkIsNaN(this.docForm.value.bcAmountno)).toFixed(2),

    })
  }
  calculation456() {
    this.value = this.docForm.value.tcAmountno / this.docForm.value.exchangerate;
    this.docForm.value.bcAmountno = this.value;
    this.docForm.patchValue({
      'bcAmountno': this.checkIsNaN(this.value).toFixed(2),
    })
  }

  TcAmountcalculation(index: any) {
    let fetchAccHeadArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    this.value5 = fetchAccHeadArray.value[index].tcAmt / fetchAccHeadArray.value[index].exchangerateno;
    fetchAccHeadArray.value[index].bcAmt = this.value5;
    fetchAccHeadArray.at(index).patchValue({
      bcAmt: this.checkIsNaN(parseFloat(this.value5).toFixed(2)),
      tcAmt: this.checkIsNaN(parseFloat(fetchAccHeadArray.value[index].tcAmt).toFixed(2))
    });
    this.totalAmountCalculation();
  }
  BcAmountcalculation(index: any) {
    let fetchAccHeadArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    this.value62 = fetchAccHeadArray.value[index].tcAmt / fetchAccHeadArray.value[index].bcAmt;
    fetchAccHeadArray.value[index].exchangerateno = this.value62;
    fetchAccHeadArray.at(index).patchValue({
      exchangerateno: this.checkIsNaN(parseFloat(this.value62).toFixed(2)),
      tcAmt: this.checkIsNaN(parseFloat(fetchAccHeadArray.value[index].tcAmt).toFixed(2))
    });
    this.totalAmountCalculation();
  }
  Exchangecalculation(index: any) {
    let fetchAccHeadArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    this.value7 = fetchAccHeadArray.value[index].tcAmt / fetchAccHeadArray.value[index].exchangerateno;
    fetchAccHeadArray.value[index].bcAmt = this.value7;
    fetchAccHeadArray.at(index).patchValue({
      bcAmt: this.checkIsNaN(parseFloat(this.value7).toFixed(2)),
    });
    this.totalAmountCalculation();
  }
  totalAmountCalculation() {
    debugger;
    var cbrDtlPartyAcctRowDatas = this.docForm.controls.bankReceiptDetailBean as FormArray;
    var bcAmt = 0, tcAmt = 0;
    for (var i = 0; i < cbrDtlPartyAcctRowDatas.length; i++) {
      var cbpTblRowData = cbrDtlPartyAcctRowDatas[i];
      if (cbrDtlPartyAcctRowDatas.value[i].bcAmt == "" || cbrDtlPartyAcctRowDatas.value[i].tcAmt == "") {
        bcAmt = bcAmt;
        tcAmt = tcAmt;
      } else {
        bcAmt = bcAmt + parseFloat(cbrDtlPartyAcctRowDatas.value[i].bcAmt);
        tcAmt = tcAmt + parseFloat(cbrDtlPartyAcctRowDatas.value[i].tcAmt);
      }

      this.docForm.value.totalBcAmt = this.checkIsNaN(bcAmt.toFixed(2));
      this.docForm.value.totalTcAmt = this.checkIsNaN(tcAmt.toFixed(2));
      this.docForm.patchValue({
        'totalBcAmt': this.checkIsNaN(this.docForm.value.totalBcAmt),
        'totalTcAmt': this.checkIsNaN(this.docForm.value.totalTcAmt),
      })

    };
  }


  /*****************************************calculations End *********************************/
  fetchDetails(voucherNo: any): void {
    this.httpService.get(this.bankReceiptservice.editbankReceipt + "?voucherNo=" + voucherNo).subscribe((res: any) => {
      let hdate = this.cmnService.getDateObj(res.bankReceiptBean.receiptDate);
      let idate = this.cmnService.getDateObj(res.bankReceiptBean.chequeDate);
      this.docForm.patchValue({
        'companyname': res.bankReceiptBean.companyname,
        'voucherNo': res.bankReceiptBean.voucherNo,
        'receiptDate': res.bankReceiptBean.receiptDate,
        'receiptDateObj': hdate,
        'chequeno': res.bankReceiptBean.chequeno,
        'chequeDate': res.bankReceiptBean.chequeDate,
        'chequeDateObj': idate,
        'payment': res.bankReceiptBean.payment,
        'bankAccount': res.bankReceiptBean.bankAccount,
        'currency': res.bankReceiptBean.currency,
        'exchangerate': res.bankReceiptBean.exchangerate,
        'receivedFrom': res.bankReceiptBean.receivedFrom,
        'salesInvoiceNo': res.bankReceiptBean.salesInvoiceNo,
        'tcAmountno': parseFloat(res.bankReceiptBean.tcAmountno).toFixed(2),
        'bcAmountno':parseFloat(res.bankReceiptBean.bcAmountno).toFixed(2), 
        'narration': res.bankReceiptBean.narration,
        'totalBcAmt': parseFloat(res.bankReceiptBean.totalBcAmt).toFixed(2),
        'totalTcAmt': parseFloat(res.bankReceiptBean.totalTcAmt).toFixed(2),
      })
      if (res.bankReceiptDetailBean != null && res.bankReceiptDetailBean.length >= 1) {
        let bankReceiptDetailArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
        bankReceiptDetailArray.clear();
          res.bankReceiptDetailBean.forEach(element => {
        let bankReceiptDetailArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
        let arraylen = bankReceiptDetailArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          accountname: [element.accountname],
          subaccount: [element.subaccount],
          invoiceno: [element.invoiceno],
          currencyno: [element.currencyno],
          exchangerateno: [parseFloat(element.exchangerateno).toFixed(2)],
          bcAmt: [parseFloat(element.bcAmt).toFixed(2)],
          tcAmt: [parseFloat(element.tcAmt).toFixed(2)],
        })
        bankReceiptDetailArray.insert(arraylen, newUsergroup);
      }); error: (error) => {
        // error code here
      }
    }
    });
  
  }
  addRow() {
    let bomDtlArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    let arraylen = bomDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      "accountname": [""],
      "subaccount": [""],
      "invoiceno": [""],
      "currencyno": [""],
      "exchangerateno": [""],
      "exchangerateKsh": [""],
      "tcAmt": [""],
      "bcAmt": [""]

    })
    bomDtlArray.insert(arraylen, newUsergroup);
  }
  removeRow(index) {
    let bomDtlArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    bomDtlArray.removeAt(index);
    this.totalAmountCalculation();

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'receiptDate') {
      this.docForm.patchValue({ receiptDate: cdate });
    }
    let edate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'chequeDate') {
      this.docForm.patchValue({ chequeDate: edate });
    }
  }
  onSubmit() {
    if (this.docForm.valid) {
      this.bankReceiptservice.save(this.docForm.value, this.router, this.notificationService);
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please Fill The All Required fields!",
        "top",
        "right"
      );
    }


  }

  onCancel() {
    this.router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);
  }
  reset() {
    if(!this.edit){
    
      this.docForm = this.fb.group({
        voucherNo: [""],
        companyname: ["",[Validators.required]],
        receiptDate: ["",[Validators.required]],
        receiptDateObj: [""],
        chequeno: [""],
        chequeDate: [""],
        chequeDateObj: [""],
        payment: [""],
        bankAccount: [""],
        currency: [""],
        exchangerate: [""],
        receivedFrom: [""],
        tcAmountno: [""],
        bcAmountno: [""],
        narration: [""],
        totalBcAmt: [""],
        totalTcAmt: [""],
        bankReceiptDetailBean: this.fb.array([
          this.fb.group({
            accountname: [""],
            subaccount: [""],
            invoiceno: [""],
            currencyno: [""],
            exchangerateno: [""],
            exchangerateKsh: [""],
            tcAmt: [""],
            bcAmt: [""]
          })
        ])
      });
  }else {
      this.fetchDetails(this.requestId);
    }

  }

  keyPressNumeric1(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z,' ']/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  update() {
    if (this.docForm.valid) {
      this.bankReceipt = this.docForm.value;
      this.bankReceiptservice.bankReceiptUpdate(this.bankReceipt);
      this.showNotification(
        "snackbar-success",
        "Record Updated Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);
    } else {
      this.showNotification(
        "snackbar-danger",
        "Not Added...!!!",
        "bottom",
        "center"
      );
    }
  }


}
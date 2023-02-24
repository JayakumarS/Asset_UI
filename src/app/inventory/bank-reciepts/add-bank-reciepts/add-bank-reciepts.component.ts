import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { DepartmentMasterService } from 'src/app/master/department-master/department-master.service';
import { BankReceipt } from '../bank-reciepts.model';
import { BankReceiptservice } from '../bank-reciepts.service';

@Component({
  selector: 'app-add-bank-reciepts',
  templateUrl: './add-bank-reciepts.component.html',
  styleUrls: ['./add-bank-reciepts.component.sass'],
   // Date Related code
 providers: [
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: {
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
    },
  }
}]
})

export class AddBankRecieptsComponent implements OnInit {
  docForm: FormGroup;
  requestId: any;
  edit: boolean;
  dataarray=[];
  index:any;
  cusMasterData =[];
  salesEntryData=[];
  companyList=[];
  filePathUrl: string;
  bankReceiptDetailBean = [];
  currencyList =[];
  accountheadlist =[];
  userId: string;
  companyId: string;
  bankReceipt:BankReceipt;



  salesDetailRowData = new SalesEntryDetailRowComponent;
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  value: any;
  value1: any;
  value2: any;
  value50: any;
  value60: any;
  value54: any;
  value55: any;
  getUserBasedCompanyList=[];
  user: any;

  constructor(private fb: FormBuilder,public router: Router,private authService: AuthService,
    private httpService: HttpServiceService,public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private bankReceiptservice: BankReceiptservice,
    private notificationService: NotificationService,
    public commonService: CommonService,
    public tokenStorage: TokenStorageService,

    public departmentMasterService:DepartmentMasterService,
    private cmnService:CommonService,) { 
    this.docForm = this.fb.group({
      "voucherNo":[""],
      "companyname":["",[Validators.required]],
      "receiptDate":[""],
      "receiptDateObj": [""],
      "chequeno":[""],
      "chequeDate":[""],
      "chequeDateObj": [""],
      "payment":[""],
      "bankAccount":[""],
      "currency":[""],
      "exchangerate":[""],
      "receivedFrom":[""],
      "tcAmountno":[""],
      "bcAmountno":[""],
      "narration":[""],
      "lopUpload": [""],
      "totalBcAmt":[""],
      "totalTcAmt":[""],
      bankReceiptDetailBean: this.fb.array([
      this.fb.group({
      "accountname":[""],
      "subaccount":[""],
      "invoiceno": [""],
      "currencyno":[""],
      "exchangerateno":[""],
      "exchangerateKsh": [""],
      "tcAmt":[""],
      "bcAmt":[""]


        }) 
        ])
    });

    
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       
      
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });

    this.dataarray.push(this.salesDetailRowData)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.userId = this.tokenStorage.getUserId();

    this.companyId = this.tokenStorage.getCompanyId(),
 
       //Currency  Dropdown List
    this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe(
    (data) => {
      console.log(data);
      this.currencyList = data;
      
  });
  
  this.user = this.tokenStorage.getCompanyId();

    //User Based Company List
    this.httpService.get<any>(this.departmentMasterService.companyListUrl + "?userId=" + this.user).subscribe(
      (data) => {
        this.getUserBasedCompanyList = data.getUserBasedCompanyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //account_head  
    this.httpService.get<any>(this.commonService.getIncomeAccountHeadDropdown).subscribe(
      (data) => {
        this.accountheadlist = data;
      });
     
   //User Based Company List
   this.httpService.get<any>(this.bankReceiptservice.companyListUrl + "?userId=" + this.userId).subscribe(
    (data) => {
      this.companyList = data.getUserBasedCompanyList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  ); 
    
  }
  checkIsNaN = function(value){
    if(isNaN(value))
        value = 0
        
    return value;
  }
  
  calculation123(){
     this.value=this.docForm.value.bcAmountno/this.docForm.value.exchangerate;
     this.docForm.value.tcAmountno=this.value;
     this.docForm.patchValue({
      'tcAmountno':this.checkIsNaN(parseFloat(this.value).toFixed(2)),
       'bcAmountno':parseFloat(this.checkIsNaN(this.docForm.value.bcAmountno )).toFixed(2)
     });
  }  
  calculation321(){
    this.value1=this.checkIsNaN(this.docForm.value.tcAmountno) / this.docForm.value.bcAmountno
    this.docForm.value.exchangerate=this.checkIsNaN(this.value1);
    this.docForm.value.tcAmountno=parseFloat(this.docForm.value.tcAmountno ).toFixed(2)
    this.docForm.patchValue({
      exchangerate:this.checkIsNaN(parseFloat(this.value1).toFixed(2))
    });   
    this.value2=this.docForm.value.tcAmountno * this.docForm.value.exchangerate;
    this.docForm.value.bcAmountno=this.value2;
    this.docForm.patchValue({
      bcAmountno:this.checkIsNaN(parseFloat(this.value2).toFixed(2)),
      tcAmountno:this.checkIsNaN(parseFloat(this.docForm.value.tcAmountno ).toFixed(2))
    }); 
  }

  TcAmountcalculation(index:any){
    let fetchAccHeadArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    this.value50=fetchAccHeadArray.value[index].tcAmt / fetchAccHeadArray.value[index].exchangerateno;
    fetchAccHeadArray.value[index].tcAmt =parseFloat(fetchAccHeadArray.value[index].tcAmt ).toFixed(2)
      fetchAccHeadArray.value[index].bcAmt=this.checkIsNaN(this.value50);
    fetchAccHeadArray.at(index).patchValue({
      bcAmt:this.checkIsNaN(parseFloat(this.value50).toFixed(2)),
      tcAmt:this.checkIsNaN(parseFloat(fetchAccHeadArray.value[index].tcAmt ).toFixed(2))
    });
    this.totalAmountCalculation();
  }
  BcAmountcalculation(index:any){
  let fetchAccHeadArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
  this.value60=fetchAccHeadArray.value[index].tcAmt / Number(fetchAccHeadArray.value[index].bcAmt);
  fetchAccHeadArray.value[index].exchangerateno=this.value60;
  fetchAccHeadArray.at(index).patchValue({
    exchangerateno:this.checkIsNaN(parseFloat(this.value60).toFixed(2)),
    bcAmt:this.checkIsNaN(parseFloat(fetchAccHeadArray.value[index].bcAmt ).toFixed(2))
  });

  this.value54=fetchAccHeadArray.value[index].bcAmt * fetchAccHeadArray.value[index].exchangerateno;
  fetchAccHeadArray.value[index].tcAmt=this.checkIsNaN(this.value54);
  fetchAccHeadArray.at(index).patchValue({
    tcAmt:this.checkIsNaN(parseFloat(this.value54).toFixed(2))
  });
  this.totalAmountCalculation();

}
  totalAmountCalculation(){
    debugger;
    var cbrDtlPartyAcctRowDatas = this.docForm.controls.bankReceiptDetailBean as FormArray;
    var bcAmt=0,tcAmt=0,kshAmt=0;    
    for (var i = 0; i < cbrDtlPartyAcctRowDatas.length; i++) {
        var cbpTblRowData = cbrDtlPartyAcctRowDatas[i];        
        if(cbrDtlPartyAcctRowDatas.value[i].accountname == '20080029'){
            bcAmt = bcAmt-parseFloat(cbrDtlPartyAcctRowDatas.value[i].bcAmt);
            tcAmt = tcAmt-parseFloat(cbrDtlPartyAcctRowDatas.value[i].tcAmt);
        }else if(cbrDtlPartyAcctRowDatas.value[i].bcAmt==""||cbrDtlPartyAcctRowDatas.value[i].tcAmt == ""){
          bcAmt = bcAmt;
          tcAmt = tcAmt;
          if(cbrDtlPartyAcctRowDatas.value[i].kshAmt == undefined){
          kshAmt = kshAmt ;
          }else{
            kshAmt = kshAmt ;

          }
        }else{
            bcAmt = bcAmt+parseFloat(cbrDtlPartyAcctRowDatas.value[i].bcAmt);
            tcAmt = tcAmt+parseFloat(cbrDtlPartyAcctRowDatas.value[i].tcAmt);
            if(cbrDtlPartyAcctRowDatas.value[i].kshAmt == undefined){
            kshAmt = kshAmt ;
            }else{
              kshAmt = kshAmt + parseFloat(cbrDtlPartyAcctRowDatas.value[i].kshAmt);

            }
        }
          
        this.docForm.value.totalBcAmt=this.checkIsNaN(bcAmt.toFixed(2));
        this.docForm.value.totalTcAmt=this.checkIsNaN(tcAmt.toFixed(2));
        this.docForm.value.kshTotalAmt = this.checkIsNaN(kshAmt.toFixed(2));
        this.docForm.patchValue({
          'totalBcAmt': this.checkIsNaN(this.docForm.value.totalBcAmt),
          'totalTcAmt': this.checkIsNaN(this.docForm.value.totalTcAmt),
          'kshTotalAmt': this.checkIsNaN(this.docForm.value.kshTotalAmt),
        })
         
     };
  }
  fetchDetails(requestId: any): void {
    this.httpService.get(this.bankReceiptservice.editbankReceipt + "?voucherNo=" + requestId).subscribe((res: any) => {
      let hdate = this.cmnService.getDateObj(res.bankReceiptBean.receiptDate);
      let idate = this.cmnService.getDateObj(res.bankReceiptBean.chequeDate);
      this.httpService.get<any>(this.departmentMasterService.companyListUrl + "?userId=" + this.user).subscribe(
        (data) => {
          this.getUserBasedCompanyList = data.getUserBasedCompanyList;
        }
      ),
      this.docForm.patchValue({
       'companyname': res.bankReceiptBean.companyname.toString(),
       'voucherNo': res.bankReceiptBean.voucherNo,
        'receiptDate': res.bankReceiptBean.receiptDate,
        'receiptDateObj': hdate,
        'chequeno': res.bankReceiptBean.chequeno,
        'chequeDate': res.bankReceiptBean.chequeDate,
        'chequeDateObj': idate,
        'payment': res.bankReceiptBean.payment,
        'bankAccount': res.bankReceiptBean.bankAccount,
        'currency': res.bankReceiptBean.currency,
        'exchangerate': parseFloat(res.bankReceiptBean.exchangerate).toFixed(2),
        'receivedFrom': res.bankReceiptBean.receivedFrom,
        'tcAmountno': parseFloat(res.bankReceiptBean.tcAmountno).toFixed(2),
        'bcAmountno': parseFloat(res.bankReceiptBean.bcAmountno).toFixed(2),
        'narration': res.bankReceiptBean.narration,
        'lopUpload': res.bankReceiptBean.lopUpload,
        'totalBcAmt': parseFloat(res.bankReceiptBean.totalBcAmt).toFixed(2),
        'totalTcAmt': parseFloat(res.bankReceiptBean.totalTcAmt).toFixed(2),
       
      })
        res.bankReceiptDetailBean.forEach(element => {
        let bankReceiptDetailArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
        bankReceiptDetailArray.removeAt(0);
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
    });

    }
  addRow(){
    let bomDtlArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    let arraylen = bomDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      "accountname":[""],
      "subaccount":[""],
      "invoiceno": [""],
      "currencyno":[""],
      "exchangerateno":[""],
      "exchangerateKsh": [""],
      "tcAmt":[""],
      "bcAmt":[""]
    
    })
    bomDtlArray.insert(arraylen,newUsergroup);
}
removeRow(index){
  let bomDtlArray = this.docForm.controls.bankReceiptDetailBean as FormArray;
    bomDtlArray.removeAt(index);

}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
getDateString(event,inputFlag,index){
  let cdate = this.cmnService.getDate(event.target.value);
  if(inputFlag=='receiptDate'){
    this.docForm.patchValue({receiptDate:cdate});
  }
  let edate = this.cmnService.getDate(event.target.value);
  if(inputFlag=='chequeDate'){
    this.docForm.patchValue({chequeDate:edate});
  }
}
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
onSubmit(){
  if(this.docForm.valid){
    this.bankReceiptservice.save(this.docForm.value,this.router,this.notificationService);
  }else{
    this.showNotification(
      "snackbar-danger",
      "Check Fields Must equal to Quantity!",
      "top",
      "right"
    );
  }


}

update() {
  this.bankReceipt=this.docForm.value;
  if(this.docForm.valid){
    this.bankReceipt = this.docForm.value;
    this.httpService.get(this.bankReceiptservice.updateBankReceipt + "?voucherNo=" + this.bankReceipt).subscribe((res: any) => {
    });
    // this.bankReceiptservice.updateBankReceipt(this.bankReceipt,this.router,this.notificationService);
  }else{
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }  

}

onCancel(){
  this.router.navigate(['/inventory/Bank-Reciepts/list-BankReciept']);  
}
reset(){
  this.docForm = this.fb.group({
    "companyname":[""],
      "receiptDate":[""],
      "receiptDateObj": [""],
      "chequeno":[""],
      "chequeDate":[""],
      "chequeDateObj": [""],
      "payment":[""],
      "bankAccount":[""],
      "currency":[""],
      "exchangerate":[""],
      "receivedFrom":[""],
      "TcAmountno":[""],
      "BcAmountno":[""],
      "narration":[""],
      "lopUpload": [""],
      bankReceiptDetailBean: this.fb.array([
        this.fb.group({
      "accountname":[""],
      "subaccount":[""],
      "invoiceno": [""],
      "currencyno":[""],
      "exchangerateno":[""],
      "exchangerateKsh": [""],
      "TcAmt":[""]
        })
      ])
    })
      
        
}

keyPressNumeric1(event: any) {
  const pattern = /[0-9]/;
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

}
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  route: any;
  requestId: any;
  edit: boolean;
  dataarray=[];
  index:any;
  cusMasterData =[];
  salesEntryData=[];
  companyList=[];
  filePathUrl: string;
  bankReceiptdtl = [];
  currencyList =[];
  accountheadlist =[];
  userId: string;
  companyId: string;



  salesDetailRowData = new SalesEntryDetailRowComponent;
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]

  constructor(private fb: FormBuilder,public router: Router,private authService: AuthService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private bankReceiptservice: BankReceiptservice,
    private notificationService: NotificationService,
private tokenstorage: TokenStorageService,
    public commonService: CommonService,
    private cmnService:CommonService,) { 
    this.docForm = this.fb.group({
      "companyname":[""],
      "receiptDate":[""],
      "receiptDateObj": [""],
      "chequeno":[""],
      "chequeDate":[""],
      "chequeDateObj": [""],
      "Payment":[""],
      "bankAccount":[""],
      "currency":[""],
      "exchangerate":[""],
      "receivedFrom":[""],
      "TcAmountno":[""],
      "BcAmountno":[""],
      "narration":[""],
      "lopUpload": [""],
      bankReceiptdtl: this.fb.array([
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
    });

    
  }
  ngOnInit(): void {
    this.dataarray.push(this.salesDetailRowData)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.userId = this.tokenstorage.getUserId();

    this.companyId = this.tokenstorage.getCompanyId(),

       //Currency  Dropdown List
   this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe(
    (data) => {
      console.log(data);
      this.currencyList = data;
      
  });
   //compamy
       this.userId = this.tokenstorage.getUserId();

    this.httpService.get<any>(this.commonService.getCompanyDropdown+ "?userId=" + this.userId).subscribe(
      (data) => {
        console.log(data);
        this.companyList = data;
        this.docForm.patchValue({
      
          'companyname':parseInt(this.companyId),
      });
    });

    //account_head  
    this.httpService.get<any>(this.commonService.getIncomeAccountHeadDropdown).subscribe(
      (data) => {
        console.log(data);
        this.accountheadlist = data;
      });
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
       this.docForm.patchValue({
        'bankReceiptId':this.requestId
     })
      }
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

  
  
  fetchDetails(requestId: any) {
    throw new Error('Method not implemented.');
  }
  addRow(){
 

    let bomDtlArray = this.docForm.controls.bankReceiptdtl as FormArray;
    let arraylen = bomDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      "accountname":[""],
      "subaccount":[""],
      "invoiceno": [""],
      "currencyno":[""],
      "exchangerateno":[""],
      "exchangerateKsh": [""],
      "TcAmt":[""]
    
    })
    bomDtlArray.insert(arraylen,newUsergroup);
}
removeRow(index){
  let bomDtlArray = this.docForm.controls.bankReceiptdtl as FormArray;
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
      "Payment":[""],
      "bankAccount":[""],
      "currency":[""],
      "exchangerate":[""],
      "receivedFrom":[""],
      "TcAmountno":[""],
      "BcAmountno":[""],
      "narration":[""],
      "lopUpload": [""],
      bankReceiptdtl: this.fb.array([
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
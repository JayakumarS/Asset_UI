import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';

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
  salesDetailRowData = new SalesEntryDetailRowComponent;
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]

  constructor(private fb: FormBuilder,public router: Router,private authService: AuthService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,

  
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
      "TcAmount":[""],
      "BcAmount":[""],
      "narration":[""],
      "lopUpload": [""]
    });
  }
  ngOnInit(): void {
    this.dataarray.push(this.salesDetailRowData)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)

    this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe(
      (data) => {
        console.log(data);
        this.companyList = data;
      });
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
   
      }
     });
  }
  fetchDetails(requestId: any) {
    throw new Error('Method not implemented.');
  }
  addRow(){
    this.salesDetailRowData=new SalesEntryDetailRowComponent()
    this.dataarray.push(this.salesDetailRowData)
}
removeRow(index){
 
this.dataarray.splice(index, 1);
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
    "TcAmount":[""],
    "BcAmount":[""],
    "narration":[""],
    "lopUpload": [""]

  });
}
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { LoanReportService } from '../loan-report.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Loanreport } from '../loan-report-model';
import { NotificationService } from 'src/app/core/service/notification.service';
import { serverLocations } from 'src/app/auth/serverLocations';


@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.sass'],
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
export class LoanReportComponent implements OnInit {
  panelOpenState = false;
  docForm: FormGroup;
  requestId:any;
  edit: boolean = false;
  UserId: string;
  loanreport:Loanreport

  loanholderList = [];
  loanrefList=[];
  loantypeList=[];
  currencyList=[];
  banknameList=[];
  bankifscList=[];
  loanHistoryList = [];


  // Array for Excel Header
  loanHistoryHeader=[];
  // Pagination
  config: {
    id : string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };

  constructor(private fb: FormBuilder,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private httpService: HttpServiceService,
    private loanReportService: LoanReportService,
    private notificationservice:NotificationService,
    private serverUrl:serverLocations,
    private router:Router
    ) { 
    this.docForm = this.fb.group({
      id:[],
      name:[""],
      loanRef:[""],
      type:[""],
      currencyl:[""],
      bankname:[""],
      ifsccode:[""],
      UserId:this.tokenStorage.getUserId(),

       // Checkboxes Beans
       nameCheckbox:[false],
       mailCheckBox:[false],
       loanRefCheckBox:[false],
       typeCheckBox:[false],
       loannoCheckbox:[false],
       loanAmountCheckBox:[false],
       loanStartDateCheckBox:[false],
       loanDueDateCheckBox: [false],
       currencylCheckbox: [false],
       amountCheckBox: [false],
       emiDateCheckBox: [false],
       interestRateCheckBox: [false],
       banknameCheckbox: [false],
       accountCheckBox: [false],
       ifsccodeCheckBox: [false],
       loginedUser: this.tokenStorage.getUserId(),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });

      // Getting UserId
      this.UserId=this.tokenStorage.getUserId();

      // loan-holder name
      this.httpService.get<any>(this.loanReportService.loanholder+"?UserId="+this.UserId).subscribe(
        (data) => {
        console.log(data);
        this.loanholderList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

      // loan refference
      this.httpService.get<any>(this.loanReportService.loanrefference+ "?UserId="+this.UserId).subscribe(
      
        (data) => {
        console.log(data);
        this.loanrefList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    // loan type
      this.httpService.get<any>(this.loanReportService.loantype+ "?UserId="+this.UserId).subscribe(
      
        (data) => {
        console.log(data);
        this.loantypeList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    // CURRENCY
      this.httpService.get<any>(this.loanReportService.currency+ "?UserId="+this.UserId).subscribe(
      
        (data) => {
        console.log(data);
        this.currencyList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    // BANK NAME
      this.httpService.get<any>(this.loanReportService.bankname+ "?UserId="+this.UserId).subscribe(
      
        (data) => {
        console.log(data);
        this.banknameList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    // BANK IFSC
      this.httpService.get<any>(this.loanReportService.bankifsc+ "?UserId="+this.UserId).subscribe(
      
        (data) => {
        console.log(data);
        this.bankifscList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  
  onSubmit(){
    this.loanreport = this.docForm.value;
    console.log(this.loanreport);

    this.httpService.post<any>(this.loanReportService.loanHistoryListUrl,this.loanreport).subscribe(
      (data) => {
        if(data.getloanHistoryListUrl!=null){
          if(data.getloanHistoryListUrl.length!=0){
            this.loanHistoryList = data.getloanHistoryListUrl;
          }else{
            this.loanHistoryList = data.getloanHistoryListUrl;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.loanHistoryList=[];
          this.notificationservice.showNotification(
            "snackbar-danger",
            "No Records Found",
            "bottom",
            "center"
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }

  exportExcel(){

    if(this.loanHistoryList.length >0){

    this.loanreport = this.docForm.value;
    console.log(this.loanreport);

    //For Excel Header Pushing in Array
    if(this.loanreport.nameCheckbox ==true){
      this.loanHistoryHeader.push("Loan-Holder Name");
    }
    if(this.loanreport.mailCheckBox ==true){
      this.loanHistoryHeader.push("EMAIL-ID");
    }
    if(this.loanreport.loanRefCheckBox ==true){
      this.loanHistoryHeader.push("LOAN REFERENCE");
    }
    if(this.loanreport.typeCheckBox ==true){
      this.loanHistoryHeader.push("LOAN TYPE");
    }
    if(this.loanreport.loannoCheckbox ==true){
      this.loanHistoryHeader.push("LOAN NUMBER");
    }
    if(this.loanreport.loanAmountCheckBox ==true){
      this.loanHistoryHeader.push("LOAN AMOUNT");
    }
    if(this.loanreport.loanStartDateCheckBox ==true){
      this.loanHistoryHeader.push("LOAN START DATE");
    }
    if(this.loanreport.loanDueDateCheckBox ==true){
      this.loanHistoryHeader.push("LOAN END DATE");
    }
    if(this.loanreport.currencylCheckbox ==true){
      this.loanHistoryHeader.push("CURRENCY");
    }
    if(this.loanreport.amountCheckBox ==true){
      this.loanHistoryHeader.push("EMI AMOUNT");
    }
    if(this.loanreport.emiDateCheckBox ==true){
      this.loanHistoryHeader.push("EMI DATE");
    }
    if(this.loanreport.interestRateCheckBox ==true){
      this.loanHistoryHeader.push("RATE OF INTEREST(%)");
    }
    if(this.loanreport.banknameCheckbox ==true){
      this.loanHistoryHeader.push("BANK NAME");
    }
    if(this.loanreport.accountCheckBox ==true){
      this.loanHistoryHeader.push("LOAN ACCOUNT No.");
    }
    if(this.loanreport.ifsccodeCheckBox ==true){
      this.loanHistoryHeader.push("BANK IFSC");
    }
    console.log(this.loanHistoryHeader);

    this.loanreport.loanExcelHistoryHeader = this.loanHistoryHeader;

    this.httpService.post<any>(this.loanReportService.loanHistoryListExcelUrl,this.loanreport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.loanHistoryHeader = [];
          }
          else{
            this.notificationservice.showNotification(
              "snackbar-danger",
              // data.message,
              "error",
              "bottom",
              "center"
            );
          }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  } else{
    
  }
}

  reset(){
    
      location.reload()
      this.docForm = this.fb.group({
        name:[""],
        loanRef:[""],
        type:[""],
        currencyl:[""],
        bankname:[""],
        ifsccode:[""],
  
         // Checkboxes Beans
         nameCheckbox:[false],
         mailCheckBox:[false],
         loanRefCheckBox:[false],
         typeCheckBox:[false],
         loannoCheckbox:[false],
         loanAmountCheckBox:[false],
         loanStartDateCheckBox:[false],
         loanDueDateCheckBox: [false],
         currencylCheckbox: [false],
         amountCheckBox: [false],
         emiDateCheckBox: [false],
         interestRateCheckBox: [false],
         banknameCheckbox: [false],
         accountCheckBox: [false],
         ifsccodeCheckBox: [false],
      });
  }
  
  pageChanged(event){
    this.config.currentPage = event;
  }

}


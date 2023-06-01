



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FdReport } from '../fixed-deposit-reports-model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonService } from 'src/app/common-service/common.service';
import { FixedDepositReportService } from '../fixed-deposit-report.service';
import { MutualFundService } from 'src/app/master/mutualfund/mutualfund.service';

@Component({
  selector: 'app-fixed-deposit-reports',
  templateUrl: './fixed-deposit-reports.component.html',
  styleUrls: ['./fixed-deposit-reports.component.sass'],
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

export class FixedDepositReportsComponent implements OnInit {
  panelOpenState = false;
  UserId:string;
  docForm: FormGroup;
  fdHistoryList = [];
  edit:boolean=false;
  requestId:any;
  investmentTermList = [];
  fdRefList = [];
  fixeddeposittypeList = [];
  currencyList = [];
  autoRenewalList = [];
  frequencyList = [];
  fdReport:FdReport;
  fixedDepositReportService:FixedDepositReportService;
  fdHistoryHeader=[];
  // Pagination

  config: {
    id : string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };

  constructor(private fb: FormBuilder,private httpService: HttpServiceService,
   private serverUrl:serverLocations,
    private router:Router,
    public route: ActivatedRoute,
    private notificationservice:NotificationService,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public mutualFundService : MutualFundService) { 
    this.docForm = this.fb.group({
      investmentTerm:[""],
      fixeddeposittype:[""],
      currency:[""],
      autoRenewal:[""],
      frequency:[""],
      loginUser:this.tokenStorage.getUserId(),

       // Checkboxes Beans
       fdNameCheckbox:[false],
       mailCheckBox:[false],
       fdRefCheckBox:[false],
       fixeddeposittypeCheckBox:[false],
       fdaccountNoCheckbox:[false],
       dueAmountCheckBox:[false],
       fdstartDateCheckBox: [false],
       fdendDateCheckBox: [false],
       currencyCheckbox: [false],
       penaltyAmtCheckBox: [false],
       investmentTermCheckBox: [false],
       interestCheckBox: [false],
       bankNameCheckbox: [false],
       ifsccodeCheckBox: [false],
       autoRenewalCheckBox: [false],
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

    this.httpService.get<any>(this.mutualFundService.getinvestmentTermList+"?UserId="+this.UserId).subscribe(
      (data) => {
      console.log(data);
      this.investmentTermList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  this.httpService.get<any>(this.mutualFundService.getautoRenewalList+"?UserId="+this.UserId).subscribe(
    (data) => {
    console.log(data);
    this.autoRenewalList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

this.httpService.get<any>(this.mutualFundService.getfixeddeposittypeList+"?UserId="+this.UserId).subscribe(
  (data) => {
  console.log(data);
  this.fixeddeposittypeList = data;
},
(error: HttpErrorResponse) => {
  console.log(error.name + " " + error.message);
}
);

this.httpService.get<any>(this.mutualFundService.getcurrencyList+"?UserId="+this.UserId).subscribe(
  (data) => {
  console.log(data);
  this.currencyList = data;
},
(error: HttpErrorResponse) => {
  console.log(error.name + " " + error.message);
}
);

this.httpService.get<any>(this.mutualFundService.getfrequencyList+"?UserId="+this.UserId).subscribe(
  (data) => {
  console.log(data);
  this.frequencyList = data;
},
(error: HttpErrorResponse) => {
  console.log(error.name + " " + error.message);
}
);

   }
  onSubmit(){

    this.fdReport = this.docForm.value;
    console.log(this.fdReport);

    this.httpService.post<any>(this.mutualFundService.fdHistoryListUrl,this.fdReport).subscribe(
      (data) => {
        if(data.getfdHistoryList!=null){
          if(data.getfdHistoryList.length!=0){
            this.fdHistoryList = data.getfdHistoryList;
          }else{
            this.fdHistoryList = data.getfdHistoryList;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.fdHistoryList=[];
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

    if(this.fdHistoryList.length >0){

    this.fdReport = this.docForm.value;
    console.log(this.fdReport);


    //For Excel Header Pushing in Array
    if(this.fdReport.fdNameCheckbox ==true){
      this.fdHistoryHeader.push("FD-HOLDER NAME");
    }
    if(this.fdReport.mailCheckBox == true){
      this.fdHistoryHeader.push("EMAIL-ID");
    }
    if(this.fdReport.fdRefCheckBox == true){
      this.fdHistoryHeader.push("FD REFERENCE");
    }
    if(this.fdReport.dueAmountCheckBox == true){
      this.fdHistoryHeader.push("Due Amount");
    }
    if(this.fdReport.fixeddeposittypeCheckBox == true){
      this.fdHistoryHeader.push("FD TYPE");
    }
    if(this.fdReport.fdaccountNoCheckbox == true){
      this.fdHistoryHeader.push("FD ACCOUNT NUMBER");
    }
    // if(this.fdReport.dueAmountCheckBox == true){
    //   this.fdHistoryHeader.push("FD AMOUNT");
    // }
    if(this.fdReport.fdstartDateCheckBox == true){
      this.fdHistoryHeader.push("FD START DATE");
    }
    if(this.fdReport. fdendDateCheckBox == true){
      this.fdHistoryHeader.push("FD END DATE");
    }

    if(this.fdReport.currencyCheckbox == true){
      this.fdHistoryHeader.push("CURRENCY");
    }
    if(this.fdReport.penaltyAmtCheckBox == true){
      this.fdHistoryHeader.push("PENALTY AMOUNT");
    }
    if(this.fdReport.investmentTermCheckBox == true){
      this.fdHistoryHeader.push("INVESTMENT TERM ");
    }
    if(this.fdReport.interestCheckBox == true){
      this.fdHistoryHeader.push("RATE OF INTEREST(%)");
    }
    if(this.fdReport.bankNameCheckbox == true){
      this.fdHistoryHeader.push("BANK NAME");
    }
    if(this.fdReport.ifsccodeCheckBox == true){
      this.fdHistoryHeader.push("BANK IFSC");
    }
    if(this.fdReport.autoRenewalCheckBox == true){
      this.fdHistoryHeader.push("AUTO RENEWAL");
    }
  
  
   

    console.log(this.fdHistoryHeader);

    this.fdReport.fdExcelHistoryHeader = this.fdHistoryHeader;

    this.httpService.post<any>(this.mutualFundService.fdHistoryListExcelUrl,this.fdReport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.fdHistoryHeader = [];
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

    }

    else{
      
    }
  }
  

  reset() {
    this.docForm = this.fb.group({
      investmentTerm:[""],
      fixeddeposittype:[""],
      currency:[""],
      autoRenewal:[""],
      frequency:[""],

       // Checkboxes Beans
       fdNameCheckbox:[false],
       mailCheckBox:[false],
       fdRefCheckBox:[false],
       fixeddeposittypeCheckBox:[false],
       fdaccountNoCheckbox:[false],
       dueAmountCheckBox:[false],
       fdstartDateCheckBox: [false],
       fdendDateCheckBox: [false],
       currencyCheckbox: [false],
       penaltyAmtCheckBox: [false],
       investmentTermCheckBox: [false],
       interestCheckBox: [false],
       bankNameCheckbox: [false],
       ifsccodeCheckBox: [false],
       autoRenewalCheckBox: [false],
    });

    this.fdHistoryList=[];
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

}


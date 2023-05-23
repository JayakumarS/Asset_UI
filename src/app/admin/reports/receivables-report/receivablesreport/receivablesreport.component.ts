import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Receivablesreport } from '../receivables-report-model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { ReportsService } from '../../reports.service';
import { ReceivablesreportService } from '../receivablesreport.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-receivablesreport',
  templateUrl: './receivablesreport.component.html',
  styleUrls: ['./receivablesreport.component.sass'],
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
export class ReceivablesreportComponent implements OnInit {
  config: {
    id : string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  receivablesreport: Receivablesreport;

  UserId: string;
  assettype = [];
  debtorsname = [];
  paymentreference = [];
  accounttype = [];
  currency = [];
  paymentstatus = [];
  Receivablesreport=[];
  invoicenumber=[];
  invoicedate=[];
  modeofpayment=[];
  amount=[];
  baddebts=[];
  interestreceivable=[];
  duedate=[];
  assetHistoryReport:[];
  assettypeDdList:[] ;
  debtorsnameDdList:[];
  paymentreferenceDdList: [];
  accounttypeDdList: [];
  currencyDdList: [];
  paymentstatusDdList:[];
  

    // Array for Excel Header

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private receivablesreportService:ReceivablesreportService,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public reportsService:ReportsService,
    private serverUrl:serverLocations
    ) {
    this.docForm = this.fb.group({
   assettype:[""],
    debtorsname:[""],
    paymentreference:[""],
    accounttype:[""],
    currency:[""],
    paymentstatus:[""], 
    loginedUser:[this.tokenStorage.getUserId()],
      // Checkboxes Beans
      assetTypeCheckBox:[false],
      debtorsnameCheckBox:[false],
      invoiceNumberCheckBox:[false],
      invoicedateCheckBox:[false],
      modeofpaymentCheckBox:[false],
      amountCheckBox:[false],
      currencyCheckBox:[false],
      baddebtsCheckBox:[false],
      interestreceivableCheckBox:[false],
      accounttypeCheckBox:[false],
      paymentstatusCheckBox:[false],
      duedateCheckBox:[false],
      paymentreferenceCheckBox:[false]
  
     })
    
    };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
  }});
     // Getting User id
     this.UserId=this.tokenStorage.getUserId();
       
      // Asset Type Dropdown
    this.httpService.get<any>(this.receivablesreportService.assettype+"?UserId="+this.UserId).subscribe(
      (data) => {
      console.log(data);
      this.assettypeDdList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );





      // Debtors Name Dropdown
    this.httpService.get<any>(this.receivablesreportService.debtorsname+"?UserId="+this.UserId).subscribe(
      (data) => {
      console.log(data);
      this.debtorsnameDdList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

        
      // Payment Reference Dropdown
    this.httpService.get<any>(this.receivablesreportService.paymentreference+"?UserId="+this.UserId).subscribe(
      (data) => {
      console.log(data);
      this.paymentreferenceDdList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );
  // Account Type Dropdown
    this.httpService.get<any>(this.receivablesreportService.accounttype+"?UserId="+this.UserId).subscribe(
      (data) => {
      console.log(data);
      this.accounttypeDdList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );
        // Currency List
        this.httpService.get<any>(this.receivablesreportService.currency+"?UserId="+this.UserId).subscribe(
          (data) => {
          console.log(data);
          this.currencyDdList = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );

        //Payment Status List
        this.httpService.get<any>(this.receivablesreportService.paymentstatus+"?UserId="+this.UserId).subscribe(
          (data) => {
          console.log(data);
          this.paymentstatusDdList = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
         }
         reset () {
          location.reload()
          this.docForm = this.fb.group({
            assettype:[""],
            debtorsname:[""],
            paymentreference:[""],
            accounttype:[""],
            currency:[""],
            paymentstatus:[""], 
            loginedUser:[this.tokenStorage.getUserId()],

            assetTypeCheckBox:[false],
            debtorsnameCheckBox:[false],
            invoiceNumberCheckBox:[false],
            invoicedateCheckBox:[false],
            modeofpaymentCheckBox:[false],
            amountCheckBox:[false],
            currencyCheckBox:[false],
            baddebtsCheckBox:[false],
            interestreceivableCheckBox:[false],
            accounttypeCheckBox:[false],
            paymentstatusCheckBox:[false],
            duedateCheckBox:[false],
            paymentreferenceCheckBox:[false]
             })
            }



      
      onSubmit(){
        this.receivablesreport = this.docForm.value;
        console.log(this.receivablesreport);
        this.httpService.post<any>(this.receivablesreportService.receivablesreportListUrl,this.receivablesreport).subscribe(
          (data) => {
            if(data.receivablesShowingList!=null){
              if(data.receivablesShowingList.length!=0){
                this.receivablesreport = data.receivablesShowingList;
              }else{
                this.receivablesreport = data.receivablesShowingList;
                this.notificationservice.showNotification(
                  "snackbar-danger",
                  "No Records Found",
                  "bottom",
                  "center"
                );
              }
            }else{
              this.Receivablesreport=[];
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

          this.receivablesreport = this.docForm.value;
          console.log(this.Receivablesreport);

          //For Excel Header Pushing in Array
          if(this.receivablesreport.assetTypeCheckBox ==true){
            this.Receivablesreport.push("ASSET TYPE");
          }
          if(this.receivablesreport.debtorsnameCheckBox == true){
            this.Receivablesreport.push("DEBTORS NAME");
          }
          if(this.receivablesreport.invoiceNumberCheckBox == true){
            this.Receivablesreport.push("INVOICE NUMBER");
          }
          if(this.receivablesreport.invoicedateCheckBox == true){
            this.Receivablesreport.push("INVOICE DATE");
          }
          if(this.receivablesreport.modeofpaymentCheckBox == true){
            this.Receivablesreport.push("MODE OF PAYMENT");
          }
          if(this.receivablesreport.amountCheckBox == true){
            this.Receivablesreport.push("AMOUNT");
          }
          if(this.receivablesreport.currencyCheckBox == true){
            this.Receivablesreport.push("CURRENCY");
          }
          if(this.receivablesreport.baddebtsCheckBox == true){
            this.Receivablesreport.push("BAD DEBTS");
          }
          if(this.receivablesreport.interestreceivableCheckBox == true){
            this.Receivablesreport.push("INTEREST RECEIVABLE");
          }
          if(this.receivablesreport.accounttypeCheckBox == true){
            this.Receivablesreport.push("ACCOUNT TYPE");
          }
        
          if(this.receivablesreport.paymentstatusCheckBox == true){
            this.Receivablesreport.push("PAYMENT STATUS");
          }
          if(this.receivablesreport.duedateCheckBox == true){
            this.Receivablesreport.push("DUE DATE");
          }
          if(this.receivablesreport.paymentreferenceCheckBox == true){
            this.Receivablesreport.push("PAYMENT REFERENCE");
          }


          console.log(this.Receivablesreport);
          
          this.receivablesreport.receivablesExcelHistoryHeader = this.Receivablesreport;
          this.httpService.post<any>(this.reportsService.assetHistoryListExcelUrl,this.receivablesreport).subscribe(
            (data) => {
              if(data.success){
                window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
                this.Receivablesreport = [];
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

       pageChanged(event){
          this.config.currentPage = event;
        }
        }

        
  
  



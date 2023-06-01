import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MutualfundReport } from '../mutualfund-report-model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditableAssetResultBean } from 'src/app/audit/auditable-asset/auditable-asset-result-bean';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
//import { MutualfundReportService } from './mutualfund-report.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MutualfundReportService } from '../mutualfund-report.service';

@Component({
  selector: 'app-add-mutualfund-report',
  templateUrl: './add-mutualfund-report.component.html',
  styleUrls: ['./add-mutualfund-report.component.sass']
})
export class AddMutualfundReportComponent implements OnInit {
  
  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  mutualfundReport:MutualfundReport;
  UserId:string;
  mutualfundList =[];
  panelOpenState = false;

  // fundType=[];
  // modeOfInvestment=[];
  // investmentMethod=[];
  // paymentMethod=[];
  // name=[];
  // investmentexperience=[];
  // planname=[];
  // brokerName=[];
  // grossPremium=[];
  // MutualfundReport: [];
  fundTypeList=[];
  investmentMethodList=[];
  paymentMethodList=[];
  modeOfInvestmentList=[];
// Array for Excel Header
   mutualfundHeader=[];
// pagination
  config:{
    id:string,
    itemsPerPage:number,
    currentPage:number,
    totalItems:number
  } ;
 


  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public mutualfundReportService:MutualfundReportService,
    private serverUrl:serverLocations)
     { 
    this.docForm = this.fb.group({
      
      
      fundType:[""],
      modeOfInvestment:[""],
      investmentMethod:[""],
      paymentMethod:[""],
      // name:[""],
      // investmentexperience:[""],
      // planname:[""],
      // brokerName:[""],
      // grossPremium:[""],

      userId: this.tokenStorage.getUserId(),
      
      // Checkboxes Beans
       nameCheckbox:[false],
       investmentexperienceCheckBox:[false],
       plannameCheckBox:[false],
       policyTermCheckBox:[false],
       policyNumberCheckbox:[false],
       modeOfInvestmentCheckBox:[false],
       grossPremiumCheckBox:[false],
       brokerNameCheckBox:[false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
  }
});

//Getting UserId
this.UserId=this.tokenStorage.getUserId();


//fundType
this.httpService.get<any>(this.mutualfundReportService.getfundType + "?UserId="+this.UserId).subscribe(
  (data) => {
    console.log(data);
    this.fundTypeList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
});

//investmentMethod
this.httpService.get<any>(this.mutualfundReportService.getinvestmentMethod+ "?UserId="+this.UserId).subscribe(
  (data) => {
    console.log(data);
    this.investmentMethodList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
});
//paymentMethod
this.httpService.get<any>(this.mutualfundReportService.getpaymentMethod+ "?UserId="+this.UserId).subscribe(
  (data) => {
    console.log(data);
    this.paymentMethodList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
});
//modeOfInvestment
this.httpService.get<any>(this.mutualfundReportService.getmodeOfInvestment+ "?UserId="+this.UserId).subscribe(
  (data) => {
    console.log(data);
    this.modeOfInvestmentList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
});



}


pageChanged(event){
  this.config.currentPage = event;
}
  
onSubmit(){
  this.mutualfundReport = this.docForm.value;
    console.log(this.mutualfundReport);

    this.httpService.post<any>(this.mutualfundReportService.mutualfundListUrl,this.mutualfundReport).subscribe(
      (data) => {
        if(data.getmutualfundList!=null){
          if(data.getmutualfundList.length!=0){
            this.mutualfundList = data.getmutualfundList;
          }else{
            this.mutualfundList = data.getmutualfundList;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.mutualfundList=[];
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

    if(this.mutualfundList.length >0){

      
    this.mutualfundReport = this.docForm.value;
    console.log(this.mutualfundReport);

    //For Excel Header Pushing in Array
    if(this.mutualfundReport.nameCheckbox ==true){
      this.mutualfundHeader.push("Name");
    }
    if(this.mutualfundReport.investmentexperienceCheckBox == true){
      this.mutualfundHeader.push("Investment Experience");
    }
    if(this.mutualfundReport.plannameCheckBox == true){
      this.mutualfundHeader.push("Plan Name");
    }

    if(this.mutualfundReport.brokerNameCheckBox == true){
      this.mutualfundHeader.push("Broker Name");
    }
    if(this.mutualfundReport.policyTermCheckBox == true){
      this.mutualfundHeader.push("Policy Term");
    }
    if(this.mutualfundReport.policyNumberCheckbox == true){
      this.mutualfundHeader.push("Policy Number");
    }
    if(this.mutualfundReport.modeOfInvestmentCheckBox == true){
      this.mutualfundHeader.push("ModeOfInvestment");
    }
   
    if(this.mutualfundReport.grossPremiumCheckBox == true){
      this.mutualfundHeader.push("Gross Premium");
    }
   
    
   
    console.log(this.mutualfundHeader);

    this.mutualfundReport.mutualfundExcelHeader = this.mutualfundHeader;

    this.httpService.post<any>(this.mutualfundReportService.mutualfundListExcelUrl,this.mutualfundReport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.mutualfundHeader = [];
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
    location.reload()
    this.docForm = this.fb.group({
      
      fundType:[""],
      modeOfInvestment:[""],
      investmentMethod:[""],
      paymentMethod:[""],
      // name:[""],
      // investmentexperience:[""],
      // planname:[""],
      // brokerName:[""],
      // grossPremium:[""],
      // loginedUser: this.tokenStorage.getUserId(),
      // Checkboxes Beans
      nameCheckbox:[false],
       investmentexperienceCheckBox:[false],
       plannameCheckBox:[false],
       policyTermCheckBox:[false],
       policyNumberCheckbox:[false],
       modeOfInvestmentCheckBox:[false],
       grossPremiumCheckBox:[false],
       brokerNameCheckBox:[false]
      });
    }

    onCancel(){
      
    }
  
    
    }


  


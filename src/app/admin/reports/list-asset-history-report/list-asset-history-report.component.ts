import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditableAssetResultBean } from 'src/app/audit/auditable-asset/auditable-asset-result-bean';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AssetHistoryReport } from '../list-asset-history-report-model';
import { ReportsService } from '../reports.service';
import { serverLocations } from 'src/app/auth/serverLocations';

@Component({
  selector: 'app-list-asset-history-report',
  templateUrl: './list-asset-history-report.component.html',
  styleUrls: ['./list-asset-history-report.component.sass'],
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
export class ListAssetHistoryReportComponent implements OnInit {

  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  assetHistoryReport: AssetHistoryReport;

  cmpId: string;
  branchList = [];
  categoryList = [];
  locationDdList = [];
  uomList = [];
  departmentDdList = [];
  assetListDashboard = [];
  assetUserList = [];
  assetHistoryList = [];
  brandDdList = [];
  itemCodeNameList = [];
  statusDdList = [];
  // Array for Excel Header
  assetHistoryHeader = [];
  // Pagination
  config: {
    id : string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public reportsService:ReportsService,
    private serverUrl:serverLocations
    ){  
      this.docForm = this.fb.group({
        branch:[""],
        category:[""],
        location:[""],
        department:[""],
        vendor:[""],
        assetName:[""],
        financialYear:[""],
        putInUse:[""],
        putInUseobj:[""],
        assetOwner:[""],
        brandId:[""],
        item:[""],
        statusId:[""],
        isAuditable:[""],
        companyId:this.tokenStorage.getCompanyId(),
        // Checkboxes Beans
        assetNameCheckBox:[false],
        assetCodeCheckBox:[false],
        assetCategoryCheckBox:[false],
        assetLocationCheckBox:[false],
        assetUserCheckBox:[false],
        captitalizationPriceCheckBox:[false],
        modelCheckBox:[false],
        putInUseDateCheckBox:[false],
        brandCheckBox:[false],
        statusCheckBox:[false],
        endLifeCheckBox:[false],
        purchasePriceCheckBox:[false],
        totalHoursUsageCheckBox:[false]
      }); 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      }
     });

     // Getting company id
     this.cmpId=this.tokenStorage.getCompanyId();

     //Branch List
     this.httpService.get<any>(this.commonService.getBranchByCompany+"?companyId="+this.cmpId).subscribe({
      next: (data) => {
        this.branchList = data.addressBean;
      },
      error: (error) => {
      }
    });
    
    //Category List
    this.httpService.get<any>(this.commonService.getCategoryDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
      }
    }
    );

    // Location dropdown
    this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );

    // vendor dropdown
    this.httpService.get<any>(this.commonService.getVendorDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.uomList = data;
      },
      error: (error) => {
      }
    });

    // Department Dropdown List
    this.httpService.get<any>(this.userMasterService.departmentListUrl + "?company=" + this.tokenStorage.getCompanyId() + "").subscribe(
      (data) => {
        this.departmentDdList = data.departmentList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //Asset Name List
    this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.assetListDashboardUrl+ "?companyId=" + this.cmpId).subscribe(
      (data) => {
        this.assetListDashboard = data.assetListDashboard;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //Asset Owner List
    this.httpService.get<any>(this.commonService.getAssetUserList + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe(
      
      (data) => {
      console.log(data);
      this.assetUserList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // Brand dropdown
  this.httpService.get<any>(this.commonService.getBrandDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
    next: (data) => {
      this.brandDdList = data;
    },
    error: (error) => {

    }
  }
  );

  //Item Dropdown List
  this.httpService.get<any>(this.commonService.getItemMasterNameWithItemCodeDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
    next: (data) => {
      this.itemCodeNameList = data;
    },
    error: (error) => {

    }
  }
  );

  // Status Dropdown list
  this.httpService.get<any>(this.commonService.getStatusDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
    next: (data) => {
      this.statusDdList = data;
    },
    error: (error) => {

    }
  }
  );

  }

  onSubmit(){
    this.assetHistoryReport = this.docForm.value;
    console.log(this.assetHistoryReport);

    this.httpService.post<any>(this.reportsService.assetHistoryListUrl,this.assetHistoryReport).subscribe(
      (data) => {
        if(data.getAssetHistoryList!=null){
          if(data.getAssetHistoryList.length!=0){
            this.assetHistoryList = data.getAssetHistoryList;
          }else{
            this.assetHistoryList = data.getAssetHistoryList;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.assetHistoryList=[];
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
      
    this.assetHistoryReport = this.docForm.value;
    console.log(this.assetHistoryReport);

    //For Excel Header Pushing in Array
    if(this.assetHistoryReport.assetNameCheckBox ==true){
      this.assetHistoryHeader.push("Asset Name");
    }
    if(this.assetHistoryReport.assetCodeCheckBox == true){
      this.assetHistoryHeader.push("Asset Code");
    }
    if(this.assetHistoryReport.assetLocationCheckBox == true){
      this.assetHistoryHeader.push("Asset Location");
    }
    if(this.assetHistoryReport.assetCategoryCheckBox == true){
      this.assetHistoryHeader.push("Asset Category");
    }
    if(this.assetHistoryReport.statusCheckBox == true){
      this.assetHistoryHeader.push("Status");
    }
    if(this.assetHistoryReport.brandCheckBox == true){
      this.assetHistoryHeader.push("Brand");
    }
    if(this.assetHistoryReport.modelCheckBox == true){
      this.assetHistoryHeader.push("Model");
    }
    if(this.assetHistoryReport.purchasePriceCheckBox == true){
      this.assetHistoryHeader.push("Purchase Price");
    }
    if(this.assetHistoryReport.captitalizationPriceCheckBox == true){
      this.assetHistoryHeader.push("Captitalization Price");
    }
    if(this.assetHistoryReport.endLifeCheckBox == true){
      this.assetHistoryHeader.push("End Life");
    }
    if(this.assetHistoryReport.putInUseDateCheckBox == true){
      this.assetHistoryHeader.push("Put In Use Date");
    }
    if(this.assetHistoryReport.assetUserCheckBox == true){
      this.assetHistoryHeader.push("Asset User");
    }
    if(this.assetHistoryReport.totalHoursUsageCheckBox == true){
      this.assetHistoryHeader.push("Total Hours Usage");
    }

    console.log(this.assetHistoryHeader);

    this.assetHistoryReport.assetExcelHistoryHeader = this.assetHistoryHeader;

    this.httpService.post<any>(this.reportsService.assetHistoryListExcelUrl,this.assetHistoryReport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.assetHistoryHeader = [];
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

  reset() {
    this.docForm = this.fb.group({
      branch:[""],
      category:[""],
      location:[""],
      department:[""],
      vendor:[""],
      assetName:[""],
      financialYear:[""],
      putInUse:[""],
      putInUseobj:[""],
      assetOwner:[""],
      brandId:[""],
      item:[""],
      statusId:[""],
      isAuditable:[""],
      companyId:this.tokenStorage.getCompanyId(),
      // Checkboxes Beans
      assetNameCheckBox:[false],
      assetCodeCheckBox:[false],
      assetCategoryCheckBox:[false],
      assetLocationCheckBox:[false],
      assetUserCheckBox:[false],
      captitalizationPriceCheckBox:[false],
      modelCheckBox:[false],
      putInUseDateCheckBox:[false],
      brandCheckBox:[false],
      statusCheckBox:[false],
      endLifeCheckBox:[false],
      purchasePriceCheckBox:[false],
      totalHoursUsageCheckBox:[false]
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
  
  onCancel(){
    this.router.navigate(['/master/category/list-category']);
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDateYYMMDDFormat(event.target.value);
    if (inputFlag == 'putInUse') {
      this.docForm.patchValue({ putInUse: cdate });
    }
  }

}

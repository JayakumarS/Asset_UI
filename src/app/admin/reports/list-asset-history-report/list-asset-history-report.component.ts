import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditableAssetResultBean } from 'src/app/audit/auditable-asset/auditable-asset-result-bean';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CategoryResultBean } from 'src/app/inventory/u-category/uom-resultbean';
import { Assetcategory } from 'src/app/master/category/category.model'; 
import { CategoryMasterService } from 'src/app/master/category/category.service'; 
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AssetHistoryReport } from '../list-asset-history-report-model';
import { reportsresultbean } from '../reports-result-bean';
import { ReportsService } from '../reports.service';

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
  categoryDdList=[];

  cmpId: string;
  branchList = [];
  categoryList = [];
  locationDdList = [];
  uomList = [];
  departmentDdList = [];
  assetListDashboard = [];
  assetUserList = [];
  assetHistoryList = [];
  // Pagination
  config: {
    id : string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private categoryMasterService: CategoryMasterService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public reportsService:ReportsService
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
        companyId:this.tokenStorage.getCompanyId()
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
    this.httpService.get<any>(this.commonService.getCategoryDropdown).subscribe({
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

  }

  onSubmit(){
    this.assetHistoryReport = this.docForm.value;
    console.log(this.assetHistoryReport);

    this.httpService.post<any>(this.reportsService.assetHistoryListUrl,this.assetHistoryReport).subscribe(
      (data) => {
        this.assetHistoryList = data.getAssetHistoryList;
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
        assetOwner:[""]
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


  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'putInUse') {
      this.docForm.patchValue({ putInUse: cdate });
    }
  }

  // validateCatergory(event){
  //   this.httpService.get<any>(this.categoryMasterService.uniqueValidateUrl+ "?tableName=" +"assetcategory"+"&columnName="+"category_name"+"&columnValue="+event).subscribe((res: any) => {
  //     if(res){
  //       this.docForm.controls['categoryName'].setErrors({ assetcategory: true });
  //     }else{
  //       this.docForm.controls['categoryName'].setErrors(null);
  //     }
  //   });
  // }

}

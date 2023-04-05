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
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { ReportsService } from 'src/app/admin/reports/reports.service'; 
import { MaintenanceAndRepairService } from '../maintenance-and-repair.service';
import { MaintenanceAndReport } from '../maintenance-and-repair-model';

@Component({
  selector: 'app-add-maintenance-and-repair',
  templateUrl: './add-maintenance-and-repair.component.html',
  styleUrls: ['./add-maintenance-and-repair.component.sass'],
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
export class AddMaintenanceAndRepairComponent implements OnInit {

  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  maintenanceAndReport: MaintenanceAndReport;

  companyId: string;
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
  locationId: any;

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    public auditableAssetService:AuditableAssetService,
    public reportsService:ReportsService,
    public maintenanceAndRepairService:MaintenanceAndRepairService
    ){  
      this.docForm = this.fb.group({
        assetId:["",[Validators.required]],
        expDateOfReturn:[""],
        expDateOfReturnObj:["",[Validators.required]],
        repairReason:["",[Validators.required]],
        moveLocation:["",[Validators.required]],
        repairDate:[""],
        repairDateObj:["",[Validators.required]],
        remarks:[""],
        maintenanceId:[""],
        assetLocation:[""],
        // Received status
        receivedDateObj:[""],
        receivedDate:[""],
        receivedRemarks:[""],
        receivedLocation:[""],
        loginUser:this.tokenStorage.getUserId()
      }); 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
      }
     });

     // Getting company id
     this.companyId=this.tokenStorage.getCompanyId();

    // Location dropdown
    this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );

    //Assets Dropdown List
    this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.assetListDashboardUrl+ "?companyId=" + this.companyId).subscribe(
      (data) => {
        this.assetListDashboard = data.assetListDashboard;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }

  fetchAssetDetails(asset:any){
    this.httpService.get<any>(this.maintenanceAndRepairService.assetListUrl+ "?assetId=" + asset).subscribe(
      (data) => {
        this.maintenanceAndReport = data.getAssetDetails;
        this.locationId=data.getAssetDetails.assetLocation;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  onSubmit(){
    if(this.docForm.valid){
      this.docForm.value.assetLocation = this.locationId;
      this.maintenanceAndReport = this.docForm.value;
      console.log(this.maintenanceAndReport);
      this.maintenanceAndRepairService.addMaintenanceAndRepair(this.maintenanceAndReport,this.router,this.notificationservice);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }

  }

   fetchDetails(maintenanceId: any): void {

    this.httpService.get(this.maintenanceAndRepairService.editMaintenanceAndRepair+"?maintenanceId="+maintenanceId).subscribe((res: any)=> {
      console.log(maintenanceId);
      this.fetchAssetDetails(res.maintenanceAndReportBean.assetId);
      if(res.maintenanceAndReportBean.repairDate!=null){
        var cdate = this.commonService.getDateObj(res.maintenanceAndReportBean.repairDate);
      }
      if(res.maintenanceAndReportBean.expDateOfReturn!=null){
        var edate = this.commonService.getDateObj(res.maintenanceAndReportBean.expDateOfReturn);
      }
      if(res.maintenanceAndReportBean.receivedDate!=null){
        var rdate = this.commonService.getDateObj(res.maintenanceAndReportBean.receivedDate);
      }
      this.docForm.patchValue({
        'maintenanceId': res.maintenanceAndReportBean.maintenanceId,
        'assetId': res.maintenanceAndReportBean.assetId+"",
        'repairReason' : res.maintenanceAndReportBean.repairReason,
        'moveLocation': res.maintenanceAndReportBean.moveLocation,
        'remarks' : res.maintenanceAndReportBean.remarks,
        'repairDateObj': cdate,
        'repairDate': res.maintenanceAndReportBean.repairDate,
        'expDateOfReturnObj': edate,
        'expDateOfReturn': res.maintenanceAndReportBean.expDateOfReturn,
        'receivedDateObj': rdate,
        'receivedDate': res.maintenanceAndReportBean.receivedDate,
        'receivedRemarks': res.maintenanceAndReportBean.receivedRemarks,
        'receivedLocation' : res.maintenanceAndReportBean.receivedLocation,
     })
      },
      (err: HttpErrorResponse) => {
      }
    );

  } 

  update() {
    if (this.docForm.valid) {
      if(this.docForm.value.repairDate!=null && this.docForm.value.receivedRemarks!=null && this.docForm.value.receivedLocation!=null){
      this.maintenanceAndReport = this.docForm.value;
      this.maintenanceAndRepairService.updateMaintenanceAndRepair(this.maintenanceAndReport,this.router,this.notificationservice);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill Received date,Received Remarks and Received location...!!!",
        "top",
        "right"
      );
    }
  } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
      assetId:[""],
      expDateOfReturn:[""],
      expDateOfReturnObj:["",[Validators.required]],
      repairReason:[""],
      moveLocation:["",[Validators.required]],
      repairDate:[""],
      repairDateObj:["",[Validators.required]],
      remarks:[""],
      maintenanceId:[""],
      assetLocation:[""],
      // Received status
      receivedDateObj:[""],
      receivedDate:[""],
      receivedRemarks:[""],
      receivedLocation:[""]
    })
  } else {
    this.fetchDetails(this.requestId);
  }
}
  pageChanged(event){
    this.config.currentPage = event;
  }
  
  onCancel(){
    this.router.navigate(['/asset/maintenanceAndReport/listMaintenanceAndReport']);
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
    if (inputFlag == 'expDateOfReturn') {
      this.docForm.patchValue({ expDateOfReturn: cdate });
    }
    if (inputFlag == 'repairDate') {
      this.docForm.patchValue({ repairDate: cdate });
    }
    if (inputFlag == 'receivedDate') {
      this.docForm.patchValue({ receivedDate: cdate });
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

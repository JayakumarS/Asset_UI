import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuditableAssetResultBean } from 'src/app/audit/auditable-asset/auditable-asset-result-bean'; 
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service'; 
import { AuditableAsset } from 'src/app/audit/auditable-asset/auditable-asset-model'; 
import { NotificationService } from 'src/app/core/service/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ScheduleActivityMaster } from '../schedule-acvtivity.model';
import * as moment from 'moment';
import { MainService } from '../../dashboard/main.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-activity-pop-up',
  templateUrl: './activity-pop-up.component.html',
  styleUrls: ['./activity-pop-up.component.sass'],
  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
      },
  } },CommonService
  ]
})
export class ActivityPopUpComponent implements OnInit {
  docForm: FormGroup;
  scheduleActivityMaster:ScheduleActivityMaster;
  requestId: any;
  edit:boolean=false;
  assetList:[];
  currencyList: [];
  assetTypeList:[];
  depreciationMethodList:[];
  getAuditableAssetDetails:[];
  scheduleActivityDetails:[];
  fullLifeFlag:boolean=false;

  constructor(private fb: FormBuilder,
    public auditableAssetService:AuditableAssetService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    private commonService: CommonService,
    private notificationService: NotificationService,
    public route: ActivatedRoute,public mainService:MainService,
    public dialogRef: MatDialogRef<ActivityPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) 
    {
    this.docForm = this.fb.group({
      activityTypeText:[""],
      locationText:[""],
    });
  }

  ngOnInit(): void {


  this.docForm = this.fb.group({
    activityTypeText:[""],
    locationText:[""],
  });

  this.httpService.get<AuditableAssetResultBean>(this.mainService.getActivityPopUpUrl + "?todayDate=" + moment().format('YYYY-MM-DD')).subscribe((res: any) => {
    this.scheduleActivityDetails = res.scheduleActivityDetails;
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
  
  this.route.params.subscribe(params => {
   if(params.id!=undefined && params.id!=0){
    this.requestId = params.id;
    this.edit=true;
    this.fetchDetails(this.requestId) ;

   }
  });

}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  fetchDetails(id: any): void {
  }


  onCancel(){
    this.dialogRef.close();
   }
  

  
}

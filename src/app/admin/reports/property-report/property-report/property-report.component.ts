import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Property } from 'src/app/master/property/property-model';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpErrorResponse } from '@angular/common/http';
import { PropertyReport } from '../property-report-model';
import { PropertyReportService } from '../property-report.service';

@Component({
  selector: 'app-property-report',
  templateUrl: './property-report.component.html',
  styleUrls: ['./property-report.component.sass']
})
export class PropertyReportComponent implements OnInit {
  panelOpenState = false;

  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  propertyReport:PropertyReport;
  UserId:string;
  propertyList =[];
  config: any;
  propertyHeader=[];
  propertyHistoryList: any;

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public propertyReportService:PropertyReportService,
    private serverUrl:serverLocations)
     { 
    this.docForm = this.fb.group({
      propertyType:[""],
      residencialType:[""],
      conpanytype:[""],
      gardenLayout:[""],
      ownership:[""],
      garTech:[""],
      userid:[this.tokenStorage.getUserId()],
      id:[""],



      loginedUser: this.tokenStorage.getUserId(),

       // Checkboxes Beans
       propertyTypeCheckbox:[false],
       residencialTypeCheckBox:[false],
       conpanytypeCheckBox:[false],
       gardenLayoutCodeCheckBox:[false],
       ownershipCheckBox:[false],
       garTechCheckBox:[false],


    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
  }

});
}

pageChanged(event){
  this.config.currentPage = event;
}
 

  onSubmit(){

    this.propertyReport = this.docForm.value;
    console.log(this.propertyReport);

    this.httpService.post<any>(this.propertyReportService.propertyreportListUrl,this.propertyReport).subscribe(
      (data) => {
        if(data.getpropertyHistoryList!=null){
          if(data.getpropertyHistoryList.length!=0){
            this.propertyHistoryList = data.getpropertyHistoryList;
          }else{
            this.propertyHistoryList = data.getpropertyHistoryList;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.propertyList=[];
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

    if(this.propertyHistoryList.length >0){

      
    this.propertyReport = this.docForm.value;
    console.log(this.propertyReport);

    //For Excel Header Pushing in Array
    if(this.propertyReport.propertyTypeCheckbox ==true){
      this.propertyHeader.push("PROPERTY TYPE");
    }
    if(this.propertyReport.residencialTypeCheckBox == true){
      this.propertyHeader.push("RESIDENCIAL TYPE");
    }
    if(this.propertyReport.conpanytypeCheckBox == true){
      this.propertyHeader.push("COMPANY TYPE");
    }
    if(this.propertyReport.gardenLayoutCodeCheckBox == true){
      this.propertyHeader.push("GARDEN LAYOUT");
    }
    if(this.propertyReport.ownershipCheckBox == true){
      this.propertyHeader.push("OWNERSHIP");
    }
    if(this.propertyReport.garTechCheckBox == true){
      this.propertyHeader.push("GARDEN TECHNIQUES");
    }
   
    console.log(this.propertyHeader);

    this.propertyReport.propertyExcelHistoryHeader = this.propertyHeader;

    this.httpService.post<any>(this.propertyReportService.exportExcel,this.propertyReport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.propertyHeader = [];
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


  

  reset() {
    location.reload()
    this.docForm = this.fb.group({
      
     
      });
    }

    onCancel(){
      
    }

}

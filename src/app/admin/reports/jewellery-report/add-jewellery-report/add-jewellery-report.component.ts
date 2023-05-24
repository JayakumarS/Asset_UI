

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JewelReport } from '../jewellery-report-model';
import { JewelleryReportService } from '../jewellery-report.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';

import { CommonService } from 'src/app/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { AuditableAssetService } from 'src/app/audit/auditable-asset/auditable-asset.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpErrorResponse } from '@angular/common/http';
import { JewelleryReportResultBean } from '../jewellery-report-result-bean';

@Component({
  selector: 'app-add-jewellery-report',
  templateUrl: './add-jewellery-report.component.html',
  styleUrls: ['./add-jewellery-report.component.sass']
})
export class AddJewelleryReportComponent implements OnInit {
  panelOpenState = false;
  docForm: FormGroup;


  requestId: any;
  edit: boolean = false;
  materiallist=[];
  typelist=[];


  UserId: string;
  jewelHistoryList = [];
  jewelReport:JewelReport;
 
  jewelleryReportResultBean:JewelleryReportResultBean;
   // Array for Excel Header
   jewelHistoryHeader = [];
  // Pagination
  config: {
    id : string,
    
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
    
  };

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private router:Router,
    public route: ActivatedRoute,
    private notificationservice:NotificationService,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
   public jewelleryReportService:JewelleryReportService,
    private serverUrl:serverLocations) { 
    this.docForm = this.fb.group({
      material:[""],
      type:[""],
      purchaseValue:[""],
      jewelName:[""],
      jewelcolour:[""],
      bankName:[""],
      lockerSize:[""],
      lockerRent:[],
      lockerNo:[""],
      currentValue:[""],
      specification:[""],
      description:[""],
      noOfPiece:[""],
      weight:[""],
      userid:[this.tokenStorage.getUserId()],
      id:[""],



      loginedUser: this.tokenStorage.getUserId(),

       // Checkboxes Beans
       jnameCheckbox:[false],
       jcolourCheckBox:[false],
       purchasevalueCheckBox:[false],
       noofpiecesCheckBox:[false],
       typeCheckbox:[false],
       specificationCheckBox:[false],
       descriptionCheckBox:[false],
       materialCheckBox: [false],
       currentvalueCheckbox: [false],
       weightCheckBox: [false],
       lockerNoCheckBox: [false],
       bankNameCheckBox: [false],
       lockerSizeCheckbox: [false],
       lockerRentCheckBox: [false],
       
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

     //material List
     this.httpService.get<any>(this.jewelleryReportService.getmateriallist+"?UserId="+this.UserId).subscribe({
      next: (data) => {
        this.materiallist = data;
      },
      error: (error) => {
      }

      
    });

    
    
    //type List
    this.httpService.get<any>(this.jewelleryReportService.gettypelist+"?UserId="+this.UserId).subscribe({
      next: (data) => {
        this.typelist = data;
      },
      error: (error) => {
      }
    }
    );

   

  }
  
  
  pageChanged(event){
    this.config.currentPage = event;
  }
   
  
  onSubmit(){
    this.jewelReport = this.docForm.value;
    console.log(this.jewelReport);

    this.httpService.post<any>(this.jewelleryReportService.jewelHistoryListUrl,this.jewelReport).subscribe(
      (data) => {
        if(data.getjewelHistoryList!=null){
          if(data.getjewelHistoryList.length!=0){
            this.jewelHistoryList = data.getjewelHistoryList;
          }else{
            this.jewelHistoryList = data.getjewelHistoryList;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.jewelHistoryList=[];
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


    this.jewelReport = this.docForm.value;
    console.log(this.jewelReport);

    //For Excel Header Pushing in Array
    if(this.jewelReport.jnameCheckbox ==true){
      this.jewelHistoryHeader.push("JEWELLERY NAME");
    }
    if(this.jewelReport.jcolourCheckBox == true){
      this.jewelHistoryHeader.push("JEWELLERY COLOUR");
    }
    if(this.jewelReport.purchasevalueCheckBox == true){
      this.jewelHistoryHeader.push("PURCHASE VALUE");
    }
    if(this.jewelReport.noofpiecesCheckBox == true){
      this.jewelHistoryHeader.push("NO. OF PIECES");
    }
    if(this.jewelReport.typeCheckbox == true){
      this.jewelHistoryHeader.push("JEWELLERY TYPE");
    }
    if(this.jewelReport.specificationCheckBox == true){
      this.jewelHistoryHeader.push("SPECIFICATION");
    }
    if(this.jewelReport.descriptionCheckBox == true){
      this.jewelHistoryHeader.push("DESCRIPTION");
    }
    if(this.jewelReport.materialCheckBox == true){
      this.jewelHistoryHeader.push("JEWELLERY MATERIAL");
    }
    if(this.jewelReport.currentvalueCheckbox == true){
      this.jewelHistoryHeader.push("CURRENT VALUE");
    }
    if(this.jewelReport.weightCheckBox == true){
      this.jewelHistoryHeader.push("WEIGHT");
    }
    if(this.jewelReport.lockerNoCheckBox == true){
      this.jewelHistoryHeader.push("LOCKER NUMBER ");
    }
    if(this.jewelReport.bankNameCheckBox == true){
      this.jewelHistoryHeader.push("BANK NAME");
    }
    if(this.jewelReport.lockerSizeCheckbox == true){
      this.jewelHistoryHeader.push("LOCKER SIZE");
    }
    if(this.jewelReport.lockerRentCheckBox == true){
      this.jewelHistoryHeader.push("LOCKER RENT");
    }
   
   

    console.log(this.jewelHistoryHeader);

    this.jewelReport.jewelExcelHistoryHeader = this.jewelHistoryHeader;

    this.httpService.post<any>(this.jewelleryReportService.jewelHistoryListExcelUrl,this.jewelReport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.jewelHistoryHeader = [];
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

      
      material:[""],
      type:[""],
      

       // Checkboxes Beans
       jnameCheckbox:[false],
       jcolourCheckBox:[false],
       purchasevalueCheckBox:[false],
       noofpiecesCheckBox:[false],
       typeCheckbox:[false],
       specificationCheckBox:[false],
       descriptionCheckBox:[false],
       materialCheckBox: [false],
       currentvalueCheckbox: [false],
       weightCheckBox: [false],
       lockerNoCheckBox: [false],
       bankNameCheckBox: [false],
       lockerSizeCheckbox: [false],
       lockerRentCheckBox: [false],
    });

    this.jewelHistoryList = [];


  }


}



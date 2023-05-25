import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from 
'@angular/forms';
import { Vehiclereport } from '../vehicle-report.model';
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
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { serverLocations } from 'src/app/auth/serverLocations';
import { VehicleReportService } from '../vehicle-report.service';
import { MutualFundService } from 'src/app/master/mutualfund/mutualfund.service';


@Component({
  selector: 'app-vehicle-reports',
  templateUrl: './vehicle-reports.component.html',
  styleUrls: ['./vehicle-reports.component.sass'],
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

export class VehicleReportsComponent implements OnInit {
  // [x: string]: any;
  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  VehicleList =[];
  vehiclereport:Vehiclereport;
  vehicleReportService:VehicleReportService;
  userId:any;
  regnoList: any;
  UserId: string;
  panelOpenState = false;



  vehicletype=[];
  fueltype=[];
  bodytype=[];
  ownertype=[];
  vehiclewheel=[];
  insurancetype=[];
  regno=[];
  engineno=[];


  vehicletypeList:[];
  fueltypeList:[];
  bodytypeList:[];
  ownertypeList:[];
  insurancetypeList:[];
  vehiclewheelList:[];
  vehicleExcelHeader=[];


  config: {
    id : string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };



  


  constructor(private fb: FormBuilder,   private httpService: HttpServiceService,
    private commonService: CommonService,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,
    public auditableAssetService:AuditableAssetService,
    public mutualFundService:MutualFundService,
  
    private serverUrl:serverLocations) { 
    this.docForm = this.fb.group({
      id:[],
      vehicletype:[""],
      fueltype:[""],
      bodytype:[""],
      ownertype:[""],
      vehiclewheel:[""],
      insurancetype:[""],
      regno:[""],
      engineno:[""],
      userId:this.tokenStorage.getUserId(),
    
      

       // Checkboxes Beans
       vehicletypeCheckbox:[false],
       fueltypeCheckBox:[false],
       bodytypeCheckBox:[false],
       ownertypeCheckBox:[false],
       vehiclewheelCheckBox:[false],
       insurancetypeCheckBox:[false],
       regnoCheckBox:[false],
       enginenoCheckBox:[false],




    });
  }
  ngOnInit(): void {
    {
      this.route.params.subscribe(params => {
        if(params.id!=undefined && params.id!=0){
         this.requestId = params.id;
         this.edit=true;
    }
  });
  }
    // Getting UserId
    this.UserId=this.tokenStorage.getUserId();

    // vehicletype 
    

    // fueltype
    this.httpService.get<any>(this.mutualFundService.getfueltypeList+ "?UserId="+this.UserId).subscribe(
    
      (data) => {
      console.log(data);
      this.fueltypeList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  this.httpService.get<any>(this.mutualFundService.getfueltypeList+"?UserId="+this.UserId).subscribe(
    (data) => {
    console.log(data);
    this.vehicletypeList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

  // bodytype
    this.httpService.get<any>(this.mutualFundService.getbodytypeList+ "?UserId="+this.UserId).subscribe(
    
      (data) => {
      console.log(data);
      this.bodytypeList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // ownertype
    this.httpService.get<any>(this.mutualFundService.getownertypeList+ "?UserId="+this.UserId).subscribe(
    
      (data) => {
      console.log(data);
      this.ownertypeList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // insurancetype
    this.httpService.get<any>(this.mutualFundService.getinsurancetypeList+ "?UserId="+this.UserId).subscribe(
    
      (data) => {
      console.log(data);
      this.insurancetypeList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  
  //vehiclewheel
  this.httpService.get<any>(this.mutualFundService.getvehiclewheelList+ "?UserId="+this.UserId).subscribe(
    
    (data) => {
    console.log(data);
    this.vehiclewheelList = data;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  
  onSubmit(){
    this.vehiclereport = this.docForm.value;
    console.log(this.vehiclereport);

    this.httpService.post<any>(this.mutualFundService.VehicleListUrl,this.vehiclereport).subscribe(
      (data) => {
        if(data.getVehicleList!=null){
          if(data.getVehicleList.length!=0){
            this.VehicleList = data.getVehicleList;
          }else{
            this.VehicleList = data.getVehicleList;
            this.notificationservice.showNotification(
              "snackbar-danger",
              "No Records Found",
              "bottom",
              "center"
            );
          }
        }else{
          this.VehicleList=[];
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
  exportExcel()
  {

    //For Excel Header Pushing in Array
    if(this.vehiclereport.vehicletypeCheckbox ==true){
      this.vehicleExcelHeader.push("VEHICLE END TYPE");
    }
    if(this.vehiclereport.fueltypeCheckBox == true){
      this.vehicleExcelHeader.push("FUEL TYPE");
    }
    if(this.vehiclereport.bodytypeCheckBox == true){
      this.vehicleExcelHeader.push("BODY TYPE");
    }
    if(this.vehiclereport.ownertypeCheckBox == true){
      this.vehicleExcelHeader.push("OWNER TYPE");
    }
    if(this.vehiclereport.vehiclewheelCheckBox == true){
      this.vehicleExcelHeader.push("VEHICLE TYPE");
    }
    if(this.vehiclereport.insurancetypeCheckBox == true){
      this.vehicleExcelHeader.push("INSURANCE TYPE");
    }
    if(this.vehiclereport.regnoCheckBox == true){
      this.vehicleExcelHeader.push("REGISTRATION NO");
    }
    if(this.vehiclereport.enginenoCheckBox == true){
      this.vehicleExcelHeader.push("ENGINE NUMBER");
    }

    console.log(this.vehicleExcelHeader);

    this.vehiclereport.vehicleExcelHistoryHeader = this.vehicleExcelHeader;


    this.httpService.post<any>(this.mutualFundService.VehicleListExcelUrl,this.vehiclereport).subscribe(
      (data) => {
        if(data.success){
          window.open(this.serverUrl.apiServerAddress+"asset_upload/"+data.filePath, '_blank');
          this.vehicleExcelHeader = [];
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
        vehicletype:[""],
        fueltype:[""],
        bodytype:[""],
        ownertype:[""],
        vehiclewheel:[""],
        insurancetype:[""],
        regno:[""],
        engineno:[""],
        loginedUser: this.tokenStorage.getUserId(),
        
  
         // Checkboxes Beans
         vehicletypeCheckbox:[false],
         fueltypeCheckBox:[false],
         bodytypeCheckBox:[false],
         ownertypeCheckBox:[false],
         vehiclewheelCheckBox:[false],
         insurancetypeCheckBox:[false],
         regnoCheckBox:[false],
         enginenoCheckBox:[false],
        

         
      });
  
      this.VehicleList = [];
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


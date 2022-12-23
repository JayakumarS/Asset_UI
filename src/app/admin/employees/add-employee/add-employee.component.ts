import { Component,OnInit} from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryMasterResultBean } from "src/app/master/country-master/country-master-result-bean";
import { AddAssetService } from "../add-asset.service"; 
import { CountryMasterService } from "src/app/master/country-master/country-master.service";
import { CountryMaster } from "src/app/master/country-master/country-master.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonService } from "src/app/common-service/common.service";
import { AddAsset } from "../addAsset-model";
import { AddAssetResultBean } from "../add-asset-result-bean";
import { NotificationService } from "src/app/core/service/notification.service";
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from "@angular/material/dialog";
import { EmployeePopupComponent } from "../employee-popup/employee-popup.component";

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
  selector: "app-tabs",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.sass"],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
      },
  } },CommonService
  ]
})

export class AddEmployeeComponent implements OnInit{

  // tabs = ["Asset Information", "Purchase Information", "Financial Information","Alloted Information"];
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dropdownList = [];
  addAsset: AddAsset;
  categoryDdList=[];
  locationDdList=[];
  departmentDdList=[]
  
  
  constructor(private fb: FormBuilder,private httpService: HttpServiceService,
    public router:Router,private snackBar: MatSnackBar,public notificationService:NotificationService,
    private addAssetService:AddAssetService,private countryMasterService:CountryMasterService,
    private cmnService:CommonService,public dialog: MatDialog,) {
    this.docForm = this.fb.group({

      
      //info
      assetName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      assetCode: ["",[Validators.required]],
      location: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      uploadImg: [""],
      //tab1
      brand: [""],
      model:[""],
      serialNo:[""],
      condition:[""],
      linkedAsset:[""],
      description:[""],
      uploadFiles:[""],
      //tab2
      vendor:[""],
      poNumber: [""],
      selfOrPartner:[""],
      invoiceDate: [""],
      invoiceNo: [""],
      purchasePrice: [""],
      //tab3
      captitalizationPrice:[""],
      captitalizationDate:[""],
      endLife:[""],
      scrapValue:[""],
      depreciation:[""],
      //tab4
      department:[""],
      allottedUpto:[""],
      transferredTo:[""],
      remarks:[""],
      invoiceDateobj:[""],
      captitalizationDateobj:[""],
      allottedUptoobj:[""],
      fileUploadUrl:[""],
      imgUploadUrl:[""]
      
      
    });
  }
  ngOnInit(): void {
   // this.commodityList();

     // category dropdown
     this.httpService.get<AddAssetResultBean>(this.addAssetService.categoryDropdownList).subscribe(
      (data) => {
       this.categoryDdList = data.categoryDropdown;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

      // Location dropdown
      this.httpService.get<AddAssetResultBean>(this.addAssetService.locationDropdownList).subscribe(
        (data) => {
        this.locationDdList = data.locationDropdown;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );

      // department dropdown
this.httpService.get<AddAssetResultBean>(this.addAssetService.departmentDropdownList).subscribe(
  (data) => {
   this.departmentDdList = data.departmentDropdown;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

  }
  onSubmit() {
    console.log("Form Value", this.docForm.value);
    this.addAsset = this.docForm.value;
    console.log(this.addAsset);
    this.addAssetService.addAsset(this.addAsset,this.router,this.notificationService);
    const dialogRef = this.dialog.open(EmployeePopupComponent, {
      height: "130px",
      width: "600px",
      // data: row,
      // direction: tempDirection,
    });
   
    //this.router.navigate(['/admin/country-Master/list-CountryMaster']);
  }
  commodityList(){
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.commoditylist).subscribe( 
      (data) => {

        
       this.dropdownList =data.countryMasterDetails;
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='captitalizationDate'){
      this.docForm.patchValue({captitalizationDate:cdate});
    }
    else if(inputFlag=='invoiceDate'){
      this.docForm.patchValue({invoiceDate:cdate});
    }
    else if(inputFlag=='allottedUpto'){
      this.docForm.patchValue({allottedUpto:cdate});
    }
  }


// File upload
getCreditFile(event) {
  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  
  // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
  // console.log(data);
  
  this.httpService.post<any>(this.addAssetService.addAssetUploadFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        this.docForm.patchValue({
          'imgUploadUrl': data.filePath     
         
       })
      }
      else{
        this.showNotification(
          "snackbar-success",
          "Edit Record Successfully...!!!",
          "bottom",
          "center"
        );

        
      }
      
      },
      (err: HttpErrorResponse) => {
        
    });

  }


  // File upload
  getCreditFileDetails(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName",fileExtension);
    console.log(frmData);
    
    // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
    // console.log(data);
    
    this.httpService.post<any>(this.addAssetService.addAssetUploadFiles, frmData).subscribe(data => {
        console.log(data);
        if(data.success){
          this.docForm.patchValue({
            'fileUploadUrl': data.filePath     
           
         })
        }
        else{
          this.showNotification(
            "snackbar-success",
            "Edit Record Successfully...!!!",
            "bottom",
            "center"
          );

          
        }
        
        },
        (err: HttpErrorResponse) => {
          
      });
  
    }

}

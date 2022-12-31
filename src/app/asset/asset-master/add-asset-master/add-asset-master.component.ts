import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeePopupComponent } from 'src/app/admin/employees/employee-popup/employee-popup.component';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AddMultipleAssetMasterComponent } from '../add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetMaster } from '../asset-model';
import { AssetMasterResultBean } from '../asset-result-bean';
import { AssetService } from '../asset.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";


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
  selector: 'app-add-asset-master',
  templateUrl: './add-asset-master.component.html',
  styleUrls: ['./add-asset-master.component.sass'],
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
export class AddAssetMasterComponent
 extends UnsubscribeOnDestroyAdapter
 implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dropdownList = [];
 
  assetMaster: AssetMaster;
  categoryList=[];
  locationDdList=[];
  departmentDdList=[]
  requestId: any;
  edit:boolean=false;
  spinner: any;
  
  
  constructor(private fb: FormBuilder,private httpService: HttpServiceService,
    private  assetService: AssetService, private commonService: CommonService,
    public router:Router,private snackBar: MatSnackBar,public notificationService:NotificationService,
    private cmnService:CommonService,public dialog: MatDialog,public route: ActivatedRoute) {
    super();
    
    this.docForm = this.fb.group({

      
      //info
      assetName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      assetCode: ["",[Validators.required]],
      location: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      id: [""],
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    // this.commodityList();
   

     this.httpService.get<any>(this.commonService.getCategoryDropdown).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {

      }
    }
    );
 
       // Location dropdown
       this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
        next: (data) => {
          this.locationDdList = data;
        },
        error: (error) => {
  
        }
      }
      );
 
       // department dropdown
       this.httpService.get<any>(this.commonService.getDepartmentDropdown).subscribe({
        next: (data) => {
          this.departmentDdList = data;
        },
        error: (error) => {
  
        }
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
   onSubmit() {
     console.log("Form Value", this.docForm.value);
     this.assetMaster = this.docForm.value;
     console.log(this.assetMaster);
     this.assetService.addAssetMaster(this.assetMaster);
     const dialogRef = this.dialog.open(EmployeePopupComponent, {
       height: "130px",
       width: "600px",
       // data: row,
       // direction: tempDirection,
     });
    
     //this.router.navigate(['/admin/country-Master/list-CountryMaster']);
   }
   refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  
   update(){

    this.assetMaster = this.docForm.value;
    this.assetService.assetupdate(this.assetMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    
    );
   
    
    this.router.navigate(['/asset/assetMaster/listAssetMaster']);
   

   }
    // Edit
    fetchDetails(id: any): void {
      const obj = {
        editId: id
      }
      
      this.assetService.editAsset(obj).subscribe({
        next: (res: any) => {
          
     
 
       this.docForm.patchValue({
         
         'assetName': res.addAssetBean.assetName,
         'assetCode': res.addAssetBean.assetCode,
         'location': res.addAssetBean.locationName,
         'category': res.addAssetBean.categoryName,
         'status' : res.addAssetBean.status,
         'id': res.addAssetBean.id
      })
       },
       error: (error) => {
       
        // error code here
      }
      
    });
    
     
   
     /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
       console.log(id);
       },
       (err: HttpErrorResponse) => {
          // error code here
       }
     );*/
   }
   
   commodityList(){
     this.httpService.get<AssetMasterResultBean>(this.assetService.commoditylist).subscribe( 
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
   private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  multipleuploadpopupCall() {
    //this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(AddMultipleAssetMasterComponent, {
      data: {
       // employees: row,
        action: "edit",
      },
      width: "640px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
       // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
       //   (x) => x.id === this.id
       // );
        // Then you update that record using data from dialogData (values you enetered)
        //this.exampleDatabase.dataChange.value[foundIndex] =
         //this.employeesService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
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
   
   this.httpService.post<any>(this.assetService.addAssetUploadFiles, frmData).subscribe(data => {
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
     
     this.httpService.post<any>(this.assetService.addAssetUploadFiles, frmData).subscribe(data => {
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

    //  goMultipleUpload(){

    //   this.router.navigate(['listAssetMaster']);
    //  }
 
 }
 
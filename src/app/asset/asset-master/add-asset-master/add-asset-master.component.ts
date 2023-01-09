import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AddMultipleAssetMasterComponent } from '../add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetMaster } from '../asset-model';
import { AssetMasterResultBean } from '../asset-result-bean';
import { AssetService } from '../asset.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';


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
  filePathUrl:string;
  filePathUploadUrl:string;
  submitted: boolean=false;

  assetMaster: AssetMaster;
  categoryList=[];
  locationDdList=[];
  departmentDdList=[];
  vendorDdList=[];
  requestId: any;
  edit:boolean=false;
  isLineIn:boolean=false;
  spinner: any;
  fileImgPathUrl: any;
  assetnamelist: any;
  assetDetailsList: any;
  filePath1: any;
  filePath: any;
  uomList: any;
  filePathUrl1: any;
  
  
  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private  assetService: AssetService, 
    private commonService: CommonService,
    public router:Router,
    private snackBar: MatSnackBar,
    public notificationService:NotificationService,
    private cmnService:CommonService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private serverUrl: serverLocations) {
    super();
    
    this.docForm = this.fb.group({

      
      //info
      assetName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      assetCode: ["",[Validators.required]],
      location: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      isLine:[false],
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
      imgUploadUrl:[""],
      //tab5
     assetMasterBean: this.fb.array([
        this.fb.group({
          assName:[""],
          assCode:[""],
          assLocation:[""],
          assCategory:[""],
          assStatus:[""],
          assetId:[""]
         
        }) 
      ])
      
      
    });
    
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.filePath = this.serverUrl.apiServerAddress;
    this.filePath1 = this.serverUrl.apiServerAddress;

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
       this.getInLine(event); 

      }
     });

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


           // vendor dropdown
           //UOM Dropdown List
    this.httpService.get<any>(this.commonService.getUOMDropdown).subscribe({
      next: (data) => {
        this.uomList = data;
      },
      error: (error) => {
      }
    });




  // assetname dropdown
   this.httpService.get<any>(this.commonService.getassetname).subscribe({
    next: (data) => {
      this.assetnamelist = data;
    },
    error: (error) => {

    }
  }
  );
   }

// assetDetailsList

assetDetails(value:any,i){

    this.httpService.get<any>(this.assetService.getAssetDetails+"?assetId=" +value.value).subscribe({
    next: (res: any) => {
        if (res.success) {
          if(res.assetList!=null && res.assetList.length>=1){
            let dtlArray = this.docForm.controls.assetMasterBean as FormArray;
            dtlArray.removeAt(i);
            res.assetList.forEach(element => {
              let assetListDtlArray = this.docForm.controls.assetMasterBean as FormArray;
              let arraylen = assetListDtlArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                assName:[value.value],
                assCode:[element.assetCode],
                assLocation:[element.locationName],
                assCategory:[element.categoryName],
                assStatus:[element.status],
                assetId:[element.assetId]
              })
              assetListDtlArray.insert(i, newUsergroup);
            });
          }
        }
      },
    error: (error) => {

  }
}
);
   }
   
   onSubmit() {
    this.submitted=true;

  if (this.docForm.valid) {

     this.assetMaster = this.docForm.value;
     console.log(this.assetMaster);
     this.assetService.addAssetMaster(this.assetMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.onCancel();
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        // this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "bottom",
          "center"
        );
      }
    });
  }else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right"
    );
  }
}

onCancel() {
  this.router.navigate(['/asset/assetMaster/listAssetMaster']);
}

   refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  
  update() {
    this.submitted=true;

    if (this.docForm.valid) {
      this.assetMaster = this.docForm.value;
      // this.spinner.show();
      this.assetService.updateAssetMaster(this.assetMaster).subscribe({
        next: (data) => {
          // this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Edit Record Successfully",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Updated Successfully...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          // this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
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
         'location': res.addAssetBean.location,
         'category': res.addAssetBean.category,
         'status' : res.addAssetBean.status,
         'isLine' : res.addAssetBean.isLine,
         'id': res.addAssetBean.id,
         'brand': res.addAssetBean.brand,
         'model': res.addAssetBean.model,
         'allottedUptoobj': this.commonService.getDateObj(res.addAssetBean.allottedUpto),
         'allottedUpto': res.addAssetBean.allottedUpto,
         'captitalizationDateobj': this.commonService.getDateObj(res.addAssetBean.captitalizationDate),
         'captitalizationDate': res.addAssetBean.captitalizationDate,
         'captitalizationPrice': res.addAssetBean.captitalizationPrice,
         'condition': res.addAssetBean.condition,
         'department': res.addAssetBean.department,
         'depreciation': res.addAssetBean.depreciation,
         'description': res.addAssetBean.description,
         'endLife': res.addAssetBean.endLife,
         'invoiceNo': res.addAssetBean.invoiceNo,
         'imgUploadUrl': res.addAssetBean.imgUploadUrl,
         'invoiceDateobj': this.commonService.getDateObj(res.addAssetBean.invoiceDate),
         'invoiceDate': res.addAssetBean.invoiceDate,
         'linkedAsset': res.addAssetBean.linkedAsset,
         'poNumber': res.addAssetBean.poNumber,
         'purchasePrice': res.addAssetBean.purchasePrice,
         'remarks': res.addAssetBean.remarks,
         'scrapValue': res.addAssetBean.scrapValue,
         'selfOrPartner': res.addAssetBean.selfOrPartner,
         'serialNo': res.addAssetBean.serialNo,
         'transferredTo': res.addAssetBean.transferredTo,
         'uploadFiles': res.addAssetBean.uploadFiles,
         'uploadImg': res.addAssetBean.uploadImg,
         'vendor': res.addAssetBean.vendor,



      })

      this.getInLine(res.addAssetBean.isLine);
     
      this.filePathUrl= res.addAssetBean.uploadImg;
      this.filePathUrl1= res.addAssetBean.uploadFiles;



      if (res.detailList != null && res.detailList.length >= 1) {
        let detailListArray = this.docForm.controls.assetMasterBean as FormArray;
        detailListArray.clear();
        res.detailList.forEach(element => {
          let detailListArray = this.docForm.controls.assetMasterBean as FormArray;
          let arraylen = detailListArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            assName: [element.assName],
            assCode: [element.assCode],
            assLocation: [element.assLocation],
            assCategory: [element.assCategory],
            assStatus: [element.assStatus],
          })
          detailListArray.insert(arraylen, newUsergroup);
        });
      }
    },
       error: (error) => {
       
      }
    });
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
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(AddMultipleAssetMasterComponent, {
      data: {
        action: "edit",
      },
      width: "640px",
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
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
  onSelectFile(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName",fileExtension);
    console.log(frmData);
    this.httpService.post<any>(this.assetService.addAssetImageUploadFiles, frmData).subscribe(data => {
        console.log(data);
        if(data.success){
          this.docForm.patchValue({
            'uploadImg': data.filePath1  
         })
         this.filePathUrl=data.filePath1; 
         console.log(this.filePath);
     console.log(this.filePathUrl);
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

  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 
   // File upload
   getCreditFileDetails(event) {
  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  this.httpService.post<any>(this.assetService.addAssetUploadFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        this.docForm.patchValue({
          'uploadFiles': data.filePath  
       })
       this.filePathUrl1=data.filePath1; 
         console.log(this.filePath);
     console.log(this.filePathUrl1);
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

    cancel()
    {
      this.router.navigate(['/asset/assetMaster/listAssetMaster']);
    }


    addRowSelf(){
      let dtlArray = this.docForm.controls.assetMasterBean as FormArray;
      let arraylen = dtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        assName:[""],
        assCode:[""],
        assLocation:[""],
        assCategory:[""],
        assStatus:[""],
        assetId:[""]
      })
      dtlArray.insert(arraylen,newUsergroup);
    
    }
    
    removeRowSelf(index){
      let dtlArray = this.docForm.controls.assetMasterBean as FormArray;
      dtlArray.removeAt(index);
    
    }
    
    getInLine(event: any)
    {
      if(event)
      {
        this.isLineIn=true;
      }
      else
      {
        this.isLineIn=false;
      }
    }
 
 }
 
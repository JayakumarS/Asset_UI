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
import { NgxSpinnerService } from "ngx-spinner";
import { GrnService } from 'src/app/inventory/grn/grn.service';


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
  submitted: boolean=false;
  assetMaster: AssetMaster;
  categoryList=[];
  locationDdList=[];
  departmentDdList=[];
  vendorDdList=[];
  requestId: any;
  edit:boolean=false;
  grnFlag: boolean = false;
  grnNumberList = [];
  purchaseOrderNumber = [];

  isLineIn:boolean=false;
  assetnamelist: any;
  assetDetailsList: any;
  uomList: any;
  filePathUrl: string;
  imgPathUrl: string;
  private acceptImageTypes = ["image/jpg", "image/png", "image/jpeg"]
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  
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
    private serverUrl: serverLocations,
    private spinner: NgxSpinnerService,
    public grnService: GrnService
    ) {
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
      grnList:[""],
      grnId:[""],
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
      ]),
      
    });
    
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId);
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

 //purchaseOrderNumber Dropdown List
 this.httpService.get<any>(this.commonService.getPurchaseOrderNumberDropdown).subscribe({
  next: (data) => {
    this.purchaseOrderNumber = data;
  },
  error: (error) => {
  }
});
           // vendor dropdown
           //UOM Dropdown List
    this.httpService.get<any>(this.commonService.getUOMDropdown).subscribe({
      next: (data) => {
        this.uomList = data;
      },
      error: (error) => {
      }
    });


//PurchaseOrderNumber Dropdown List
this.httpService.get<any>(this.commonService.getGRNNumberDropdown).subscribe({
  next: (data) => {
    this.grnNumberList = data;
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
     this.spinner.show();
     this.assetService.addAssetMaster(this.assetMaster).subscribe({
      next: (data) => {
        this.spinner.hide();
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
         this.spinner.hide();
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
    if (this.docForm.valid) {
      this.assetMaster = this.docForm.value;
       this.spinner.show();
      this.assetService.updateAssetMaster(this.assetMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
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
           this.spinner.hide();
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
         'allottedUptoobj': res.addAssetBean.allottedUpto!=null? this.commonService.getDateObj(res.addAssetBean.allottedUpto):"",
         'allottedUpto': res.addAssetBean.allottedUpto,
         'captitalizationDateobj': res.addAssetBean.captitalizationDate!=null? this.commonService.getDateObj(res.addAssetBean.captitalizationDate):"",
         'captitalizationDate': res.addAssetBean.captitalizationDate,
         'captitalizationPrice': res.addAssetBean.captitalizationPrice,
         'condition': res.addAssetBean.condition,
         'department': res.addAssetBean.department,
         'depreciation': res.addAssetBean.depreciation,
         'description': res.addAssetBean.description,
         'endLife': res.addAssetBean.endLife,
         'invoiceNo': res.addAssetBean.invoiceNo,
         'imgUploadUrl': res.addAssetBean.imgUploadUrl,
         'invoiceDateobj':res.addAssetBean.invoiceDate!=null? this.commonService.getDateObj(res.addAssetBean.invoiceDate):"",
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
     
      if (res.addAssetBean.uploadImg != undefined && res.addAssetBean.uploadImg != null && res.addAssetBean.uploadImg != '') {
        this.imgPathUrl = res.addAssetBean.uploadImg;
      }
      if (res.addAssetBean.uploadFiles != undefined && res.addAssetBean.uploadFiles != null && res.addAssetBean.uploadFiles != '') {
        this.filePathUrl = res.addAssetBean.uploadFiles;
      }


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
 
  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNameNumber(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

   keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

    getGRN(event: any)
    {
      if(event)
      {
        this.grnFlag=true;
      }
      else
      {
        this.grnFlag=false;
      }
    }

    //FOR IMAGE UPLOAD ADDED BY GOKUL
  onSelectImage(event) {
    var imgfile = event.target.files[0];
    if (!this.acceptImageTypes.includes(imgfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "bottom",
        "center"
      );
      return;
    }
    if (imgfile.size > 2000000) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 2mb",
        "bottom",
        "center"
      );
      return;
    }

    var fileExtension = imgfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", imgfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "AssetProfileImg");

    this.httpService.post<any>(this.commonService.commonUploadFile, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'uploadImg': data.filePath
            })
            this.imgPathUrl=data.filePath;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload Image",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload Image",
          "bottom",
          "center"
        );
      }
    });
  }


      //FOR DOCUMENT UPLOAD ADDED BY GOKUL
  onSelectFile(event) {
    var docfile = event.target.files[0];
    if (!this.acceptFileTypes.includes(docfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "bottom",
        "center"
      );
      return;
    }
    if (docfile.size > 5242880) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 5mb",
        "bottom",
        "center"
      );
      return;
    }
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "AssetProfileFile");

    this.httpService.post<any>(this.commonService.commonUploadFile, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'uploadFiles': data.filePath
            })
            this.filePathUrl=data.filePath;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload File",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "bottom",
          "center"
        );
      }
    });
  }

  //FOR DOCUMENT VIEW ADDED BY GOKUL
  viewDocuments(filePath: any, fileName: any) {
    this.spinner.show();
    this.commonService.viewDocument(filePath).pipe().subscribe({
      next: (result: any) => {
        this.spinner.hide();
        var blob = result;
        var fileURL = URL.createObjectURL(blob);
        if (fileName.split('.').pop().toLowerCase() === 'pdf') {
          window.open(fileURL);
        } else {
          var a = document.createElement("a");
          a.href = fileURL;
          a.target = '_blank';
          a.download = fileName;
          a.click();
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          "Failed to View File",
          "bottom",
          "center"
        );
      }
    });
  }


  getGRNDetails(GRNID: number) {
    if (GRNID != undefined && GRNID != null) {
      this.spinner.show();
      this.httpService.get<any>(this.grnService.getGRNDetails + "?grnId=" + GRNID).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res.success) {
            if (res.grn != null) {
              this.docForm.patchValue({
         
         'location': res.grn.deliveryLocId,
         'invoiceNo': res.grn.invoiceNo,
         'invoiceDateobj':res.grn.invoiceDate!=null? this.commonService.getDateObj(res.grn.invoiceDate):"",
         'invoiceDate': res.grn.invoiceDate,
         'poNumber': res.grn.purchaseOrderId,
         'vendor': res.grn.vendorName,
                
              })
            }
          }
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }
  }

 
 }
 
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { NgxSpinnerService } from "ngx-spinner";
import { GrnService } from 'src/app/inventory/grn/grn.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';
import { AssetService } from '../../asset-master/asset.service';
import { AddMultipleAssetMasterComponent } from '../../asset-master/add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetReplacement } from '../asset-replacement.model';
import { AssetReplacementService } from '../asset-replacement.service';

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
  selector: 'app-add-asset-replacement',
  templateUrl: './add-asset-replacement.component.html',
  styleUrls: ['./add-asset-replacement.component.sass'],
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
export class AddAssetReplacementComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  dropdownList = [];
  submitted: boolean = false;
  assetReplacement: AssetReplacement;
  categoryList = [];
  locationDdList = [];
  requestId: any;
  edit: boolean = false;
  grnFlag: boolean = false;
  isLineIn: boolean = false;
  assetnamelist: any;
  assetnamelistReplace: any;
  companyId: string;
  branchId: string;

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private assetService: AssetService,
    private assetReplacementService: AssetReplacementService,
    private commonService: CommonService,
    public router: Router,
    private snackBar: MatSnackBar,
    public notificationService: NotificationService,
    private cmnService: CommonService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private serverUrl: serverLocations,
    private spinner: NgxSpinnerService,
    public grnService: GrnService,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,

  ) {
    super();

    this.docForm = this.fb.group({
      //info
      id: [""],
      fullOrPartial: [""],

      
      assetMasterBean: this.fb.array([
        this.fb.group({
          assName: [""],
          assCode: [""],
          assLocation: [""],
          assCategory: [""],
          assStatus: [""],
          assetId: [""]

        })
      ]),

      assetMasterBeanReplacement: this.fb.array([
        this.fb.group({
          assName: [""],
          assCode: [""],
          assLocation: [""],
          assCategory: [""],
          assStatus: [""],
          assetId: [""]

        })
      ]),
    });


    
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        this.fetchDetails(this.requestId);

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
     this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );

    // assetname dropdown
    this.companyId=this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe({

      next: (data) => {
        this.assetnamelist = data;
      },
      error: (error) => {

      }
    }
    );

  }

  // assetDetailsList

  assetDetails(value: any, i) {

    this.httpService.get<any>(this.assetService.getAssetDetails + "?assetId=" + value.value).subscribe({
      next: (res: any) => {
        if (res.success) {
          if (res.assetList != null && res.assetList.length >= 1) {
            let dtlArray = this.docForm.controls.assetMasterBean as FormArray;
            dtlArray.removeAt(i);
            res.assetList.forEach(element => {
              let assetListDtlArray = this.docForm.controls.assetMasterBean as FormArray;
              let arraylen = assetListDtlArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                assName: [value.value],
                assCode: [element.assetCode],
                assLocation: [element.locationName],
                assCategory: [element.categoryName],
                assStatus: [element.status],
                assetId: [element.assetId],

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


  assetDetailsReplacement(value: any, i) {
    let dtlArray = this.docForm.controls.assetMasterBean as FormArray;

    this.httpService.get<any>(this.assetService.getAssetDetailsReplacement + "?assetId=" + value.value).subscribe({
      next: (res: any) => {
        if (res.success) {
          if (res.assetList != null && res.assetList.length >= 1) {
            let dtlArray = this.docForm.controls.assetMasterBeanReplacement as FormArray;
            dtlArray.removeAt(i);
            res.assetList.forEach(element => {
              let assetListDtlArray = this.docForm.controls.assetMasterBeanReplacement as FormArray;
              let arraylen = assetListDtlArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                assName: [value.value],
                assCode: [element.assetCode],
                assLocation: [element.locationName],
                assCategory: [element.categoryName],
                assStatus: [element.status],
                assetId: [element.assetId],

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
    this.submitted = true;

    if (this.docForm.valid) {

      this.assetReplacement = this.docForm.value;
      console.log(this.assetReplacement);
      this.spinner.show();
      this.assetReplacementService.addAssetReplacement(this.assetReplacement).subscribe({
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
    } else {
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

    this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );

    this.assetReplacementService.editAsset(obj).subscribe({
      next: (res: any) => {

        this.docForm.patchValue({
         
          'id': res.addAssetReplacementBean.id,
          'fullOrPartial':res.addAssetReplacementBean.fullOrPartial,
    
        })

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

  onCancel() {
    this.router.navigate(['/asset/assetReplacement/listAssetReplacement']);
  }

  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  update() {
    if (this.docForm.valid) {
      this.assetReplacement = this.docForm.value;
      this.spinner.show();
      this.assetReplacementService.updateAssetReplacement(this.assetReplacement).subscribe({
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
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
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

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'putUseDateArray') {
      let grnBasedAssetArray = this.docForm.controls.grnBasedAssetList as FormArray;
      grnBasedAssetArray.at(index).patchValue({
        putUseDate: cdate
      });
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
    const pattern = /[ a-z A-Z0-9 !@()#$%&*_+'\-=\;:\\|,.\/? ]/;
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


  

  getInLineFull(event: any) {
    if (event) {
      this.isLineIn = true;
    }
    else {
      this.isLineIn = false;
    }
  }

  getInLinePartial(event: any) {
    if (event) {
      this.isLineIn = false;
    }
    else {
      this.isLineIn = true;
    }
  }

  




 

  resetSelf(){
    this.getInLineFull(false);
    this.docForm = this.fb.group({

    
      partialOrReplace: [""],

      assetMasterBean: this.fb.array([
        this.fb.group({
          assName: [""],
          assCode: [""],
          assLocation: [""],
          assCategory: [""],
          assStatus: [""],
          assetId: [""]

        })
      ]),

      assetMasterBeanReplacement: this.fb.array([
        this.fb.group({
          assName: [""],
          assCode: [""],
          assLocation: [""],
          assCategory: [""],
          assStatus: [""],
          assetId: [""]

        })
      ]),
    });

    
  }


  

}

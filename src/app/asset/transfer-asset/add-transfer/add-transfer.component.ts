import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TransferAssetService } from '../transfer-asset.service';
import { TransferBean } from '../transfer-model';

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
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html',
  styleUrls: ['./add-transfer.component.sass'],
  // Date Related code
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


export class AddTransferComponent implements OnInit {
  docForm: FormGroup;
  transferBean:TransferBean;
  edit: boolean = false
  vendorList=[];
  locationList=[];
  employeeList=[];
  companyList=[];
  assetList=[];
  requisitionList=[];
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');

  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public transferAssetService: TransferAssetService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations) { }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      transferDate: [""],
      transferDateObj: [moment().format('YYYY-MM-DD'),[Validators.required]],
      requisitionNo: ["", [Validators.required]],
      transportationType: ["", [Validators.required]],
      requisitionDate: [""],
      sourceLocation: [""],
      requestedBy: [""],
      destinationLocation: [""],
      deliveryMethod: ["", [Validators.required]],
      hospital: ["", [Validators.required]],
      status: ["", [Validators.required]],
      itemName: [""],
      itemCategory: [""],
      requestedQuantity: [""],
      eddDate: [""],
      transferQuantity: ["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),

      addAssetDetail: this.fb.array([
        this.fb.group({
          assetTrackNo: [""],
          assetName: [''],
          serialNo: [''],
          assetLocation: [''],
          responsible: [''],
          assetUser: [''],
        })
      ]),
    });

     //Vendor  Dropdown List
     this.httpService.get<any>(this.commonService.getVendorDropdown).subscribe({
      next: (data) => {
        this.vendorList = data;
      },
      error: (error) => {
      }
    });

      // Location list dropdown
  this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe(
    (data) => {
      this.locationList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // Asset Name Dropdown
  this.httpService.get<any>(this.commonService.getassetname).subscribe(
    (data2) => {
      this.assetList = data2;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // Requisition No Dropdown
  this.httpService.get<any>(this.commonService.getRequisitionList).subscribe(
    (data3) => {
      this.requisitionList = data3;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  //Employee dropdown
  this.httpService.get<any>(this.commonService.getEmployeeDropdown).subscribe(
    (data) => {
      console.log(data);
      this.employeeList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  //Company List
  this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe(
    (data) => {
      console.log(data);
      this.companyList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  }

  reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId()
      })
    } else {
      //this.fetchDetails(this.requestId);
    }
  }

    // For Date related code
    getDateString(event, inputFlag, index) {
      let cdate = this.commonService.getDate(event.target.value);
      if (inputFlag == 'transferDate') {
        this.docForm.patchValue({ transferDate: cdate });
      }
    }

    removeRow(index) {
      let addAssetDetailArray = this.docForm.controls.addAssetDetail as FormArray;
      addAssetDetailArray.removeAt(index);
    }
  
    addRow() {
      let addAssetDetailArray = this.docForm.controls.addAssetDetail as FormArray;
      let arraylen = addAssetDetailArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        assetTrackNo: [""],
          assetName: [''],
          serialNo: [''],
          assetLocation: [''],
          responsible: [''],
          assetUser: [''],
      })
      addAssetDetailArray.insert(arraylen, newUsergroup);
    }

    onSubmit(){ 
    if(this.docForm.valid){
      this.transferBean = this.docForm.value;
      console.log(this.transferBean)
      this.transferAssetService.addtransferNew(this.transferBean);
      this.showNotification(
        "snackbar-success",
        "Record Added Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/asset/assetTransfer/listtransfer']);
          } 
      else {
        this.showNotification(
          "snackbar-danger",
          "Please fill required details",
          "top",
          "right"
        );
      }
    }

    getRequestDetails(data:any){
      this.httpService.get<any>(this.transferAssetService.getRequestDetails + "?requestId=" + data).subscribe(
        (data5) => {
          console.log(data);
          this.docForm.patchValue({
            'requisitionDate':data5.transferBean.requisitionDate,
            'requestedBy':data5.transferBean.requestedBy,
            'sourceLocation':data5.transferBean.sourceLocation,
            'destinationLocation':data5.transferBean.destinationLocation,
            'itemName':data5.transferBean.itemName,
            'itemCategory':data5.transferBean.itemCategory,
            'requestedQuantity':data5.transferBean.requestedQuantity,
            'eddDate':data5.transferBean.eddDate
          })

          let addAssetDetailArray = this.docForm.controls.addAssetDetail as FormArray;
          addAssetDetailArray.removeAt(0);
          addAssetDetailArray.clear();
          data5.transferBean.addAssetDetail.forEach(element => {
            let addAssetDetailArray = this.docForm.controls.addAssetDetail as FormArray;
                let arraylen = addAssetDetailArray.length;
                let newUsergroup: FormGroup = this.fb.group({
                  
                  assetTrackNo:[element.assetTrackNo],
                  assetName:[element.assetName],
                  serialNo:[element.serialNo],
                  assetLocation:[element.assetLocation],
                  responsible:[element.responsible],
                  assetUser:[element.assetUser],
                });
                addAssetDetailArray.insert(arraylen,newUsergroup);
            });

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

    update(){

    }

    onCancel(){
      this.router.navigate(['/asset/assetTransfer/listtransfer']);
    }

}

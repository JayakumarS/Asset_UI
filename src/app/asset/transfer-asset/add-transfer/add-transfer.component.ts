import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AssetRequisitionService } from '../../asset-requisition/asset-requisition.service';
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
  requisitionListNew=[];
  requisitionAll=[];
  requestId:number;
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  userName: any;
  companyId: string;
  branchId: string;

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
    private token: TokenStorageService,
    private assetRequisitionService :AssetRequisitionService,
    private serverUrl: serverLocations) { }

  ngOnInit(): void {

    this.companyId=this.token.getCompanyId();
    this.branchId=this.token.getBranchId();

    this.docForm = this.fb.group({
      transferDate: [""],
      transferDateObj: [moment().format('YYYY-MM-DD'),[Validators.required]],
      requisitionNo: [""],
      requisitionNumber: [""],
      transportationType: ["", [Validators.required]],
      requisitionDate: [""],
      sourceLocation: [""],
      requestedBy: this.tokenStorage.getUsername(),
      destinationLocation: [""],
      deliveryMethod: ["", [Validators.required]],
      hospital: ["", [Validators.required]],
      branchId:[""],
      status: [1, [Validators.required]],
      itemName: [""],
      itemCategory: [""],
      requestedQuantity: [""],
      eddDate: [""],
      transferQuantity: ["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),
      destinationLocationId: [""],
      assetId:[""],
      addAssetDetail: this.fb.array([
        this.fb.group({
          assetTrackNo: [""],
          assetName: [''],
          // serialNo: [''],
          assetLocation: [''],
          responsible: [''],
          assetUser: [''],
        })
      ]),
    });

    this.docForm.patchValue({
      'branchId':this.branchId
    })
    // this.userName = this.token.getUsername();

    //  this.docForm.patchValue({
    //    'requestedBy':this.userName
    // })

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
  this.companyId=this.tokenStorage.getCompanyId();
  this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe(
    (data2) => {
      this.assetList = data2;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  this.httpService.get<any>(this.assetRequisitionService.listUrl+"?companyId="+this.companyId).subscribe(
    (data5) => {
      this.requisitionListNew = data5.assetRequisitionDetails;
     for(let k=0;k<this.requisitionListNew.length;k++){
      if(this.edit==false) {
     if(this.requisitionListNew[k].expiryStatus!='Expired'){
      this.requisitionAll.push(this.requisitionListNew[k]);
      }
    } else {
      this.requisitionAll = this.requisitionListNew;
    }
     }
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

  this.docForm.controls.status.disable();

  this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
     this.edit=true;
     this.fetchDetails(this.requestId) ;
     this.docForm.controls.status.enable();
    }
   });

  }


  fetchDetails(id: any,): void {
    this.httpService.get(this.transferAssetService.editTransfer+"?transfer="+id).subscribe((res: any)=> {
      console.log(res);
        this.docForm.patchValue({
          'transferDateObj': this.commonService.getDateObj(res.transferBean.transferDate),
          'transferDate': res.transferBean.transferDate,
          'requisitionNo':res.transferBean.requisitionNo,
          'transportationType':res.transferBean.transportationType,
          'deliveryMethod':res.transferBean.deliveryMethod,
          'transferQuantity':res.transferBean.transferQuantity
        });
        this.getRequestDetails(res.transferBean.requisitionNo);
      },
      (err: HttpErrorResponse) => {
        this.showNotification(
          "snackbar-danger",
          "Error while getting information !",
          "top",
          "right"
        );
      }
    );
  }

  reset() {
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
      branchId:[""],
      status: [1, [Validators.required]],
      itemName: [""],
      itemCategory: [""],
      requestedQuantity: [""],
      eddDate: [""],
      transferQuantity: ["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),
      destinationLocationId: [""],
      assetId:[""],
      addAssetDetail: this.fb.array([
        this.fb.group({
          assetTrackNo: [""],
          assetName: [''],
          // serialNo: [''],
          assetLocation: [''],
          responsible: [''],
          assetUser: [''],
        })
      ]),
    });

    this.docForm.controls.status.disable();

    this.docForm.patchValue({
      'branchId':parseInt(this.branchId),
      'hospital':parseInt(this.companyId),
   })
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
          // serialNo: [''],
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
      // this.transferAssetService.addtransferNew(this.transferBean);
      this.transferAssetService.addtransferNew(this.transferBean).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            this.router.navigate(['/asset/assetTransfer/listtransfer']);
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "bottom",
              "center"
            );
          }
        }
      });
      
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

      this.httpService.get<any>(this.transferAssetService.checkRequestValidity + "?request=" + data).subscribe(
        (data6) => {
if(data6.count==0 || this.edit==true){
          this.httpService.get<any>(this.transferAssetService.getRequestDetails + "?requestId=" + data+"&companyId="+this.companyId).subscribe(
            (data5) => {
              console.log(data5);
              this.docForm.patchValue({
                'requisitionDate':data5.transferBean.requisitionDate,
                'requestedBy':data5.transferBean.requestedBy,
                'sourceLocation':data5.transferBean.sourceLocation,
                'destinationLocation':data5.transferBean.destinationLocation,
                'itemName':data5.transferBean.itemName,
                'itemCategory':data5.transferBean.itemCategory,
                'requestedQuantity':data5.transferBean.requestedQuantity,
                'hospital':data5.transferBean.companyId,
                'eddDate':data5.transferBean.eddDate,
                'destinationLocationId':data5.transferBean.destLocationId,
                'assetId':data5.transferBean.assetId
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
                      // serialNo:[element.serialNo],
                      assetLocation:[parseInt(element.assetLocationName)],
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
  } else {
    this.showNotification(
      "snackbar-danger",
      "Request number is already used",
      "top",
      "right"
    );
  }
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        )
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
       this.userName=this.tokenStorage.getUsername();
      if(this.docForm.get("status").value==2){
        this.httpService.get(this.transferAssetService.updateStatus+ "?headerID=" + this.requestId+"&destinationLocationId="+this.docForm.get("destinationLocationId").value+"&userName="+this.userName).subscribe((res: any) => {
          this.showNotification(
            "snackbar-success",
            "Received Successfully...!!!",
            "bottom",
            "center"
          );
          this.router.navigate(['/asset/assetTransfer/listtransfer']);
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );
      }else{
        this.docForm.controls['status'].setErrors({ status: true });
        this.showNotification(
          "snackbar-danger",
          "Please Change the Status",
          "top",
          "right"
        );
      }
    }

    onCancel(){
      this.router.navigate(['/asset/assetTransfer/listtransfer']);
    }


    checkQuantity(val){
      
      if(this.docForm.get("requestedQuantity").value!=""){
        if(parseInt(val)>parseInt(this.docForm.get("requestedQuantity").value)){
          this.docForm.controls['transferQuantity'].setErrors({ quantity: true });
        }
      }
     

;    }

}

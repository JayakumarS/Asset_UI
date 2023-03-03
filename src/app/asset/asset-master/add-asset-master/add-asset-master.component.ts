import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { AddMultipleAssetMasterComponent } from '../add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetMaster } from '../asset-model';
import { AssetMasterResultBean } from '../asset-result-bean';
import { AssetService } from '../asset.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { NgxSpinnerService } from "ngx-spinner";
import { GrnService } from 'src/app/inventory/grn/grn.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import * as moment from 'moment';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';

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
export class AddAssetMasterComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dropdownList = [];
  submitted: boolean = false;
  uploadFile: boolean = false;
  uploadImage: boolean = false;
  assetMaster: AssetMaster;
  categoryList = [];
  currencyListbasedCompany: [];
  locationDdList = [];
  departmentDdList = [];
  vendorDdList = [];
  requestId: any;
  currencyList: [];
  edit: boolean = false;
  grnBasedMutipleAssetFlag: boolean = false;
  quantityBasedMutipleAssetFlag: boolean = false;
  grnNumberList = [];
  purchaseOrderNumber = [];
  itemCodeNameList = [];
  lineMasterList = [];
  isLineIn: boolean = false;
  assetnamelist: any;
  assetDetailsList: any;
  uomList: any;
  filePathUrl: any;
  imgPathUrl: any;
  private acceptImageTypes = ["image/jpg", "image/png", "image/jpeg"]
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  assetUserList: any;
  companyId: string;
  branchId: string;
  // Category
  computerFlag: boolean = false;
  furnitureFlag: boolean = false;
  isCategory: boolean = false;
  officeFlag: boolean = false;
  vehicleFlag: boolean = false;
  plantFlag: boolean = false;
  //
  isOwned: boolean = true;
  isRented: boolean = false;
  isThirdParty: boolean = false;
  statusDdList: any;
  brandDdList: any;
  isBrand: boolean = true;
  isUnBrand: boolean = false;


  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private assetService: AssetService,
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
    public el: ElementRef,

  ) {
    super();

    this.docForm = this.fb.group({
      //info
      assetName: [""],
      itemId: [""],
      assetCode: [""],
      location: [""],
      category: ["", [Validators.required]],
      status: [""],
      putUseDate: [moment().format('DD/MM/YYYY')],
      putUseDateObj: [moment().format('YYYY-MM-DD')],
      rentedUptoDate: [""],
      rentedUptoDateObj: [""],
      thirdPartyUptoDate: [""],
      thirdPartyUptoDateObj: [""],
      isLine: [false],
      isAuditable: [false],
      id: [""],
      uploadImg: [""],
      isGrnBasedAsset: [false],
      grnId: [""],
      assetUser: [""],
      loginedUser: this.tokenStorage.getUserId(),
      //tab1
      brand: [""],
      unBrand: [""],
      brandCheck: ["brandCheck"],
      model: [""],
      serialNo: [""],
      condition: [""],
      linkedAsset: [""],
      description: [""],
      gst: [""],
      customDuty: [""],
      otherTaxes: [""],
      transport: [""],
      instalAndCommission: [""],
      uploadFiles: [""],
      //tab2
      vendor: [""],
      poNumber: [""],
      selfOrPartner: [""],
      invoiceDate: [""],
      invoiceNo: [""],
      purchasePrice: [""],
      currency: ["", [Validators.required]],
      quantity: ["1", [Validators.required]],
      //tab3
      captitalizationPrice: [""],
      captitalizationDate: [moment().format('DD/MM/YYYY')],
      endLife: [""],
      scrapValue: [""],
      depreciation: [""],
      //tab4
      department: [""],
      allottedUpto: [""],
      transferredTo: [""],
      remarks: [""],
      invoiceDateobj: [""],
      captitalizationDateobj: [moment().format('YYYY-MM-DD')],
      allottedUptoobj: [""],
      fileUploadUrl: [""],
      imgUploadUrl: [""],
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

      //tab5
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

      //Computer
      os: [""],
      processor: [""],
      memory: [""],
      storage: [""],
      monitor: [""],
      //Furniture
      aesthetics: [""],
      quality: [""],
      safety: [""],
      sustainability: [""],
      //Office Equipment
      device: [""],
      deviceModel: [""],
      deviceStatus: [""],
      //Vehicle
      vehicleType: [""],
      vehicleEngine: [""],
      vehicleSpeed: [""],
      fuelCapacity: [""],
      vehicleWeight: [""],
      insuranceDate: [""],
      insuranceDateObj: [""],
      //Plant and Machinery
      lifeTime: [""],
      costOfLand: [""],
      substance: [""],

      quantityBasedAssetList: this.fb.array([
        this.fb.group({
          itemId: ["", [Validators.required]],
          assetName: ["", [Validators.required]],
          location: ["", [Validators.required]],
          status: ["", [Validators.required]],
          putUseDate: [moment().format('DD/MM/YYYY')],
          putUseDateObj: [moment().format('YYYY-MM-DD')],
          department: [""],
          allottedUpto: [""],
          allottedUptoobj: [""],
          transferredTo: [""],
          assetUser: ["", [Validators.required]],
          individualPurchasePrice: ["", [Validators.required]],
          lineId: [""],
          endLife: [""],
          scrapValue: [""],
          uploadImg: ["", [Validators.required]],
        })
      ]),
      assetSpecList: this.fb.array([
        this.fb.group({
          name: [""],
          value: [""],
          type: [""]
        })
      ]),
      ownedShip: ["owned"]
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        this.fetchDetails(this.requestId);
        this.getInLine(event);
        this.getBrand(event);

      }
    });



    this.httpService.get<any>(this.commonService.getCategoryDropdown + "?companyId=" + this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {

      }
    }
    );

    // Location dropdown
    this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );
    this.companyId = this.tokenStorage.getCompanyId();

    this.httpService.get<any>(this.assetService.getCompanyBasedCurrency + "?userId=" + (this.companyId)).subscribe({
      next: (data) => {
        this.currencyListbasedCompany = data.salesOrderBean;
      },
      error: (error) => {
      }
    });


    // Status dropdown
    this.httpService.get<any>(this.commonService.getStatusDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.statusDdList = data;
      },
      error: (error) => {

      }
    }
    );


    // Brand dropdown
    this.httpService.get<any>(this.commonService.getBrandDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.brandDdList = data;
      },
      error: (error) => {

      }
    }
    );


    //Item Master Dropdown List
    this.httpService.get<any>(this.commonService.getItemMasterNameWithItemCodeDropdown).subscribe({
      next: (data) => {
        this.itemCodeNameList = data;
      },
      error: (error) => {
      }
    });

      //Line Master Dropdown List
      this.httpService.get<any>(this.commonService.getLineMasterDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
        next: (data) => {
          this.lineMasterList = data;
        },
        error: (error) => {
  
        }
      }
      );

    //purchaseOrderNumber Dropdown List
    const obj = {
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
    }
    this.httpService.post<any>(this.commonService.getPurchaseOrderNumberDropdown, obj).subscribe({
      next: (data) => {
        this.purchaseOrderNumber = data;
      },
      error: (error) => {
      }
    });

    // vendor dropdown
    this.httpService.get<any>(this.commonService.getVendorDropdown + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.uomList = data;
      },
      error: (error) => {
      }
    });


    //GRN Dropdown List
    this.httpService.post<any>(this.commonService.getGRNNumberDropdown, obj).subscribe({
      next: (data) => {
        this.grnNumberList = data;
      },
      error: (error) => {
      }
    });

    // assetname dropdown
    this.companyId = this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.commonService.getassetname + "?companyId=" + this.companyId).subscribe({

      next: (data) => {
        this.assetnamelist = data;
      },
      error: (error) => {

      }
    }
    );

    //Assetuser dropdown
    this.companyId = this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.commonService.getAssetUserList + "?companyId=" + parseInt(this.tokenStorage.getCompanyId())).subscribe(

      (data) => {
        console.log(data);
        this.assetUserList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    // Department Dropdown List
    this.httpService.get<any>(this.userMasterService.departmentListUrl + "?company=" + this.tokenStorage.getCompanyId() + "").subscribe(
      (data) => {
        this.departmentDdList = data.departmentList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
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
                assStatus: [element.statusName],
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


  categoryAttributes(category: any) {
    
    this.httpService.get<any>(this.assetService.getCategorySpecificationDtlsUrl + "?category=" + category).subscribe({
      next: (res: any) => {
        if (res.success) {
          if (res.assetSpecificationDtl != null && res.assetSpecificationDtl.length > 0) {
            this.isCategory = true;
            let detailListArray = this.docForm.controls.assetSpecList as FormArray;
            detailListArray.clear();
            res.assetSpecificationDtl.forEach(element => {
              let detailListArray = this.docForm.controls.assetSpecList as FormArray;
              let arraylen = detailListArray.length;
              let newUsergroup: FormGroup = this.fb.group({
                name: [element.fieldName],
                type: [element.fieldType],
                value: [""]
                
              })
              detailListArray.insert(arraylen, newUsergroup);
            });
          }
        }else{
          this.isCategory = false;
        }
      },
      error: (error) => {

      }
    });

    if (category == 43 || category == '43') {
      this.computerFlag = true;
    } else {
      this.computerFlag = false;
    }
    if (category == 40 || category == '40') {
      this.furnitureFlag = true;
    } else {
      this.furnitureFlag = false;
    }
    if (category == 41 || category == '41') {
      this.officeFlag = true;
    } else {
      this.officeFlag = false;
    }
    if (category == 42 || category == '42') {
      this.vehicleFlag = true;
    } else {
      this.vehicleFlag = false;
    }
    if (category == 44 || category == '44') {
      this.plantFlag = true;
    } else {
      this.plantFlag = false;
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

      if (this.isOwned) {
        this.docForm.patchValue({
          'thirdPartyUptoDate': "",
          'thirdPartyUptoDateObj': "",
          'rentedUptoDate': "",
          'rentedUptoDateObj': "",
        })
      }
      if (this.isRented) {
        this.docForm.patchValue({
          'thirdPartyUptoDate': "",
          'thirdPartyUptoDateObj': "",
        })
      }
      if (this.isThirdParty) {
        this.docForm.patchValue({
          'rentedUptoDate': "",
          'rentedUptoDateObj': "",
        })
      }

      if (this.isBrand == true) {
        this.docForm.patchValue({
          'brandCheck': "brandCheck"
        })
      }


      if (this.isUnBrand == true) {
        this.docForm.patchValue({
          'brandCheck': "null"
        })
      }



      this.assetMaster = this.docForm.value;
      this.spinner.show();
      this.assetService.updateAssetMaster(this.assetMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Edit Record Successfully",
              "top",
              "right"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Updated Successfully...!!!",
              "top",
              "right"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "top",
            "right"
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
    this.assetService.editAsset(obj).subscribe({
      next: (res: any) => {
        this.httpService.get<any>(this.userMasterService.departmentListUrl + "?company=" + this.tokenStorage.getCompanyId() + "").subscribe(
          (data) => {
            this.departmentDdList = data.departmentList;
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        );

        this.docForm.patchValue({
          'assetName': res.addAssetBean.assetName,
          'assetCode': res.addAssetBean.assetCode,
          'location': res.addAssetBean.location,
          'category': res.addAssetBean.category,
          'status': res.addAssetBean.status,
          'isLine': res.addAssetBean.isLine,
          'isAuditable': res.addAssetBean.isAuditable,
          'putUseDate': res.addAssetBean.putUseDate,
          'putUseDateObj': res.addAssetBean.putUseDate != null ? this.commonService.getDateObj(res.addAssetBean.putUseDate) : "",
          'id': res.addAssetBean.id,
          'brand': parseInt(res.addAssetBean.brand),
          'unBrand': res.addAssetBean.unBrand,
          'brandCheck': res.addAssetBean.brandCheck,
          'model': res.addAssetBean.model,
          'allottedUptoobj': res.addAssetBean.allottedUpto != null ? this.commonService.getDateObj(res.addAssetBean.allottedUpto) : "",
          'allottedUpto': res.addAssetBean.allottedUpto,
          'captitalizationDateobj': res.addAssetBean.captitalizationDate != null ? this.commonService.getDateObj(res.addAssetBean.captitalizationDate) : "",
          'captitalizationDate': res.addAssetBean.captitalizationDate,
          'captitalizationPrice': res.addAssetBean.captitalizationPrice,
          'condition': res.addAssetBean.condition,
          'department': res.addAssetBean.department != null ? res.addAssetBean.department.toString() : "",
          'depreciation': res.addAssetBean.depreciation,
          'description': res.addAssetBean.description,
          'gst': res.addAssetBean.gst,
          'customDuty': res.addAssetBean.customDuty,
          'otherTaxes': res.addAssetBean.otherTaxes,
          'transport': res.addAssetBean.transport,
          'instalAndCommission': res.addAssetBean.instalAndCommission,
          'endLife': res.addAssetBean.endLife,
          'invoiceNo': res.addAssetBean.invoiceNo,
          'imgUploadUrl': res.addAssetBean.imgUploadUrl,
          'invoiceDateobj': res.addAssetBean.invoiceDate != null ? this.commonService.getDateObj(res.addAssetBean.invoiceDate) : "",
          'invoiceDate': res.addAssetBean.invoiceDate,
          'linkedAsset': parseInt(res.addAssetBean.linkedAsset),
          'poNumber': res.addAssetBean.poNumber,
          'purchasePrice': res.addAssetBean.purchasePrice,
          'currency': res.addAssetBean.currency,
          'remarks': res.addAssetBean.remarks,
          'assetUser': res.addAssetBean.assetUser,
          'scrapValue': res.addAssetBean.scrapValue,
          'selfOrPartner': res.addAssetBean.selfOrPartner,
          'serialNo': res.addAssetBean.serialNo,
          'transferredTo': parseInt(res.addAssetBean.transferredTo),
          'uploadFiles': res.addAssetBean.uploadFiles,
          'uploadImg': res.addAssetBean.uploadImg,
          'vendor': res.addAssetBean.vendor,
          //CATEGORY
          'os': res.addAssetBean.os,
          'processor': res.addAssetBean.processor,
          'memory': res.addAssetBean.memory,
          'storage': res.addAssetBean.storage,
          'monitor': res.addAssetBean.monitor,
          'aesthetics': res.addAssetBean.aesthetics,
          'quality': res.addAssetBean.quality,
          'safety': res.addAssetBean.safety,
          'sustainability': res.addAssetBean.sustainability,
          'device': res.addAssetBean.device,
          'deviceModel': res.addAssetBean.deviceModel,
          'deviceStatus': res.addAssetBean.deviceStatus,
          'vehicleType': res.addAssetBean.vehicleType,
          'vehicleEngine': res.addAssetBean.vehicleEngine,
          'vehicleSpeed': res.addAssetBean.vehicleSpeed,
          'fuelCapacity': res.addAssetBean.fuelCapacity,
          'vehicleWeight': res.addAssetBean.vehicleWeight,
          'lifeTime': res.addAssetBean.lifeTime,
          'costOfLand': res.addAssetBean.costOfLand,
          'substance': res.addAssetBean.substance,
          //

          'rentedUptoDate': res.addAssetBean.rentedUptoDate,
          'rentedUptoDateObj': res.addAssetBean.rentedUptoDate != null ? this.commonService.getDateObj(res.addAssetBean.rentedUptoDate) : "",
          'thirdPartyUptoDate': res.addAssetBean.thirdPartyUptoDate,
          'thirdPartyUptoDateObj': res.addAssetBean.thirdPartyUptoDate != null ? this.commonService.getDateObj(res.addAssetBean.thirdPartyUptoDate) : "",

          'insuranceDate': res.addAssetBean.insuranceDate,
          'insuranceDateObj': res.addAssetBean.insuranceDate != null ? this.commonService.getDateObj(res.addAssetBean.insuranceDate) : "",

        })

        if (res.addAssetBean.rentedUptoDate != null) {
          this.isRented = true;
          this.docForm.patchValue({
            'ownedShip': "rented"
          })
        } else {
          this.isRented = false;
        }

        if (res.addAssetBean.thirdPartyUptoDate != null) {
          this.isThirdParty = true;
          this.docForm.patchValue({
            'thirdParty': "thirdParty"
          })
        } else {
          this.isThirdParty = false;
        }


        if (res.addAssetBean.brandCheck == "brandCheck") {
          this.isBrand = true;
          this.isUnBrand = false;
          this.docForm.patchValue({
            'brandCheck': "brandCheck",
          })
        } else {
          this.isBrand = false;
        }

        if (res.addAssetBean.unBrandCheck == "unBrandCheck") {
          this.isUnBrand = true;
          this.isBrand = false;
          this.docForm.patchValue({
            'brandCheck': "unBrandCheck",
          })
        } else {
          this.isUnBrand = false;
        }

        this.getInLine(res.addAssetBean.isLine);
        this.categoryAttributes(res.addAssetBean.category);

        if (res.addAssetBean.uploadImg != undefined && res.addAssetBean.uploadImg != null && res.addAssetBean.uploadImg != '') {
          this.imgPathUrl = res.addAssetBean.uploadImg;
        }
        if (res.addAssetBean.uploadFiles != undefined && res.addAssetBean.uploadFiles != null && res.addAssetBean.uploadFiles != '') {
          this.filePathUrl = res.addAssetBean.uploadFiles;
        }

        let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
        quantityBasedAssetArray.clear();
        for (var i = 0; i < 1; i++) {
          let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
          let arraylen = quantityBasedAssetArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            'itemId': res.addAssetBean.itemId,
            'assetName': res.addAssetBean.assetName,
            'location': res.addAssetBean.location,
            'status': res.addAssetBean.status,
            'putUseDate': res.addAssetBean.putUseDate,
            'putUseDateObj': res.addAssetBean.putUseDate != null ? this.commonService.getDateObj(res.addAssetBean.putUseDate) : "",
            'department': res.addAssetBean.department != null ? res.addAssetBean.department.toString() : "",
            'allottedUptoobj': res.addAssetBean.allottedUpto != null ? this.commonService.getDateObj(res.addAssetBean.allottedUpto) : "",
            'allottedUpto': res.addAssetBean.allottedUpto,
            'transferredTo': parseInt(res.addAssetBean.transferredTo),
            'assetUser': res.addAssetBean.assetUser,
            'individualPurchasePrice': res.addAssetBean.individualPurchasePrice,
            'lineId': res.addAssetBean.lineId,
            'endLife': res.addAssetBean.endLife,
            'scrapValue': res.addAssetBean.scrapValue,
            'uploadImg': res.addAssetBean.uploadImg,
          })
          quantityBasedAssetArray.insert(arraylen, newUsergroup);
        }
    
      },
      error: (error) => {

      }
    });
  }

  commodityList() {
    this.httpService.get<AssetMasterResultBean>(this.assetService.commoditylist).subscribe(
      (data) => {
        this.dropdownList = data.countryMasterDetails;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 5000,
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
          "top",
          "right"
        );
      }
    });
  }

  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'captitalizationDate') {
      this.docForm.patchValue({ captitalizationDate: cdate });
    }
    else if (inputFlag == 'invoiceDate') {
      this.docForm.patchValue({ invoiceDate: cdate });
    }
    else if (inputFlag == 'allottedUpto') {
      this.docForm.patchValue({ allottedUpto: cdate });
    } else if (inputFlag == 'putUseDate') {
      this.docForm.patchValue({ putUseDate: cdate });
    } else if (inputFlag == 'putUseDateQtyArray') {
      let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
      quantityBasedAssetArray.at(index).patchValue({
        putUseDate: cdate
      });
    } else if (inputFlag == 'allottedUptoArray') {
      let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
      quantityBasedAssetArray.at(index).patchValue({
        allottedUpto: cdate
      });
    }else if (inputFlag == 'insuranceDate') {
      this.docForm.patchValue({ insuranceDate: cdate });
    }
    else if (inputFlag == 'rentedUptoDate') {
      let currDate = new Date();
      if (event.target.value < currDate) {
        let s = this.cmnService.getDate(currDate);
        this.docForm.patchValue({
          rentedUptoDate: s,
          rentedUptoDateObj: s
        });
        this.showNotification(
          "snackbar-danger",
          "Please select future date!",
          "top",
          "right"
        );
      }
      else {
        this.docForm.patchValue({ rentedUptoDate: cdate });
      }
    } else if (inputFlag == 'thirdPartyUptoDate') {
      let currDate = new Date();

      if (event.target.value < currDate) {
        let s = this.cmnService.getDate(currDate);
        this.docForm.patchValue({
          thirdPartyUptoDate: s,
          thirdPartyUptoDateObj: s
        });
        this.showNotification(
          "snackbar-danger",
          "Please select future date!",
          "top",
          "right"
        );
      }else if (inputFlag == 'specDateArray') {
        let specDtlArray = this.docForm.controls.assetSpecList as FormArray;
        specDtlArray.at(index).patchValue({value: cdate });
      } 
      else {
        this.docForm.patchValue({ thirdPartyUptoDate: cdate });
      }


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

  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  cancel() {
    this.router.navigate(['/asset/assetMaster/listAssetMaster']);
  }


  addRowSelf() {
    let dtlArray = this.docForm.controls.assetMasterBean as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      assName: [""],
      assCode: [""],
      assLocation: [""],
      assCategory: [""],
      assStatus: [""],
      assetId: [""]
    })
    dtlArray.insert(arraylen, newUsergroup);

  }

  removeRowSelf(index) {
    let dtlArray = this.docForm.controls.assetMasterBean as FormArray;
    dtlArray.removeAt(index);

  }

  getInLine(event: any) {
    if (event) {
      this.isLineIn = true;
    }
    else {
      this.isLineIn = false;
    }
  }

  getGRN(event: any) {
    if (event) {
      this.grnBasedMutipleAssetFlag = true;
      this.docForm.controls.grnId.setValidators(Validators.required);
      this.docForm.controls['grnId'].updateValueAndValidity();
      this.docForm.controls.quantity.clearValidators();
      this.docForm.controls['quantity'].updateValueAndValidity();
    }
    else {
      this.grnBasedMutipleAssetFlag = false;
      this.docForm.controls.grnId.clearValidators();
      this.docForm.controls['grnId'].updateValueAndValidity();
      this.docForm.controls.quantity.setValidators(Validators.required);
      this.docForm.controls['quantity'].updateValueAndValidity();
      this.docForm.patchValue({
        'grnId':''
      })
    }
  }

  singleAssetPopup(row) {
    console.log(row.tab.textLabel);
    if (row.tab.textLabel == 'Add Multiple Assets') {
      this.multipleuploadpopupCall();
    }
  }

  //FOR IMAGE UPLOAD ADDED BY Gokul 
  onSelectImage(event,index,type) {
    var imgfile = event.target.files[0];
    if (!this.acceptImageTypes.includes(imgfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "top",
        "right"
      );
      return;
    }
    if (imgfile.size > 2000000) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 2mb",
        "top",
        "right"
      );
      return;
    }

    var fileExtension = imgfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", imgfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "AssetProfileImg");

    this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            if(type=='ArrayAssetImg'){
              let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
              quantityBasedAssetArray.at(index).patchValue({
                uploadImg: data.filePath
              });
            }else{
              this.docForm.patchValue({
                'uploadImg': data.filePath
              })
              this.imgPathUrl = data.filePath;
              this.uploadImage = true;
            }
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload Image",
            "top",
            "right"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload Image",
          "top",
          "right"
        );
      }
    });
  }


  //FOR DOCUMENT UPLOAD ADDED BY Gokul
  onSelectFile(event) {
    var docfile = event.target.files[0];
    if (!this.acceptFileTypes.includes(docfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "top",
        "right"
      );
      return;
    }
    if (docfile.size > 5242880) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 5mb",
        "top",
        "right"
      );
      return;
    }
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "AssetProfileFile");

    this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'uploadFiles': data.filePath
            })
            this.filePathUrl = data.filePath;
            this.uploadFile = true;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload File",
            "top",
            "right"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "top",
          "right"
        );
      }
    });
  }


  viewDocuments(filePath: any, fileName: any) {
    var a = document.createElement("a");
    a.href = this.serverUrl.apiServerAddress + "asset_upload/" + filePath;
    a.target = '_blank';
    a.download = fileName;
    a.click();
  }

  getOwnerShip(check: any) {
    if (check == 'owned') {
      this.isOwned = true;
    } else {
      this.isOwned = false;
    }
    if (check == 'rented') {
      this.isRented = true;
    } else {
      this.isRented = false;
    }
    if (check == 'thirdParty') {
      this.isThirdParty = true;
    } else {
      this.isThirdParty = false;
    }
  }

  getBrand(check: any) {
    if (check == 'brandCheck') {
      this.isBrand = true;
      this.docForm.controls.brandCheck.setValidators(Validators.required);
      this.isUnBrand = false;

    } else {
      this.isBrand = false;
      this.docForm.controls.brandCheck.clearValidators();
      this.docForm.controls['brandCheck'].updateValueAndValidity();
    }
    if (check == 'unBrandCheck') {
      this.isUnBrand = true;
      this.docForm.controls.brandCheck.setValidators(Validators.required);
      this.isBrand = false;
    } else {
      this.isUnBrand = false;
      this.docForm.controls.brandCheck.clearValidators();
      this.docForm.controls['brandCheck'].updateValueAndValidity();
    }
  }


  reset() {
    this.docForm = this.fb.group({
      assetName: ["", [Validators.required]],
      assetCode: [""],
      location: ["", [Validators.required]],
      category: ["", [Validators.required]],
      status: ["", [Validators.required]],
      putUseDate: [moment().format('DD/MM/YYYY')],
      putUseDateObj: [moment().format('YYYY-MM-DD'), [Validators.required]],
      rentedUptoDate: [""],
      rentedUptoDateObj: [""],
      thirdPartyUptoDate: [""],
      thirdPartyUptoDateObj: [""],
      isLine: [false],
      isAuditable: [false],
      id: [""],
      uploadImg: ["", [Validators.required]],
      isGrnBasedAsset: [false],
      grnId: [""],
      loginedUser: this.tokenStorage.getUserId(),
      //tab1
      brand: [""],
      unBrand: [""],
      brandCheck: [""],
      unBrandCheck: [""],
      model: [""],
      serialNo: [""],
      condition: [""],
      linkedAsset: [""],
      description: [""],
      gst: [""],
      customDuty: [""],
      otherTaxes: [""],
      transport: [""],
      instalAndCommission: [""],
      uploadFiles: [""],
      //tab2
      vendor: [""],
      poNumber: [""],
      selfOrPartner: [""],
      invoiceDate: [""],
      invoiceNo: [""],
      purchasePrice: [""],
      currency: [""],
      quantity: ["1", [Validators.required]],
      //tab3
      captitalizationPrice: [""],
      captitalizationDate: [moment().format('DD/MM/YYYY')],
      endLife: [""],
      scrapValue: [""],
      depreciation: [""],
      //tab4
      department: [""],
      allottedUpto: [""],
      transferredTo: [""],
      remarks: [""],
      assetUser: [""],
      invoiceDateobj: [""],
      captitalizationDateobj: [moment().format('YYYY-MM-DD')],
      allottedUptoobj: [""],
      fileUploadUrl: [""],
      imgUploadUrl: [""],
      'companyId': this.tokenStorage.getCompanyId(),
      'branchId': this.tokenStorage.getBranchId(),

      //tab5
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

      //Computer
      os: [""],
      processor: [""],
      memory: [""],
      storage: [""],
      monitor: [""],
      //Furniture
      aesthetics: [""],
      quality: [""],
      safety: [""],
      sustainability: [""],
      //Office Equipment
      device: [""],
      deviceModel: [""],
      deviceStatus: [""],
      //Vehicle
      vehicleType: [""],
      vehicleEngine: [""],
      vehicleSpeed: [""],
      fuelCapacity: [""],
      vehicleWeight: [""],
      insuranceDate: [""],
      insuranceDateObj: [""],
      //Plant and Machinery
      lifeTime: [""],
      costOfLand: [""],
      substance: [""],


      quantityBasedAssetList: this.fb.array([
        this.fb.group({
          itemId: [""],
          assetName: [""],
          location: [""],
          status: [""],
          putUseDate: [moment().format('DD/MM/YYYY')],
          putUseDateObj: [moment().format('YYYY-MM-DD')],
          department: [""],
          allottedUpto: [""],
          allottedUptoobj: [""],
          transferredTo: [""],
          assetUser: [""],
          individualPurchasePrice: [""],
          lineId: [""],
          endLife: [""],
          scrapValue: [""],
          uploadImg: [""],
        })
      ]),
      assetSpecList: this.fb.array([
        this.fb.group({
          fieldName: [""],
          fieldValue: [""],
          fieldType: [""]
        })
      ]),
      ownedShip: ["owned"],

    });
    this.isCategory = false;
    this.isRented = false;
    this.isThirdParty = false;

    this.isBrand = false;
    this.isUnBrand = false;

    this.imgPathUrl = [];
    this.filePathUrl = [];
    this.quantityBasedMutipleAssetFlag = false;
    this.grnBasedMutipleAssetFlag = false;
  }


  //FOR DISCOUNT PERCENTAGE VALIDATION
  depreciationValidation(data: any) {
    if (data.get('depreciation').value != undefined && data.get('depreciation').value != null && data.get('depreciation').value != '') {
      if (data.get('depreciation').value < 1) {
        data.controls.depreciation.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
        data.controls.depreciation.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
        data.controls['depreciation'].updateValueAndValidity();
      } else if (data.get('depreciation').value > 100) {
        data.controls.depreciation.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
        data.controls['depreciation'].updateValueAndValidity();
      } else {
        data.controls.depreciation.clearValidators();
        data.controls['depreciation'].updateValueAndValidity();
      }
    } else {
      data.controls.depreciation.clearValidators();
      data.controls['depreciation'].updateValueAndValidity();
    }
  }

  getGRNDetailsAndAddMultipleAsset(GRNID: number) {
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
                'invoiceDateobj': res.grn.invoiceDate != null ? this.commonService.getDateObj(res.grn.invoiceDate) : "",
                'invoiceDate': res.grn.invoiceDate,
                'poNumber': res.grn.purchaseOrderId,
                'vendor': res.grn.vendorName,

              })
            }
            if (res.grnDetailList != null && res.grnDetailList.length >= 1) {
              let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
              quantityBasedAssetArray.clear();
              res.grnDetailList.forEach(element => {
                let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
                let arraylen = quantityBasedAssetArray.length;
                let newUsergroup: FormGroup = this.fb.group({
                  itemId: [element.itemId, [Validators.required]],
                  assetName: ["", [Validators.required]],
                  location: ["", [Validators.required]],
                  status: ["", [Validators.required]],
                  putUseDate: [moment().format('DD/MM/YYYY')],
                  putUseDateObj: [moment().format('YYYY-MM-DD')],
                  department: [""],
                  allottedUpto: [""],
                  allottedUptoobj: [""],
                  transferredTo: [""],
                  assetUser: ["", [Validators.required]],
                  individualPurchasePrice: ["", [Validators.required]],
                  lineId: [""],
                  endLife: [""],
                  scrapValue: [""],
                  uploadImg: ["", [Validators.required]],
                })
                quantityBasedAssetArray.insert(arraylen, newUsergroup);
              });
            }

          }
        },
        error: (error) => {
          this.spinner.hide();
        }
      });
    }
  }

  quantityBasedAddMultipleAssetList(value: number) {

    if (value != null && value > 0) {
      this.quantityBasedMutipleAssetFlag = true;
      let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
      quantityBasedAssetArray.clear();
      for (var i = 0; i < value; i++) {
        let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
        let arraylen = quantityBasedAssetArray.length;
        let newUsergroup: FormGroup = this.fb.group({
          itemId: ["", [Validators.required]],
          assetName: ["", [Validators.required]],
          location: ["", [Validators.required]],
          status: ["", [Validators.required]],
          putUseDate: [moment().format('DD/MM/YYYY')],
          putUseDateObj: [moment().format('YYYY-MM-DD')],
          department: [""],
          allottedUpto: [""],
          allottedUptoobj: [""],
          transferredTo: [""],
          assetUser: ["", [Validators.required]],
          individualPurchasePrice: ["", [Validators.required]],
          lineId: [""],
          endLife: [""],
          scrapValue: [""],
          uploadImg: ["", [Validators.required]],
        })
        quantityBasedAssetArray.insert(arraylen, newUsergroup);
      }
    } else {
      this.quantityBasedMutipleAssetFlag = false;
      let quantityBasedAssetArray = this.docForm.controls.quantityBasedAssetList as FormArray;
      quantityBasedAssetArray.clear();
      let arraylen = quantityBasedAssetArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        itemId: ["", [Validators.required]],
        assetName: ["", [Validators.required]],
        location: ["", [Validators.required]],
        status: ["", [Validators.required]],
        putUseDate: [moment().format('DD/MM/YYYY')],
        putUseDateObj: [moment().format('YYYY-MM-DD')],
        department: [""],
        allottedUpto: [""],
        allottedUptoobj: [""],
        transferredTo: [""],
        assetUser: ["", [Validators.required]],
        individualPurchasePrice: ["", [Validators.required]],
        lineId: [""],
        endLife: [""],
        scrapValue: [""],
        uploadImg: ["", [Validators.required]],
      })
      quantityBasedAssetArray.insert(arraylen, newUsergroup);
      // this.docForm.patchValue({
      //   quantity: '1'
      // })
    }
    if(value==1 || this.docForm.controls.quantity.value ==''){
      this.quantityBasedMutipleAssetFlag = false;
    }
  }

  saveQtyBasedMutipleAsset() {
    if (this.docForm.valid) {
      if (this.isOwned) {
        this.docForm.patchValue({
          'thirdPartyUptoDate': "",
          'thirdPartyUptoDateObj': "",
          'rentedUptoDate': "",
          'rentedUptoDateObj': "",
        })
      }
      if (this.isRented) {
        this.docForm.patchValue({
          'thirdPartyUptoDate': "",
          'thirdPartyUptoDateObj': "",
        })
      }
      if (this.isThirdParty) {
        this.docForm.patchValue({
          'rentedUptoDate': "",
          'rentedUptoDateObj': "",
        })
      }

      this.assetMaster = this.docForm.value;
      this.spinner.show();
      this.assetService.addQuantityBasedMutipleAsset(this.assetMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "top",
              "right"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "top",
              "right"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "top",
            "right"
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

}

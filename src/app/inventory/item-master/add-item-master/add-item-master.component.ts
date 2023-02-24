import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemMasterService } from '../item-master.service';
import { ItemMaster } from '../item-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ItemMasterResultBean } from '../item-master-result-bean';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item-master.component.html',
  styleUrls: ['./add-item-master.component.sass']
})
export class AddItemMasterComponent implements OnInit {
  vendorList=[];
  docForm: FormGroup;
  itemMaster: ItemMaster;
  edit: boolean = false;
  requestId: any;
  itemTypeList = [];
  categoryList = [];
  issueList = [];
  inventoryValuvationList = [];
  vendorDropdownList = [];
  uomList = [];
  pricingTypeList = [];
  companyId: any;
  branchId: any;
  product:Boolean=false;
  locationDdList:[];

  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public itemMasterService: ItemMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) {


  }

  ngOnInit() {
    
    // this.docForm = this.fb.group({
    //   itemId: [""],
    //   itemType: ["", [Validators.required]],
    //   itemName: ["", [Validators.required]],
    //   itemCode: ["", [Validators.required]],
    //   itemDescription: [""],
    //   itemCategory: ["", [Validators.required]],
    //   loginedUser: this.tokenStorage.getUserId(),
    //   company:this.tokenStorage.getCompanyId(),
    //   branchname:this.tokenStorage.getBranchId(),

    //   // Inventory
    //   inventoryValuation: [""],
    //   issueMethod: [""],

    //   // Attribute
    //   batchNo: false,
    //   expiryDate: false,
    //   mrp: false,
    //   manufactureDetails: false,

    //   //specification 
    //   specificationList: this.fb.array([
    //     this.fb.group({
    //       dynamicAttributeId: '',
    //       text: '',
    //       typeinput: '',
    //       labelName: '',
    //       defaultvalue: '',
    //       dynamicAttributeValue: '',
    //     })
    //   ]),

    //   //Vendor
    //   vendorList: this.fb.array([
    //     this.fb.group({
    //       vendorId: '',
    //       vendorItemCode: '',
    //       vendorItemName: '',
    //       vendorminimumQty: '',
    //       vendorUomId: '',
    //       deliveryLeadTime: '',
    //       pricingType: '',
    //     })
    //   ]),

    // });
    this.docForm = this.fb.group({
      size:[""],
      remarks:[],
      itemId:[""],
      itemName: ["", [Validators.required]],
      itemDescription: ["", [Validators.required]],
      itemType: ["", [Validators.required]],
      itemCategory: ["", [Validators.required]],
      location:[""],
      saleable: [""],
      purchaseable: [""],
      purchaseReq:[""],
      costingMethod:[""],
      costPrice:[""],
      warranty:[""],
      leadTime:[""],
      purchaseMethod:[""],
      purchaseUom:[""],
      reorderLevel:[""],
      minimumQty:[""],
      maximumQty:[""],
      vendorId: [""],
      empId: this.tokenStorage.getUserId(),
      loginedUser: this.tokenStorage.getUserId(),
      company:this.tokenStorage.getCompanyId(),
      branchname:this.tokenStorage.getBranchId(),
     //GRN
       batchNo:[""], 
       mrp:[""],
       expiryDate:[""],
       manufactureDetails:[""],
      //INVENTORY
       inventoryValuation:[""], 
       issueMethod:[""],
       openingBalance:[""],
       defaultPrice:[""],
       itemCode: [""],
     //Vendor 
     vendorList: this.fb.array([
        this.fb.group({
          itemId:'',
         vendorName:'',
         vendorItemName:'',
         vendorItemCode:'',
         itemCode: '',
         itemName:'',
         vendorminimumQty:'',
         vendorUom:'',
         deliveryLeadTime:'',
         pricingType:'',
         vendorId:["", [Validators.required]]
        })
       ]),
       productDetailBean: this.fb.array([
        this.fb.group({
          itemId:'',        
         itemCode: '',
         itemName:'',   
         itemDescription:''     
        })
       ])
    });
    this.companyId = this.tokenStorage.getCompanyId();
    console.log(this.companyId)
    this.branchId = this.tokenStorage.getBranchId();
    console.log(this.branchId)

    //Item Type Dropdown List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 6).subscribe({
      next: (data) => {
        this.itemTypeList = data;
        this.docForm.patchValue({
          'itemType': 15
        });
      },
      error: (error) => {
      }
    });

    this.fetchItem();
    //Category Dropdown List

    // this.httpService.get<any>(this.itemMasterService.getItemCategoryDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
    //   next: (data) => {
    //     this.categoryList = data.itemCategory;
    //   },
    //   error: (error) => {
    //   }
    // });

    //Company Based Loation
    this.httpService.get<any>(this.commonService.getMoveToDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    }
    );
    //inventoryValuvation Dropdown List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 9).subscribe({
      next: (data) => {
        this.inventoryValuvationList = data;
      },
      error: (error) => {
      }
    });
    //issue List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 10).subscribe({
      next: (data) => {
        this.issueList = data;
      },
      error: (error) => {
      }
    });
    //vendor List
    this.httpService.get<any>(this.commonService.getVendorDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.vendorDropdownList = data;
      },
      error: (error) => {
      }
    });
    //UOM List
    this.httpService.get<any>(this.commonService.getUOMDropdown).subscribe({
      next: (data) => {
        this.uomList = data;
      },
      error: (error) => {
      }
    });
    //pricingType List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 14).subscribe({
      next: (data) => {
        this.pricingTypeList = data;
      },
      error: (error) => {
      }
    });

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For Editable mode
        this.fetchDetails(this.requestId);
      }
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.itemMaster = this.docForm.value;
      // const obj={
      //   itemType:this.docForm.value.itemType
      // }
      this.spinner.show();
      this.itemMasterService.addItem(this.itemMaster).subscribe({
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

  fetchItem():void {
    this.httpService.get<any>(this.itemMasterService.getItemCategoryDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.categoryList = data.itemCategory;
      },
      error: (error) => {
      }
    })
  }


  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }
    this.spinner.show();
    this.fetchItem();
    
    this.itemMasterService.editItem(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          'itemId': res.itemMaster.itemId,
          'itemType': res.itemMaster.itemType+"",
          'itemName': res.itemMaster.itemName,
          'itemCode': res.itemMaster.itemCode,
          'itemDescription': res.itemMaster.itemDescription,
          'itemCategory': res.itemMaster.itemCategory,
          'size' : res.itemMaster.size,
          'remarks' : res.itemMaster.remarks,
          'openingBalance' : res.itemMaster.openingBalance,
          'defaultPrice' : res.itemMaster.defaultPrice,

          // Inventory
          'inventoryValuation': res.itemMaster.inventoryValuation+"",
          'issueMethod': res.itemMaster.issueMethod+"",

          // Attribute
          'batchNo': res.itemMaster.batchNo,
          'expiryDate': res.itemMaster.expiryDate,
          'mrp': res.itemMaster.mrp,
          'manufactureDetails': res.itemMaster.manufactureDetails
        })

        if (res.specificationList != null && res.specificationList.length >= 1) {
          let specificationListArray = this.docForm.controls.specificationList as FormArray;
          specificationListArray.clear();
          res.specificationList.forEach(element => {
            let specificationListArray = this.docForm.controls.specificationList as FormArray;
            let arraylen = specificationListArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              dynamicAttributeId: [element.dynamicAttributeId],
              text: [element.text],
              typeinput: [element.typeinput],
              labelName: [element.labelName],
              defaultvalue: [element.defaultvalue],
              dynamicAttributeValue: [element.dynamicAttributeValue]
            })
            specificationListArray.insert(arraylen, newUsergroup);
          });
        }

        if (res.vendorList != null && res.vendorList.length >= 1) {
          let vendorListDetailArray = this.docForm.controls.vendorList as FormArray;
          vendorListDetailArray.clear();
          res.vendorList.forEach(element => {
            let vendorListDetailArray = this.docForm.controls.vendorList as FormArray;
            let arraylen = vendorListDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              vendorId: [element.vendorId],
              vendorItemCode: [element.vendorItemCode],
              vendorItemName: [element.vendorItemName],
              vendorminimumQty: [element.vendorminimumQty],
              vendorUomId: [element.vendorUomId],
              deliveryLeadTime: [element.deliveryLeadTime],
              pricingType: [element.pricingType+""]
            })
            vendorListDetailArray.insert(arraylen, newUsergroup);
          });
        }

      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }

  update() {
    if (this.docForm.valid) {
      this.itemMaster = this.docForm.value;
      this.spinner.show();
      this.itemMasterService.updateItem(this.itemMaster).subscribe({
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
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }


  reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId()
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  getBoolean(value) {
    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
      case "t":
        return true;
      default:
        return false;
    }
  }

  keyPressName(event: any) {
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

  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  validateItemCode(event){
    this.httpService.get<any>(this.itemMasterService.uniqueValidateUrl+ "?tableName=" +"item"+"&columnName="+"item_code"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['itemCode'].setErrors({ item: true });
      }else{
        this.docForm.controls['itemCode'].setErrors(null);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/inventory/item-master/list-item-master']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getAttributeDetails(itemCategoryId: number) {
    if (itemCategoryId != undefined && itemCategoryId != null) {
      this.spinner.show();
      // this.specificationList=[];
      this.httpService.get<ItemMasterResultBean>(this.itemMasterService.attributeDetails + "?itemCategoryId=" + itemCategoryId).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res.success) {
            if (res.specificationList != null && res.specificationList.length >= 1) {
              let specificationListArray = this.docForm.controls.specificationList as FormArray;
              specificationListArray.clear();
              res.specificationList.forEach(element => {
                let specificationListArray = this.docForm.controls.specificationList as FormArray;
                let arraylen = specificationListArray.length;
                let newUsergroup: FormGroup = this.fb.group({
                  dynamicAttributeId: [element.dynamicAttributeId],
                  text: [element.text],
                  typeinput: [element.typeinput],
                  labelName: [element.labelName],
                  defaultvalue: [element.defaultvalue],
                  dynamicAttributeValue: ['']
                })
                specificationListArray.insert(arraylen, newUsergroup);
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


  removeRow(index) {
    let vendorListDetailArray = this.docForm.controls.vendorList as FormArray;
    vendorListDetailArray.removeAt(index);
  }

  addRow() {
    let vendorListDetailArray = this.docForm.controls.vendorList as FormArray;
    let arraylen = vendorListDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      vendorId: [''],
      vendorItemCode: [''],
      vendorItemName: [''],
      vendorminimumQty: [''],
      vendorUomId: [''],
      deliveryLeadTime: [''],
      pricingType: ['']
    })
    vendorListDetailArray.insert(arraylen, newUsergroup);
  }

}

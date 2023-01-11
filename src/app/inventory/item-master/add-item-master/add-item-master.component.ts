import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
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

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item-master.component.html',
  styleUrls: ['./add-item-master.component.sass']
})
export class AddItemMasterComponent implements OnInit {

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

    this.docForm = this.fb.group({
      itemId: [""],
      itemType: ["", [Validators.required]],
      itemName: ["", [Validators.required]],
      itemCode: ["", [Validators.required]],
      itemDescription: [""],
      itemCategory: ["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),

      // Inventory
      inventoryValuation: ["", [Validators.required]],
      issueMethod: ["", [Validators.required]],

      // Attribute
      batchNo: false,
      expiryDate: false,
      mrp: false,
      manufactureDetails: false,

      //specification 
      specificationList: this.fb.array([
        this.fb.group({
          dynamicAttributeId: '',
          text: '',
          typeinput: '',
          labelName: '',
          defaultvalue: '',
          dynamicAttributeValue: '',
        })
      ]),

      //Vendor
      vendorList: this.fb.array([
        this.fb.group({
          vendorId: '',
          vendorItemCode: '',
          vendorItemName: '',
          vendorminimumQty: '',
          vendorUomId: '',
          deliveryLeadTime: '',
          pricingType: '',
        })
      ]),

    });


  }

  ngOnInit() {

    //Item Type Dropdown List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 6).subscribe({
      next: (data) => {
        this.itemTypeList = data;
      },
      error: (error) => {
      }
    });
    //Category Dropdown List
    this.httpService.get<any>(this.commonService.getItemCategoryDropdown).subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
      }
    });
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
    this.httpService.get<any>(this.commonService.getVendorDropdown).subscribe({
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


  fetchDetails(id: any): void {
    const obj = {
      editId: id
    }
    this.spinner.show();
    this.itemMasterService.editItem(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          'itemId': res.itemMaster.itemId,
          'itemType': res.itemMaster.itemType,
          'itemName': res.itemMaster.itemName,
          'itemCode': res.itemMaster.itemCode,
          'itemDescription': res.itemMaster.itemDescription,
          'itemCategory': res.itemMaster.itemCategory,

          // Inventory
          'inventoryValuation': res.itemMaster.inventoryValuation,
          'issueMethod': res.itemMaster.issueMethod,

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
              pricingType: [element.pricingType]
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

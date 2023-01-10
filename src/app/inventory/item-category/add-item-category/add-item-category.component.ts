import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCategoryService } from '../item-category.service';
import { ItemCategory } from '../Item-category.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ItemPropertiesService } from '../../item-properties/item-properties.service';

@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrls: ['./add-item-category.component.sass']
})
export class AddItemCategoryComponent implements OnInit {
  docForm: FormGroup;
  itemCategory: ItemCategory;
  edit: boolean = false;
  requestId: any;
  categoryTypeList: [];
  propertyTypeList: [];
  itemCategoryList: [];
  salesTaxList: [];
  purchaseTaxList: [];
  expenseAccountHeadList: [];
  incomeAccountHeadList: [];
  itemPropertiesList: [];

  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public itemCategoryService: ItemCategoryService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private itemPropertiesService: ItemPropertiesService) {

    this.docForm = this.fb.group({
      itemCategoryId: [""],
      categoryName: ["", [Validators.required]],
      parentCategoryId: [""],
      categoryTypeId: ["", [Validators.required]],
      qualityCheck: false,
      // salesTaxesId: ["", [Validators.required]],
      // purchaseTaxesId: ["", [Validators.required]],
      // incomeAccountId: ["", [Validators.required]],
      // expenseAccountId: ["", [Validators.required]],
      batchNo: false,
      mrp: false,
      expiryDate: false,
      manufactureDetails: false,
      loginedUser: this.tokenStorage.getUserId(),


      itemCategoryDetailList: this.fb.array([
        this.fb.group({
          dynamicAttributeId: ["", [Validators.required]],
          propertyType: [""],
          length: [""],
          isMandatory: [""],
        })
      ])

    });
  }

  ngOnInit() {

    //category Type list
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 6).subscribe({
      next: (data) => {
        this.categoryTypeList = data;
      },
      error: (error) => {
      }
    });

    //ItemCategory list dropdown
    this.httpService.get<any>(this.commonService.getItemCategoryDropdown).subscribe({
      next: (data) => {
        this.itemCategoryList = data;
      },
      error: (error) => {
      }
    });

    //SalesTax list dropdown
    this.httpService.get<any>(this.commonService.getSalesTaxDropdown).subscribe({
      next: (data) => {
        this.salesTaxList = data;
      },
      error: (error) => {
      }
    });

    //PurchaseTax list dropdown
    this.httpService.get<any>(this.commonService.getPurchaseTaxDropdown).subscribe({
      next: (data) => {
        this.purchaseTaxList = data;
      },
      error: (error) => {
      }
    });

    //Expense Account Head list dropdown
    this.httpService.get<any>(this.commonService.getExpenseAccountHeadDropdown).subscribe({
      next: (data) => {
        this.expenseAccountHeadList = data;
      },
      error: (error) => {
      }
    });

    //Income Account Head list dropdown
    this.httpService.get<any>(this.commonService.getIncomeAccountHeadDropdown).subscribe({
      next: (data) => {
        this.incomeAccountHeadList = data;
      },
      error: (error) => {
      }
    });


    //type list
    this.httpService.get<any>(this.commonService.getItempropertiesDropdown).subscribe({
      next: (data) => {
        this.itemPropertiesList = data;
      },
      error: (error) => {
      }
    });

     //propertyType list dropdown
     this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 38).subscribe({
      next: (data) => {
        this.propertyTypeList = data;
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
      this.itemCategory = this.docForm.value;
      this.spinner.show();
      this.itemCategoryService.addItemCategory(this.itemCategory).subscribe({
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
    this.itemCategoryService.editItemCategory(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          'itemCategoryId': res.itemCategory.itemCategoryId,
          'categoryName': res.itemCategory.categoryName,
          'parentCategoryId': res.itemCategory.parentCategoryId,
          'categoryTypeId': res.itemCategory.categoryTypeId,
          'qualityCheck': res.itemCategory.qualityCheck,
          // 'salesTaxesId': res.itemCategory.salesTaxesId,
          // 'purchaseTaxesId': res.itemCategory.purchaseTaxesId,
          // 'incomeAccountId': res.itemCategory.incomeAccountId,
          // 'expenseAccountId': res.itemCategory.expenseAccountId,
          'batchNo': res.itemCategory.batchNo,
          'mrp': res.itemCategory.mrp,
          'expiryDate': res.itemCategory.expiryDate,
          'manufactureDetails': res.itemCategory.manufactureDetails
        })

        if (res.itemCategoryDetailList != null && res.itemCategoryDetailList.length >= 1) {
          let itemCategoryDetailArray = this.docForm.controls.itemCategoryDetailList as FormArray;
         itemCategoryDetailArray.clear();
          res.itemCategoryDetailList.forEach(element => {
            let itemCategoryDetailArray = this.docForm.controls.itemCategoryDetailList as FormArray;
            let arraylen = itemCategoryDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              dynamicAttributeId: [element.dynamicAttributeId],
              propertyType: [element.propertyType],
              length: [element.length],
              isMandatory: [element.isMandatory],
            })
            itemCategoryDetailArray.insert(arraylen, newUsergroup);
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
      this.itemCategory = this.docForm.value;
      this.spinner.show();
      this.itemCategoryService.updateItemCategory(this.itemCategory).subscribe({
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
        'qualityCheck': false,
        'batchNo': false,
        'mrp': false,
        'expiryDate': false,
        'manufactureDetails': false,
        'loginedUser': this.tokenStorage.getUserId()
      })
      let itemCategoryDetailArray = this.docForm.controls.itemCategoryDetailList as FormArray;
      itemCategoryDetailArray.clear();
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
    this.router.navigate(['/inventory/item-category/listItemCategory']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  addRow() {
    let itemCategoryDetailArray = this.docForm.controls.itemCategoryDetailList as FormArray;
    let arraylen = itemCategoryDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      dynamicAttributeId: [""],
      propertyType: [""],
      length: [""],
      isMandatory: [""],
    })
    itemCategoryDetailArray.insert(arraylen, newUsergroup);
  }

  removeRow(index) {
    let itemCategoryDetailArray = this.docForm.controls.itemCategoryDetailList as FormArray;
    itemCategoryDetailArray.removeAt(index);
  }

  getItemPropertiesDetails(dynamicAttributeId:number,index:number){
    const obj = {
      editId: dynamicAttributeId
    }
    this.spinner.show();
    this.itemPropertiesService.editItemProperties(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        let itemCategoryDetailArray = this.docForm.controls.itemCategoryDetailList as FormArray;
        itemCategoryDetailArray.at(index).patchValue({
          propertyType: res.itemProperties.attributeDataType,
          length: res.itemProperties.atttributeLength,
          isMandatory:  res.itemProperties.isMandatory
      });
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }
}

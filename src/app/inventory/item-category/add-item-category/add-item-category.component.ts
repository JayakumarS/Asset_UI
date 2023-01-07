import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCategoryService } from '../item-category.service';
import { ItemCategory } from '../Item-category.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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
  propertyTypeList: [];
  dataTypeList: [];

  
  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public itemCategoryService: ItemCategoryService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) {

    this.docForm = this.fb.group({
      itemCategoryId : ["", [Validators.required]],
      categoryName : ["", [Validators.required]],
      parentCategory : [""],
      categoryTypeId : ["", [Validators.required]],
      qualityCheck : false,
      salesTaxesId : ["", [Validators.required]],
      purchaseTaxesId : ["", [Validators.required]],
      incomeAccountId : ["", [Validators.required]],
      expenseAccountId : ["", [Validators.required]],
      batchNo : false,
      mrp : false,
      expiryDate : false,
      manufactureDetails : false,
      loginedUser: this.tokenStorage.getUserId(),
    });

  }

  ngOnInit() {
    
   //propertyType list dropdown
   this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 38).subscribe({
    next: (data) => {
      this.propertyTypeList = data;
    },
    error: (error) => {
    }
  });

  //type list
  this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 53).subscribe({
    next: (data) => {
      this.dataTypeList = data;
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
    }else{
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
          'countryId': res.itemCategory.countryId,
          'countryCode': res.itemCategory.countryCode,
          'countryName': res.itemCategory.countryName,
          'currencyId': res.itemCategory.currencyId,
          // 'clientType': res.itemCategory.clientType,
          'countryIsActive': res.itemCategory.countryIsActive,
        })
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
    }else{
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
        'qualityCheck' : false,
        'batchNo' : false,
        'mrp' : false,
        'expiryDate' : false,
        'manufactureDetails' : false,
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
    this.router.navigate(['/master/itemCategory/listCountryMaster']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}

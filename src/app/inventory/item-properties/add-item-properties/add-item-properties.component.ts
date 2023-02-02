import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ItemProperties } from '../item-properties-model';
import { ItemPropertiesService } from '../item-properties.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-item-properties',
  templateUrl: './add-item-properties.component.html',
  styleUrls: ['./add-item-properties.component.sass']
})
export class AddItemPropertiesComponent implements OnInit {
  docForm: FormGroup;
  itemProperties: ItemProperties;
  propertyTypeList: [];
  dataTypeList: [];
  requestId: number;
  edit: boolean = false;
  companyId: any;
  branchId: any;

  constructor(private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public itemPropertiesService: ItemPropertiesService,
    public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService) {

    this.docForm = this.fb.group({
      dynamicAttributeId: [""],
      attributeDataType: ["", [Validators.required]],
      attributeType: ["", [Validators.required]],
      attributeName: ["", [Validators.required]],
      atttributeLength: [""],
      attributeValue: [""],
      attributeDefualtValue: [""],
      isMandatory: [""],
      loginedUser: this.tokenStorage.getUserId(),
      company:this.tokenStorage.getCompanyId(),
      branchname:this.tokenStorage.getBranchId(),

    });

  }

  ngOnInit(): void {


    this.companyId = this.tokenStorage.getCompanyId();
    console.log(this.companyId)
    this.branchId = this.tokenStorage.getBranchId();
    console.log(this.branchId)
    

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
        //For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.itemProperties = this.docForm.value;
      this.spinner.show();
      this.itemPropertiesService.addItemProperties(this.itemProperties).subscribe({
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
    this.itemPropertiesService.editItemProperties(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          'dynamicAttributeId': res.itemProperties.dynamicAttributeId,
          'attributeDataType': res.itemProperties.attributeDataType,
          'attributeType': res.itemProperties.attributeType,
          'attributeName': res.itemProperties.attributeName,
          'atttributeLength': res.itemProperties.atttributeLength,
          'attributeValue': res.itemProperties.attributeValue,
          'attributeDefualtValue': res.itemProperties.attributeDefualtValue,
          'isMandatory': res.itemProperties.isMandatory,
          
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
      this.itemProperties = this.docForm.value;
      this.spinner.show();
      this.itemPropertiesService.updateItemProperties(this.itemProperties).subscribe({
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
    this.router.navigate(['/inventory/item-properties/list-itemproperties']);
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

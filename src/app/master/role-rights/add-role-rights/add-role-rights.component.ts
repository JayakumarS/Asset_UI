import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleRightsService } from './../role-rights.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-role-rights',
  templateUrl: './add-role-rights.component.html',
  styleUrls: ['./add-role-rights.component.scss']
})
export class AddRoleRightsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  docForm: FormGroup;
  roleList: [];
  moduleList: [];
  formList = [];
  //header list
  propertyList = [];
  //based on selection role which all property like add,edit allowed list
  formPropertyList = [];
  //saved list
  roleRightsPropertyList = [];
  //For To be save list
  selectedFormPropertyList = [];
  submitted: boolean = false;
  permissionList: any;
  checkAllFormPropertysFlag: boolean = false;

  constructor(public dialog: MatDialog, private tokenStorage: TokenStorageService, private fb: FormBuilder, private authService: AuthService, public router: Router,
    private roleRightsService: RoleRightsService, private httpService: HttpServiceService
    , private snackBar: MatSnackBar, public route: ActivatedRoute, private spinner: NgxSpinnerService, public el: ElementRef, public commonService: CommonService) {
    super();
    this.docForm = this.fb.group({
      roleId: ["", [Validators.required]],
      moduleId: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    //role Dropdown List
    this.httpService.get<any>(this.roleRightsService.getRoleDropdownList).subscribe({
      next: (data) => {
        this.roleList = data;
      },
      error: (error) => {
      }
    });

    //Module Dropdown List
    this.httpService.get<any>(this.roleRightsService.getModuleDropdownList).subscribe({
      next: (data) => {
        this.moduleList = data;
      },
      error: (error) => {
      }
    });
  }

  //Added by GOKUL
  roleBasedFormList() {
    if (!this.docForm.valid) {
      if (this.docForm.controls['roleId'].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'roleId' + '"]');
        invalidControl.focus();
        return;
      }
      if (this.docForm.controls['moduleId'].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'moduleId' + '"]');
        invalidControl.focus();
        return;
      }
    }
    if (this.docForm.valid) {
      this.formList = [];
      this.propertyList = [];
      this.formPropertyList = [];
      this.roleRightsPropertyList = [];
      this.checkAllFormPropertysFlag = false;
      this.spinner.show();
      this.httpService.get<any>(this.roleRightsService.roleFormUrl + "?roleId=" + this.docForm.value.roleId +"&moduleId=" + this.docForm.value.moduleId).subscribe({
        next: (data) => {
          this.spinner.hide();
          this.formList = data.formList;
          this.propertyList = data.propertyList;
          this.formPropertyList = data.formPropertyList;
          this.roleRightsPropertyList = data.roleRightsPropertyList;

          if (data.formPropertyList.length >= 1 && data.roleRightsPropertyList.length >= 1) {
            data.formPropertyList.forEach((formProperty) => {
              data.roleRightsPropertyList.forEach((roleRightsProperty) => {
                if (formProperty.formPropertyId === roleRightsProperty.formPropertyId) {
                  formProperty.isCheckFormProperty = true;
                }
              });
            });
          }

        },
        error: (error) => {
          this.spinner.hide();
          console.log(error.name + " " + error.message);
        }
      });
    }
  }

  //Added by GOKUL
  selectCheckAllFormPropertyList(isChecked: any, selectItem: any) {
    if (isChecked === "on") {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formCode === selectItem.itemId) {
          formProperty.isCheckFormProperty = true;
        }
      });
    } else {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formCode === selectItem.itemId) {
          formProperty.isCheckFormProperty = false;
        }
      });
    }
  }
  selectCheckFormPropertyList(isChecked: any, formItem: any) {
    if (isChecked === "on") {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formPropertyId === formItem.formPropertyId) {
          formProperty.isCheckFormProperty = true;
        }
      });
    } else {
      this.formPropertyList.forEach((formProperty) => {
        if (formProperty.formPropertyId === formItem.formPropertyId) {
          formProperty.isCheckFormProperty = false;
        }
      });
    }
  }
  checkAllFormPropertys(isChecked: any) {
    if (isChecked === "on") {
      this.formPropertyList.forEach((formProperty) => {
        formProperty.isCheckFormProperty = true;
      });
      this.formList.forEach((form) => {
        form.isFormChecked = true;
      });
    } else {
      this.formPropertyList.forEach((formProperty) => {
        formProperty.isCheckFormProperty = false;
      });
      this.formList.forEach((form) => {
        form.isFormChecked = false;
      });
    }
  }

//Added by GOKUL
  onSubmit() {
    this.submitted = true;
    if (!this.docForm.valid) {
      if (this.docForm.controls['roleId'].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'roleId' + '"]');
        invalidControl.focus();
        return;
      }
      if (this.docForm.controls['moduleId'].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'moduleId' + '"]');
        invalidControl.focus();
        return;
      }
    }
    this.selectedFormPropertyList = this.formPropertyList.filter((value, index) => {
      return value.isCheckFormProperty
    });
    setTimeout(() => {
      if (this.selectedFormPropertyList.length == 0 || this.selectedFormPropertyList == null || this.selectedFormPropertyList == undefined) {
        this.showNotification(
          "snackbar-danger",
          "You must check at least one Forms",
          "top",
          "right"
        );
        return;
      }
      if (this.docForm.valid) {
        const addRoleRightObj = {
          roleId: this.docForm.value.roleId,
          moduleId: this.docForm.value.moduleId,
          selectedFormPropertyList: this.selectedFormPropertyList,
          loginedUser: this.tokenStorage.getUserId()
        }
        this.spinner.show();
        this.roleRightsService.roleRightsMasterAddUpdate(addRoleRightObj).subscribe({
          next: (data) => {
            this.spinner.hide();
            if (data.success) {
              this.showNotification(
                "snackbar-success",
                data.message + "...!!!",
                "bottom",
                "center"
              );
              this.submitted = false;
            } else {
              this.showNotification(
                "snackbar-danger",
                data.message + "...!!!",
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
          "Please fill required details.",
          "top",
          "right"
        );
      }
    }, 400);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  reset() {
    this.formList = [];
    this.propertyList = [];
    this.formPropertyList = [];
    this.roleRightsPropertyList = [];
    this.docForm.patchValue({
      'roleId': '',
      'moduleId': '',
    });
  }

}


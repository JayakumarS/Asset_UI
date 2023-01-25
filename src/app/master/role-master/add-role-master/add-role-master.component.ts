import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { RoleMasterService } from '../role-master.service';
import { RoleMaster } from '../role-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-role-master',
  templateUrl: './add-role-master.component.html',
  styleUrls: ['./add-role-master.component.sass']
})
export class AddRoleMasterComponent implements OnInit {
  docForm: FormGroup;
  roleMaster: RoleMaster;
  edit: boolean = false;
  requestId: any;

  constructor(private fb: FormBuilder,
    public router: Router,
    public roleMasterService: RoleMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) {

    this.docForm = this.fb.group({
      roleId: [""],
      roleName: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),
    });

  }

  ngOnInit() {
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
      this.roleMaster = this.docForm.value;
      this.spinner.show();
      this.roleMasterService.addRole(this.roleMaster).subscribe({
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
    this.roleMasterService.editRole(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          'roleId': res.roleMaster.roleId,
          'roleName': res.roleMaster.roleName,
          'remarks': res.roleMaster.remarks
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
      this.roleMaster = this.docForm.value;
      this.spinner.show();
      this.roleMasterService.updateRole(this.roleMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Updated Successfully",
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

  onCancel() {
    this.router.navigate(['/master/roleMaster/listRoleMaster']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  keyPressRole(event: any) {
    const pattern = /[a-z A-Z0-9 ^$#<>?*,.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressRemarks(event: any) {
    const pattern = /[ a-zA-Z0-9 !@()#$%&*_+"'\-=\;:\\|,.\/? ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  roleNameValidation(event) {
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.commonService.uniqueValidateUrl + "?tableName=" + "auth.role" + "&columnName=" + "name" + "&columnValue=" + event).subscribe((res: any) => {
        if (res) {
          this.docForm.controls['roleName'].setErrors({ roleNameValid: true });
        } else {
          this.docForm.controls['roleName'].setErrors(null);
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { UserMasterService } from '../user-master.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from '@angular/router';
import { UserMaster } from '../user-master.model';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';





@Component({
  selector: 'app-add-user-master',
  templateUrl: './add-user-master.component.html',
  styleUrls: ['./add-user-master.component.sass']
})
export class AddUserMasterComponent implements OnInit {
  docForm: FormGroup;
  [x: string]: any;
  userMaster: UserMaster;
  submitted: boolean = false;
  locationDdList = [];
  // validateEmail = true;
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor( private spinner: NgxSpinnerService,
               private fb: FormBuilder,
               private httpService: HttpServiceService,
               public route: ActivatedRoute,
               public commonService: CommonService,
               // tslint:disable-next-line:no-shadowed-variable
               private UserMasterService: UserMasterService,
               private snackBar: MatSnackBar,
               public router: Router,
               ) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      userId: [""],
      fullName: ["", [Validators.required]],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      contNumber: [""],
      role: ["", [Validators.required]],
      department: [""],
      repmanager: [""],
      language: ["", [Validators.required]],
      location: [""],
      otp: [""],
      userLocation: [""],

    //  loginedUser: this.tokenStorage.getUserId(),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        // For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });
    // User Location dropdown
    this.httpService.get<any>(this.commonService.getuserlocation).subscribe({
      next: (data) => {
        this.userLocationDdList = data;
      },
      error: (error) => {

      }
    });

       // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
        next: (data) => {
          this.locationDdList = data;
        },
        error: (error) => {

        }
      }
      );
     // department dropdown
    this.httpService.get<any>(this.commonService.getDepartmentDropdown).subscribe({
      next: (data) => {
        this.departmentDdList = data;
      },
      error: (error) => {

      }
    }
    );

  }
  onSubmit() {
    if (this.docForm.valid){
      this.userMaster = this.docForm.value;
      this.spinner.show();
      this.UserMasterService.addUser(this.userMaster).subscribe({
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
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please Fill The All Required fields",
        "bottom",
        "center"
      );
    }
  }
  onCancel() {
  this.router.navigate(['/master/userMaster/list-user-master/']);
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  fetchDetails(userId: any): void {
    const obj = {
      editId: userId
    }
    this.UserMasterService.editUser(obj).subscribe({
      next: (res) => {
      this.docForm.patchValue({
        'userId': res.userMasterBean.userId,
         'fullName': res.userMasterBean.fullName,
        'emailId': res.userMasterBean.emailId,
        'contNumber': res.userMasterBean.contNumber,
        'role': res.userMasterBean.role,
        'department': res.userMasterBean.department,
        'repmanager': res.userMasterBean.repmanager,
        'language': res.userMasterBean.language,
        'location': res.userMasterBean.location,
        'otp': res.userMasterBean.otp,
        'userLocation': res.userMasterBean.userLocation,


      });
    },
    error: (error) => {
    }
  });
}
update() {
  this.userMaster = this.docForm.value;
  this.spinner.show();
  this.UserMasterService.updateUser(this.userMaster).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "update Record Successfully",
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
  }

  reset() {
    if (!this.edit) {
      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        fullName: ["", [Validators.required]],
        emailId: [""],
        contNumber: [""],
        role: ["", [Validators.required]],
        department: [""],
        repmanager: [""],
        language: ["", [Validators.required]],
        location: [""],
        otp: [""],
        userLocation: [""],
      //  loginedUser: this.tokenStorage.getUserId(),
      });
    } else {
    this.fetchDetails(this.requestId);
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
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}

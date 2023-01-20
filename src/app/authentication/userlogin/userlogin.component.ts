import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationModule } from '../authentication.module';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMaster } from 'src/app/master/user-master/user-master.model';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.sass']
})
export class UserloginComponent implements OnInit {
  docForm: FormGroup;
  [x: string]: any;
  userMaster: UserMaster;
  submitted: boolean = false;
  locationDdList = [];
  companyList = [];
  language: any;
  role: any;
  fullName: any;
  // validateEmail = true;
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor( private spinner: NgxSpinnerService,
               private fb: FormBuilder,
               private httpService: HttpServiceService,
               public route: ActivatedRoute,
               public commonService: CommonService,
               private tokenStorage: TokenStorageService,
               // tslint:disable-next-line:no-shadowed-variable
               private AuthenticationModule: AuthenticationModule,
               private snackBar: MatSnackBar,
               public router: Router,
               public userMasterService: UserMasterService,
               ) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      userId: [""],
      fullName: ["", [Validators.required]],
      emailId: ['',  [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      contNumber: ["", [Validators.required]],
      role: ["", [Validators.required]],
      department: [""],
      language: ["", [Validators.required]],
      location: [""],
      otp: [""],
      userLocation: [""],
      company: [""],
      loginedUser: this.tokenStorage.getUserId(),
      empid: [""],

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

    // company dropdown
    this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
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
      this.userMasterService.addUser(this.userMaster).subscribe({
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
        "Please Fill The All Required fields",
        "top",
        "right"
      );
    }
  }
  onCancel() {
    this.router.navigate(['/authentication/signin']);
    }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


   validateEmail(event){
    this.httpService.get<any>(this.userMasterService.uniqueValidateUrl + "?tableName=" + " user_master" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res){
        this.docForm.controls['emailId'].setErrors({ currency: true });
      }else{
        this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }
keyPressNumeric(event: any) {
  const pattern = /[A-Za-z,0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

keyPressNumeric1(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

string(event: any) {
  const pattern = /[A-Za-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}



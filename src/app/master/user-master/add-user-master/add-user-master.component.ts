import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { UserMasterService } from '../user-master.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from '@angular/router';
import { UserMaster } from '../user-master.model';
import { CommonService } from 'src/app/common-service/common.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from '../../company/company.service';


@Component({
  selector: 'app-add-user-master',
  templateUrl: './add-user-master.component.html',
  styleUrls: ['./add-user-master.component.sass']
})
export class AddUserMasterComponent implements OnInit {
  docForm: FormGroup;
  [x: string]: any;
  userMaster: UserMaster;
  edit:boolean= false;
  submitted: boolean = false;
  locationDdList = [];
  getCountryDDList= [];
  companyList = [];
  branchList = [];
  roleAuditList = [];
  roleList = [];
  getBasedCompanyList:any = [];
  getBasedBranchList = [];
  departmentAuditList= [];
  location:any;
  language: any;
  role: any;
  roleId:any;
  userId:any;
  auditorFlag:boolean=false;
  auditorFFlag:boolean=false;
  public modeselect = 'English';




  constructor( private spinner: NgxSpinnerService,
               private fb: FormBuilder,
               private httpService: HttpServiceService,
               public route: ActivatedRoute,
               public commonService: CommonService,
               private tokenStorage: TokenStorageService,
               // tslint:disable-next-line:no-shadowed-variable
               private userMasterService: UserMasterService,
               private snackBar: MatSnackBar,
               public router: Router,
               public companyService: CompanyService
               ) {
    this.docForm = this.fb.group({
      fullName: ["", [Validators.required]],
      // tslint:disable-next-line:max-line-length
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      contNumber: ["", [Validators.required]],
      role: [""],
      department: [""],
      repmanager: [""],
      language: ["", [Validators.required]],
      location: [""],
      otp: [""],
      userLocation: [""],
      companytext: [this.tokenStorage.getCompanyText()],
      company:[],
      loginedUser: this.tokenStorage.getUserId(),
      empid: [""],
      active: [true],
      branch: ["", [Validators.required]],
      auditor: [""],
      companyid:[""],
      branchid:[""],
      address:[""],
      country:[""],
      loggedInRoleId:[this.tokenStorage.getRoleId()]
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

    this.userId = this.tokenStorage.getUserId();

    this.roleId = this.tokenStorage.getRoleId();


    if(this.roleId==2 ||this.roleId==4){
      this.auditorFlag=true;
    }else{
      this.auditorFlag=false;
    }





    if(this.roleId==1){
      this.roleIdFlag=true;
      this.fieldsChange(true);
      this.docForm.get("auditor").setValue(true);
      this.docForm.get("auditor").disabled;
    }else{
      this.roleIdFlag=false;
      this.roleIdFlag=false;

      this.fieldsChange(false);
    }
   
    // User Location dropdown
    this.httpService.get<any>(this.commonService.getuserlocation).subscribe({
      next: (data) => {
        this.userLocationDdList = data;
      },
      error: (error) => {

      }
    });

    this.companyId = this.tokenStorage.getCompanyId(),
    this.httpService.get(this.userMasterService.fetchBranch + "?companyId=" + this.companyId).subscribe((res: any) => {
      this.getBasedBranchList = res.getUserBasedBranchList;

    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
       // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
        next: (data) => {
          this.locationDdList = data;
        },
        error: (error) => {

        }
      }
      );

         // Country dropdown
         this.companyId=this.tokenStorage.getCompanyId();
         if(this.companyId==undefined || this.companyId=="null" || this.companyId==null){
          this.companyId=0;
         }
    this.httpService.get<any>(this.commonService.getCountryDropdown+"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.getCountryDDList = data;
      },
      error: (error) => {

      }
    }
    );
     // department dropdown
    // this.httpService.get<any>(this.commonService.getDepartmentDropdown).subscribe({
    //   next: (data) => {
    //     this.departmentDdList = data;
    //   },
    //   error: (error) => {

    //   }
    // }
    // );

    // company dropdown
    this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      error: (error) => {

      }
    }
    );
       // branch dropdown
    this.httpService.get<any>(this.commonService.getBranchDropdown).subscribe({
        next: (data) => {
          this.branchList = data;
        },
        error: (error) => {

        }
      }
      );

  // Role  Dropdown List
    this.httpService.get<any>(this.userMasterService.roleListUrl).subscribe(
    (data) => {
      this.roleList = data.roleList;
      if (!this.edit){

        if(this.roleId==1){
          this.roleList=[{id:'3',text:'CHECKER'}];
          this.docForm.patchValue({role:'3'});
        }

      }
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );




  // Department Dropdown List
    this.httpService.get<any>(this.userMasterService.departmentListUrl+"?company="+this.tokenStorage.getCompanyId()+"").subscribe(
    (data) => {
      this.departmentList = data.departmentList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );


   // User Based Company List
    this.httpService.get<any>(this.userMasterService.companyListUrl + "?userId=" + this.userId).subscribe(
    (data) => {

      if(data.getUserBasedCompanyList.length>0){
        this.getBasedCompanyList = data.getUserBasedCompanyList;
      } else {
         let companyText=this.tokenStorage.getCompanyText();
         let companyId=this.tokenStorage.getCompanyId();
        if(companyText!="null"){
          let obj ={
            id1:parseInt(companyId),
            text:companyText
           }

           this.getBasedCompanyList.push(obj);
        }

      }
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );

  // User Reporting Manager
    this.httpService.get<any>(this.userMasterService.reportingManUrl + "?company=" + this.tokenStorage.getCompanyId() + "").subscribe(
    (data) => {
      this.getReportingManList = data.reportingManList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );


  // User Primary Location
    this.httpService.get<any>(this.userMasterService.primaryLocUrl + "?userId=" + this.userId).subscribe(
    (data) => {
      this.getPrimaryLocList = data.primaryLocList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );



  }

  fetchBranchDetails(customer: any) {



    this.httpService.get(this.userMasterService.locationDropdown+"?locationId=" + customer ).subscribe((res: any) => {
      console.log(customer);
      this.locationDropdownList = res.locationDropdownList;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );


  }

  roleChange(){
    this.httpService.get<any>(this.userMasterService.roleListAuditUrl).subscribe(
      (data) => {
        this.roleAuditList = data.roleAuditList;
      //   this.docForm.patchValue({
      //     role:'3',
      //  })
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  departmentChange(){
    this.httpService.get<any>(this.userMasterService.departmentListAuditUrl).subscribe(
      (data) => {
        this.departmentAuditList = data.departmentAuditList;
        this.docForm.patchValue({
          department:'60',
       })
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  fieldsChange(values:any):void {
    if(values){ 
      this.auditorFlag=false;
      this.auditorFFlag=false;
      this.docForm.controls.company.clearValidators();
      this.docForm.controls['company'].updateValueAndValidity();

      this.docForm.controls.branch.clearValidators();
      this.docForm.controls['branch'].updateValueAndValidity();
      
      this.httpService.get<any>(this.userMasterService.roleListAuditUrl).subscribe(
        (data) => {
          this.roleAuditList = data.roleAuditList;
          this.roleList=[{id:'3',text:'CHECKER'}];
          this.docForm.patchValue({role:'3'});
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.httpService.get<any>(this.userMasterService.departmentListAuditUrl).subscribe(
        (data) => {
          this.departmentAuditList = data.departmentAuditList;
          this.docForm.patchValue({
            department:'60',
         })
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }else{
      this.auditorFlag = true;
      this.auditorFFlag = true;

      this.httpService.get<any>(this.userMasterService.roleListUrl).subscribe(
        (data) => {
          this.roleList = data.roleList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );

      // this.httpService.get<any>(this.userMasterService.roleListAuditUrl).subscribe(
      //   (data) => {
      //     this.roleAuditList = data.roleAuditList;

      //   },
      //   (error: HttpErrorResponse) => {
      //     console.log(error.name + " " + error.message);
      //   }
      // );
    }

  }


  fetchDetails(empid: any) {
    this.requestId = empid;
    this.httpService.get(this.userMasterService.editUserMaster + "?empid=" + empid).subscribe((res: any) => {
      this.fetchBranchDetails(res.userMasterBean.company) ;
      console.log(empid);
      if(res.userMasterBean.auditor == true){
               this.auditorFlag=false;
               this.fieldsChange(true);
              //  this.httpService.get<any>(this.userMasterService.roleListUrl).subscribe(
              //   (data) => {
              //     this.roleList = data.roleList;
              //     if(this.roleId==1){
              //         this.roleList=[{id:'3',text:'CHECKER'}];
              //         this.docForm.patchValue({role:'3'});
              //       }


              //   },
              //   (error: HttpErrorResponse) => {
              //     console.log(error.name + " " + error.message);
              //   }
              // );

      }else{
        this.auditorFlag=true;
        this.roleChange();
      }


      this.docForm.patchValue({
        'userId': res.userMasterBean.userId,
        'fullName': res.userMasterBean.fullName,
        'emailId': res.userMasterBean.emailId,
        'contNumber': res.userMasterBean.contNumber,
        'role': res.userMasterBean.role + "",
        'department': res.userMasterBean.department + "",
        'repmanager': res.userMasterBean.repmanager,
        'language': res.userMasterBean.language,
        'location': res.userMasterBean.location!=null? res.userMasterBean.location.toString():"",
        'otp': res.userMasterBean.otp,
        'company': res.userMasterBean.company,
        'userLocation': res.userMasterBean.userLocation,
        'empid': res.userMasterBean.empid,
        'active': res.userMasterBean.active,
        'branch': res.userMasterBean.branch + "",
        'auditor': res.userMasterBean.auditor,
        'address': res.userMasterBean.address,
        'country': res.userMasterBean.country,


     })

    },
    (err: HttpErrorResponse) => {

     }
  );
}

  onSubmit() {
    if (this.docForm.valid){
      this.userMaster = this.docForm.value;
      this.spinner.show();
      if(this.roleId!=1 || this.docForm.value.auditor !="true"){
        
        // if(this.docForm.value.company !="" && this.docForm.value.branch !="")
        // {
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
        // }else{
        //   this.spinner.hide();
        //   this.showNotification(
        //     "snackbar-danger",
        //     "Please fill Company and Branch Fields...!!",
        //     "bottom",
        //     "center"
        //   );
        // }
      }
    
      else{
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
      }
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

update() {
  if (this.docForm.valid){
  if(this.auditorFlag==false){
    if(this.docForm.value.company !=null && this.docForm.value.branch !=null){
      if (this.docForm.value.emailId !=""){
      this.userMaster = this.docForm.value;
      this.spinner.show();
      this.userMasterService.updateUser(this.userMaster).subscribe({
          next: (data) => {
            this.spinner.hide();
            if (data) {
              this.showNotification(
                "snackbar-success",
                "Updated record successfully",
                "bottom",
                "center"
              );
              this.onCancel();
            } else {
              this.showNotification(
                "snackbar-danger",
                "Not updated successfully...!!!",
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
          "Please Fill Email Id Field..!!",
          "top",
          "right"
        );
      }
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please Fill The Company and Branch fields",
        "top",
        "right"
      );
    }
    }else{
      if (this.docForm.value.emailId !=""){
        this.userMaster = this.docForm.value;
        this.spinner.show();
        this.userMasterService.updateUser(this.userMaster).subscribe({
            next: (data) => {
              this.spinner.hide();
              if (data.success) {
                this.showNotification(
                  "snackbar-success",
                  "Updated record successfully",
                  "bottom",
                  "center"
                );
                this.onCancel();
              } else {
                this.showNotification(
                  "snackbar-danger",
                  "Not updated successfully...!!!",
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
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            "Please Fill Full Name",
            "top",
            "right"
          );
        }
    }
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please Fill The All Required fields",
      "top",
      "right"
    );
  }

  }

  reset() {
    if (!this.edit) {
      this.docForm = this.fb.group({
        fullName: [""],
        contNumber: [""],
        role: [""],
        department: [""],
        repmanager: [""],
        language: [""],
        location: [""],
        otp: [""],
        userLocation: [""],
        company: [""],
        loginedUser: this.tokenStorage.getUserId(),
        empid: [""],
        active: [true],
        branch: [""],
        address: [""],
        country: [""],
        emailId:[""]
      });
    } else {
    this.fetchDetails(this.requestId);
  }

   }


  //  validateEmail(event){
  //   this.httpService.get<any>(this.userMasterService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
  //     if (res){
  //       this.docForm.controls['emailId'].setErrors({ employee: true });
  //     }else{
  //      // this.docForm.controls['emailId'].setErrors(null);
  //     }
  //   });
  // }


  validateEmail(event) {
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.companyService.uniqueValidateEmail + "?emailId=" + event).subscribe((res: any) => {
        if (res.validateEmail) {
          this.docForm.controls['emailId'].setErrors({ employee: true });
        }else{
         // this.docForm.controls['emailId'].setErrors(null);
        }
      });
  }
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
  const pattern = /[A-Z,a-z ]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
stringAlpha(event: any) {
  const pattern = /[A-Z,a-z]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}



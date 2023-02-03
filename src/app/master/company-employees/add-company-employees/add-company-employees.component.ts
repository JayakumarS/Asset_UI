import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Company } from '../company-employees-model';
import { CompanyEmployeeService } from '../company-employees.service';

@Component({
  selector: 'app-add-company-employees',
  templateUrl: './add-company-employees.component.html',
  styleUrls: ['./add-company-employees.component.sass']
})
export class AddCompanyEmployeesComponent implements OnInit {
  departmentDdList:[];
  CompanyList:[];
  branchList:[];
  RoleDdList:[];
  getUserBasedCompanyList:[];
  getUserBasedBranchList:[];
  docForm: FormGroup;
  edit:boolean= false;
  roleId: any;
  userId: any;
  companyId: any;
  role: any;
  roleIdFlag: boolean;
  company: Company
  requestId: any;
  constructor( private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public commonService: CommonService,
    private tokenStorage: TokenStorageService,
    private companyEmployeeService: CompanyEmployeeService,
    private notificationservice:NotificationService,
    // tslint:disable-next-line:no-shadowed-variable
    
    private snackBar: MatSnackBar,
    public router: Router,) {
    this.docForm = this.fb.group({
      company:[""],
      branch:[""],
      role:[""],
      emailId:[""],
      fullName: [""],
      phoneno:[""],
      department:[""],
      active:[false],
      id:[""],

      // userId: this.tokenStorage.getUserId(),
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),

    });
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
     this.userId = this.tokenStorage.getUserId();
     this.companyId = this.tokenStorage.getCompanyId();

     this.roleId = this.tokenStorage.getRoleId();
     if(this.roleId==1){
       this.roleIdFlag=true;
     }else{
       this.roleIdFlag=false;
     }

    // branch dropdown
    this.httpService.get<any>(this.commonService.getBranchDropdown).subscribe({
      next: (data) => {
        this.branchList = data;
      },
      error: (error) => {

      }
    }
    );
   

   // Role dropdown
   this.httpService.get<any>(this.commonService.getRoleDropdown).subscribe({
    next: (data) => {
      this.RoleDdList = data;
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

     //User Based Company List
   this.httpService.get<any>(this.companyEmployeeService.companyListUrl + "?userId=" + this.userId).subscribe(
    (data) => {
      this.getUserBasedCompanyList = data.getUserBasedCompanyList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  ); 

  

  }

  fetchBranchDetails(customer: any) {

    this.userId = this.tokenStorage.getUserId();

    this.httpService.get(this.companyEmployeeService.fetchBranch + "?companyId=" + this.companyId).subscribe((res: any) => {
      console.log(customer);

      this.getUserBasedBranchList = res.getUserBasedBranchList;

    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );


  }
  onSubmit(){
    if(this.docForm.valid){
      this.docForm.value.userId = this.tokenStorage.getUserId();
    this.company = this.docForm.value;   
    console.log(this.company);
    this.companyEmployeeService.addCompany(this.company);
    
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/Company-Employees/listCompanyEmp']);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Invalid Data...!!!",
        "bottom",
        "center"
      );
    }

  }

  fetchDetails(id: any) {
    this.requestId = id;
  this.httpService.get(this.companyEmployeeService.editcategory + "?id=" + id).subscribe((res: any) => {

    console.log(id);

    this.docForm.patchValue({
     
      'company': parseInt(res.companyEmployeeBean.company),
      'branch':  parseInt(res.companyEmployeeBean.branch),
      'emailId' : res.companyEmployeeBean.emailId, 
      'fullName' : res.companyEmployeeBean.fullName, 
      'phoneno' : res.companyEmployeeBean.phoneno, 
      'department' : parseInt(res.companyEmployeeBean.department), 
      'role' : res.companyEmployeeBean.role, 

      'id' : res.companyEmployeeBean.id

      
   })

    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
 
}

  update(){
    if(this.docForm.valid){
      this.company = this.docForm.value;
      this.companyEmployeeService.CompanyEmpUpdate(this.company,this.router);
      this.router.navigate(['/master/Company-Employees/listCompanyEmp']);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  
    

  }

  reset(){
    // if (!this.edit) {
    //   this.docForm.reset();
    //   this.docForm.patchValue({
    //     company:[""],
    //     branch:[""],
    //     emailId:[""],
    //     fullName: [""],
    //     phoneno:[""],
    //     department:[""],
    //     id:[""],
    //     active:[""],

    //   })
    // }  else {
    //   this.fetchDetails(this.requestId);
    // }

    this.docForm.patchValue({
          company:[""],
          branch:[""],
          emailId:[""],
          fullName: [""],
          phoneno:[""],
          department:[""],
          id:[""],
          active:[""],
  
        })
  }

  
  onCancel(){

    this.router.navigate(['/master/Company-Employees/listCompanyEmp']);


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
    this.httpService.get<any>(this.companyEmployeeService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res){
        this.docForm.controls['emailId'].setErrors({ employee: true });
      }else{
       // this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Company } from '../company-model';
import { CompanyService } from '../company.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DepartmentMasterService } from '../../department-master/department-master.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserMasterService } from '../../user-master/user-master.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.sass']
})
export class AddCompanyComponent implements OnInit {
  docForm: FormGroup;
  company : Company;
  countryDdList=[];
  userDdList=[];
  requestId:any;
  tokenStorage: any;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    private companyService : CompanyService,
    private departmentMasterService : DepartmentMasterService,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
    private userMasterService: UserMasterService,
    private router:Router) {

      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
  
        // activtyname: ["", [Validators.required]],
        // activtyid: [""],
        // Description:[""],
        // active:[""],
        id:[""],

        companyName:["",[Validators.required]],
        shortName:[""],
        country:["",[Validators.required]],
        faxNo:[""],
        address:["",[Validators.required]],
        emailId:["",[Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
        telephoneNo:["",[Validators.required]],
        personIncharge:["",[Validators.required]],
        isactive:[""],
        companyId:[""]

       


      });
     }

  ngOnInit(): void {

    // Location dropdown
    this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
      next: (data) => {
        this.countryDdList = data;
      },
      error: (error) => {

      }
    }
    );

       // Contact Person dropdown
       this.httpService.get<any>(this.commonService.getpersoninchargeDropdown).subscribe({
        next: (data) => {
          this.userDdList = data;
        },
        error: (error) => {
  
        }
      }
      );

      this.route.params.subscribe(params => {
        if (params.id != undefined && params.id != 0) {
          this.requestId = params.id;
          this.edit = true;
          //For Editable mode
          this.fetchDetails(this.requestId);
        }
      });

  }

  onSubmit(){
    if(this.docForm.valid){
    this.company = this.docForm.value;
    console.log(this.company);
    this.companyService.addCompany(this.company);
    
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/company/listCompany']);
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

  fetchDetails(company: any): void {
    const obj = {
      editId: company
    }
    this.spinner.show();
    this.companyService.editCompany(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          'companyId': res.companyBean.companyId,
          'companyName': res.companyBean.companyName,
          'shortName': res.companyBean.shortName,
          'isactive': res.companyBean.isactive,
          'address': res.companyBean.address,
          'country': res.companyBean.country,
          'emailId': res.companyBean.emailId,
          'faxNo': res.companyBean.faxNo,
          'personIncharge': res.companyBean.personIncharge,
          'telephoneNo': res.companyBean.telephoneNo,
          // 'clientType': res.countryMaster.clientType,
          //'countryIsActive': res.countryMaster.countryIsActive,
        })
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }

  reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
        id:[""],

        companyName:[""],
        shortName:[""],
        country:[""],
        faxNo:[""],
        address:[""],
        emailId:[""],
        telephoneNo:[""],
        personIncharge:[""],
        isactive:[""],
        companyId:[""],
        'loginedUser': this.tokenStorage.getUserId()
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  validateEmail(event){
    this.httpService.get<any>(this.userMasterService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res){
        this.docForm.controls['emailId'].setErrors({ employee: true });
      }else{
       // this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }



  update(){

    this.company = this.docForm.value;
    this.httpService.post(this.companyService.updateCompany, this.company).subscribe((res: any) =>{
     
     if(res.success){
      this.showNotification(
        "snackbar-success",
        "Record Successfully Added...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/master/company/listCompany']);
     }else{
      this.showNotification(
        "snackbar-danger",
        "Department Code Already Exists...!!!",
        "bottom",
        "center"
      );
     }
     
    });
    
    

  }

  onCancel(){
    this.router.navigate(['/master/company/listCompany']);
  
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  validateCompanyName(event) {
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.companyService.uniqueValidateUrl + "?tableName=" + "company" + "&columnName=" + "company_name" + "&columnValue=" + event).subscribe((res: any) => {
        if (res) {
          this.docForm.controls['companyName'].setErrors({ company: true });
        } else {
          this.docForm.controls['companyName'].setErrors(null);
        }
      });
    }
  }

}

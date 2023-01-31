import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepartmentMaster } from '../department-master.model';
import { DepartmentMasterResultBean } from '../department-master-result-bean';
import { DepartmentMasterService } from '../department-master.service';
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-department-master',
  templateUrl: './add-department-master.component.html',
  styleUrls: ['./add-department-master.component.sass']
})
export class AddDepartmentMasterComponent implements OnInit {
  docForm: FormGroup;
  departmentMaster: DepartmentMaster;
  requestId: number;
  edit:boolean=false;
  contactPersonList: [];
  locationDdList=[];
  companyList=[];
  branchList=[];
  companyId: any;
  branchId: any;
  userId: any;

  constructor(private fb: FormBuilder,private tokenStorage: TokenStorageService,
    private departmentMasterService : DepartmentMasterService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      // departmentCode:["", [Validators.required]],
      //departmentName: ["", [Validators.required]],
      deptCode: ["",[Validators.required]],
      departmentHead: [""],
      remarks:[""],
      isactive:[false],
      deptId:[""],
      contactPerson:[""],
      company:["",[Validators.required]],
      branchname:["",[Validators.required]],
      
    });

  }

  ngOnInit(): void {

     this.companyId=this.tokenStorage.getCompanyId();
     console.log(this.companyId);
    this.branchId=this.tokenStorage.getBranchId();
    console.log(this.branchId);
    this.userId=this.tokenStorage.getUserId();
    console.log(this.userId);

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });

     
       // Contact Person dropdown
       this.httpService.get<any>(this.departmentMasterService.getAdminDropdown+"?companyId="+this.companyId).subscribe({
        next: (data) => {
          this.locationDdList = data;
        },
        error: (error) => {
  
        }
      }
      );

 

     // Company  Dropdown List
    this.httpService.get<any>(this.departmentMasterService.getCompanyDropdown+"?userId="+this.userId).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      error: (error) => {
      }
    });

      // Branch Dropdown List
      this.httpService.get<any>(this.departmentMasterService.getBranchDropdown+"?companyId="+this.companyId).subscribe({
        next: (data) => {
          this.branchList = data;
        },
        error: (error) => {
        }
      });
  }

  onSubmit(){
    // if(this.docForm.controls.isactive.value==""){
    //   this.docForm.patchValue({
    //      isactive:false
    //   })
    // }

    if(this.docForm.valid){
      if(this.docForm.value.deptCode!=""){
     if(this.docForm.value.isactive==true)
     {
      this.docForm.value.isactive="True"
     }
     else if(this.docForm.value.isactive==false)
     {
      this.docForm.value.isactive="False"
     }
      this.departmentMaster = this.docForm.value;
    console.log(this.departmentMaster);
    this.departmentMasterService.addDepartment(this.departmentMaster);
    this.showNotification(
      "snackbar-success",
      "Successfully Added...!!!",
      "bottom",
      "center"
    );
    
    this.router.navigate(['/master/department-Master/list-department']);
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please Fill Department Code",
      "top",
      "right"
    );
  }
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
    
  }

  validateDepartmentCode(event){
    this.httpService.get<any>(this.departmentMasterService.validateDepartmentCodeUrl+ "?tableName=" +"assetdepartment"+"&columnName="+"departmentcode"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['deptCode'].setErrors({ country: true });
      }else{
        this.docForm.controls['deptCode'].setErrors(null);
      }
    });
  }

  fetchDetails(department: any): void {
    this.httpService.get(this.departmentMasterService.editDepartment + "?department=" + department).subscribe((res: any) => {

    // this.httpService.get(this.departmentMasterService.editDepartment+"?departmentMaster="+deptCode).subscribe((res: any)=> {
      console.log(department);

      this.docForm.patchValue({
        // 'departmentCode': res.departmentMasterBean.departmentCode,
         //'departmentName': res.departmentMasterBean.departmentName,
         'deptCode': res.departmentBean.deptCode,
        'departmentHead': res.departmentBean.departmentHead,
        'remarks' : res.departmentBean.remarks,
        'isactive' : res.departmentBean.isactive,
        'deptId' : res.departmentBean.deptId,
        'contactPerson' : res.departmentBean.contactPerson,
        'company' : res.departmentBean.company,
        'branchname' : res.departmentBean.branchname, 
  
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }

  update(){
    if(this.docForm.value.deptCode!=""){
    if (this.docForm.valid){
    this.departmentMaster = this.docForm.value;
    this.httpService.post(this.departmentMasterService.updateDepartment, this.departmentMaster).subscribe((res: any) =>{
     
     if(res.success){
      this.showNotification(
        "snackbar-success",
        "Record Updated Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/master/department-Master/list-department']);
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
  else{
    this.showNotification(
      "snackbar-danger",
      "Please Fill The All Required fields",
      "top",
      "right"
    );
  }
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please Fill Department Code",
      "top",
      "right"
    );
  }
    

  }

  keyPressNameWithNumber(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z]/;
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


  onCancel(){
    this.router.navigate(['/master/department-Master/list-department']);
  
  }
  
 
  reset() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
        deptCode: ["",[Validators.required]],
        departmentHead: [""],
        branchname: [""],
        company:[""],
        remarks: [""],
        isactive: [""],
        contactPersonId:[""],
        'loginedUser': this.tokenStorage.getUserId()
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  validateDepartmentMaster(event){
    this.httpService.get<any>(this.departmentMasterService.uniqueValidateUrl+ "?tableName=" +"assetdepartment"+"&columnName="+"departmentname"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['departmentHead'].setErrors({ assetdepartment: true });
      }else{
        this.docForm.controls['departmentHead'].setErrors(null);
      }
    });
  }

  


}

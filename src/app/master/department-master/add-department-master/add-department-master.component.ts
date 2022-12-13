import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepartmentMaster } from '../department-master.model';
import { DepartmentMasterResultBean } from '../department-master-result-bean';
import { DepartmentMasterService } from '../department-master.service';

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

  constructor(private fb: FormBuilder,
    private departmentMasterService : DepartmentMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      // departmentCode:["", [Validators.required]],
      //departmentName: ["", [Validators.required]],
      deptCode: [""],
      departmentHead: ["", [Validators.required]],
      remarks:[""],
      isactive:[""],
      deptId:[""]
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
  }

  onSubmit(){
    if(this.docForm.controls.isactive.value==""){
      this.docForm.patchValue({
         isactive:false
      })
    }
    this.departmentMaster = this.docForm.value;
    
    console.log(this.departmentMaster);
    this.departmentMasterService.addDepartment(this.departmentMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/department-Master/list-department']);
    
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
        'deptId' : res.departmentBean.deptId
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

    this.departmentMaster = this.docForm.value;
    this.departmentMasterService.departmentUpdate(this.departmentMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/department-Master/list-department']);

  }

  onCancel(){
    this.router.navigate(['/master/department-Master/list-department']);
  
  }
  
  reset(){this.docForm = this.fb.group({
    deptCode: [""],
    departmentHead: [""],
    remarks: [""],
    isactive: [""],
    
  });}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}

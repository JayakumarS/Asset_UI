import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { StatusMaster } from '../status-model';
import { StatusService } from '../status.service';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-status-master',
  templateUrl: './add-status-master.component.html',
  styleUrls: ['./add-status-master.component.sass']
}) 

export class AddStatusMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  editflag:boolean=false;
  statusMaster : StatusMaster;
  edit: boolean = false;

  constructor(private fb: FormBuilder,
    private statusMasterService : StatusService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      statusname: ["", [Validators.required]],
      statusid: [""],
      Description:[""],
      active:[true],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      loginedUser: this.tokenStorage.getUserId(),

    });

  }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      statusname: ["", [Validators.required]],
      statusid: [""],
      Description:[""],
      active:[true],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      loginedUser: this.tokenStorage.getUserId(),

    });
      this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
 }
     });

     if(this.docForm.value.statusname==''||this.docForm.value.statusname==null){
      this.editflag=true
    }else{
      this.editflag=false;
    }

  }

  onSubmit(){
    this.statusMaster = this.docForm.value;
    console.log(this.statusMaster);
    if(this.docForm.valid){

    this.statusMasterService.addStatus(this.statusMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          if(window.sessionStorage.getItem("StateFrom")=="state"){
            window.sessionStorage.setItem("StateFrom","");
          this.router.navigate(['/master/company/addCompany/'+this.tokenStorage.getCompanyId()]);
          }else if(window.sessionStorage.getItem("StateFrom")=="normal"){
            window.sessionStorage.setItem("StateFrom","");
            this.router.navigate(['/master/status/listStatus']);
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      }
    });
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.statusMasterService.editStatusMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      
       if(res.statusMasterBean.statusname==''||res.statusMasterBean.statusname==null){
      this.editflag=true
    }else{
      this.editflag=false;
    }


      this.docForm.patchValue({

        'statusname': res.statusMasterBean.statusname,
        'statusid': res.statusMasterBean.statusid,
        'Description': res.statusMasterBean.Description,
        'active': res.statusMasterBean.active,
        'id' : res.statusMasterBean.id
     })
      },
      (err: HttpErrorResponse) => {
      }
    );

  }

  update(){
    if(this.docForm.valid){

    this.statusMaster = this.docForm.value;
    this.statusMasterService.statusMasterUpdate(this.statusMaster);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    // if(window.sessionStorage.getItem("StateFrom")=="state"){
    //   window.sessionStorage.setItem("StateFrom","");
    // this.router.navigate(['/master/company/addCompany/'+this.tokenStorage.getCompanyId()]);
    // }else if(window.sessionStorage.getItem("StateFrom")=="normal"){
    //   window.sessionStorage.setItem("StateFrom","");
      this.router.navigate(['/master/status/listStatus']);
    // }
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

  onCancel(){
    // if(window.sessionStorage.getItem("StateFrom")=="state"){
    //   window.sessionStorage.setItem("StateFrom","");
    // this.router.navigate(['/master/company/addCompany/'+this.tokenStorage.getCompanyId()]);
    // }else if(window.sessionStorage.getItem("StateFrom")=="normal"){
    //   window.sessionStorage.setItem("StateFrom","");
      this.router.navigate(['/master/status/listStatus']);
    // }
  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
      statusname: ["", [Validators.required]],
      statusid: [""],
      Description: [""],
      active: [true],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId()

    });
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

  validateStatusName(event){
    let companyId=this.tokenStorage.getCompanyId();

    // tslint:disable-next-line:max-line-length
    this.httpService.get<any>(this.statusMasterService.uniqueValidateCompanyBasedUrl +"?statusname="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['statusname'].setErrors({ assetcategory: true });
      }
      // else{
      //   this.docForm.controls['categoryName'].setErrors(null);
      // }
    });
  }


}

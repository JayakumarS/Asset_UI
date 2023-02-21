import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DesignationMaster } from '../designation-master.model';
import { DesignationMasterResultBean } from '../designation-master-result-bean';
import { DesignationMasterService } from '../designation-master.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from '../../user-master/user-master.service';
import { CommonService } from 'src/app/common-service/common.service';


@Component({
  selector: 'app-add-desingnation-master',
  templateUrl: './add-desingnation-master.component.html',
  styleUrls: ['./add-desingnation-master.component.sass']
})
export class AddDesingnationMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  designationMaster : DesignationMaster;
  getUserBasedCompanyList=[];
  userId: any;
  getCountryList=[];
  constructor(private fb: FormBuilder,
    private designationMasterService : DesignationMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    public userMasterService:UserMasterService,
    public commonService:CommonService,
    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      fullName: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      contactNumber:["", [Validators.required]],
      company:["",[Validators.required]],
      address:[""],
      country:[""],
      active:[true],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      loginedUser: this.tokenStorage.getUserId(),
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
      // Country dropdown
      this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
        next: (data) => {
          this.getCountryList = data;
        },
        error: (error) => {
  
        }
      }
      );
      // User Based Company List
    this.userId = this.tokenStorage.getUserId(),
    this.httpService.get<any>(this.userMasterService.companyListUrl + "?userId=" + this.userId).subscribe(
      (data) => {
        if(data.getUserBasedCompanyList>0){
          this.getUserBasedCompanyList = data.getUserBasedCompanyList;
        } else {
           let companyText=this.tokenStorage.getCompanyText();
           let companyId=this.tokenStorage.getCompanyId();
          if(companyText!="null"){
            let obj ={
              id1:parseInt(companyId),
              text:companyText
             }
             this.getUserBasedCompanyList.push(obj);
          }
           
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  onSubmit(){
    this.designationMaster = this.docForm.value;
    console.log(this.designationMaster);
    if(this.docForm.valid){
    this.designationMasterService.addDesignation(this.designationMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.router.navigate(['/master/Activity-master/list-activity']);
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
  
    // this.showNotification(
    //   "snackbar-success",
    //   "Add Record Successfully...!!!",
    //   "bottom",
    //   "center"
    // );
    // this.router.navigate(['/master/Activity-master/list-activity']);
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.designationMasterService.editDesignationMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      this.docForm.patchValue({
        'fullName': res.activityMasterBean.fullName,
        'emailId': res.activityMasterBean.emailId,
        'contactNumber': res.activityMasterBean.contactNumber,
        'company': res.activityMasterBean.company,
        'address': res.activityMasterBean.address,
        'country': res.activityMasterBean.country,
        'active': res.activityMasterBean.active,
        'id' : res.activityMasterBean.id
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.designationMaster = this.docForm.value;
    this.designationMasterService.designationMasterUpdate(this.designationMaster);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/Activity-master/list-activity']);

  }

  onCancel(){
     this.router.navigate(['/master/Activity-master/list-activity']);
  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
      fullName: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      contactNumber:["", [Validators.required]],
      company:["",[Validators.required]],
      address:[""],
      country:[""],
      active:[true],
      id:[""],

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

}

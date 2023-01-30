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
  constructor(private fb: FormBuilder,
    private designationMasterService : DesignationMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      activtyname: ["", [Validators.required]],
      activtyid: [""],
      Description:["", [Validators.required]],
      active:[""],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId()
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
    this.designationMaster = this.docForm.value;
    console.log(this.designationMaster);
    if(this.docForm.valid){
    this.designationMasterService.addDesignation(this.designationMaster);
  
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/Activity-master/list-activity']);
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.designationMasterService.editDesignationMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      

      this.docForm.patchValue({

        'activtyname': res.activityMasterBean.activtyname,
        'activtyid': res.activityMasterBean.activtyid,
        'Description': res.activityMasterBean.Description,
        'active': res.activityMasterBean.active,
        'id' : res.activityMasterBean.id
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
      activtyname: [""],
      activtyid: [""],
      Description: [""],
      active: [""],
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

}

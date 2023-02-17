import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { StatusMaster } from '../status-model';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-add-status-master',
  templateUrl: './add-status-master.component.html',
  styleUrls: ['./add-status-master.component.sass']
})
export class AddStatusMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  statusMaster : StatusMaster;
  constructor(private fb: FormBuilder,
    private statusMasterService : StatusService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      statusname: ["", [Validators.required]],
      activtyid: [""],
      Description:["", [Validators.required]],
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
  }

  onSubmit(){
    this.statusMaster = this.docForm.value;
    console.log(this.statusMaster);
    if(this.docForm.valid){
    //this.statusMasterService.addDesignation(this.statusMaster);

    this.statusMasterService.addStatus(this.statusMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.router.navigate(['/master/status/listStatus']);
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
      

      this.docForm.patchValue({

        'statusname': res.activityMasterBean.statusname,
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

    this.statusMaster = this.docForm.value;
    this.statusMasterService.statusMasterUpdate(this.statusMaster);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/status/listStatus']);

  }

  onCancel(){
     this.router.navigate(['/master/status/listStatus']);
  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
      statusname: [""],
      activtyid: [""],
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

}

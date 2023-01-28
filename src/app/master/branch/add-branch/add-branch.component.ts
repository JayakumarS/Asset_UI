import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { Branch } from '../branch-model';
import { BranchService } from '../branch.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.sass']
})
export class AddBranchComponent implements OnInit {
  companyList:any 
  locationDdList:any
  branchMaster:Branch;

  docForm: FormGroup;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    private branchService : BranchService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,) {
      this.docForm = this.fb.group({
        branchCode: [""],
        branchname: [""],
        companyId:[""],
        location:[""],
        isactive:[false],
      });


     }

  ngOnInit(): void {

    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {
  
      }
    });

    this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      error: (error) => {
  
      }
    });
  }

  
  validateDepartmentCode(){
    
  }

  onSubmit(){
    this.branchMaster = this.docForm.value;
    console.log(this.branchMaster);
    if(this.docForm.valid){
    this.branchService.addBranch(this.branchMaster);
  
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/Branch/listBranch']);
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.branchService.editBranchMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      console.log(res);

    //   this.docForm.patchValue({

    //     'activtyname': res.activityMasterBean.activtyname,
    //     'activtyid': res.activityMasterBean.activtyid,
    //     'Description': res.activityMasterBean.Description,
    //     'active': res.activityMasterBean.active,
    //     'id' : res.activityMasterBean.id
    //  })
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

    console.log();

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

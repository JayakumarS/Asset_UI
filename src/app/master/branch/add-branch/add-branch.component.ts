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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

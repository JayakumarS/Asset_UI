import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
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
  requestId: number;
  docForm: FormGroup;
  edit:boolean=false;
  branch : Branch;
  locationDropdownList:[];
  userId:any;
  string:any;
  

  constructor(private fb: FormBuilder,
    private branchService : BranchService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) {
      this.docForm = this.fb.group({
        branchCode: [""],
        branchname: [""],
        companyId:[""],
        location:[""],
        isactive:[false],
        userId:[""]
      });


     }

  ngOnInit(): void {

    this.userId = this.tokenStorage.getUserId();

    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {
  
      }
    });

    // this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
    //   next: (data) => {
    //     this.companyList = data;
    //   },
    //   error: (error) => {
  
    //   }
    // });
    

    this.httpService.get<any>(this.branchService.userBasedBranchDDList + "?userId=" + this.userId).subscribe(
      (data) => {
        this.companyList = data.getuserBasedBranchDDList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });

  }

  
  validateDepartmentCode(){
    
  }

  validationUserGroup(location:any){
    this.httpService.get(this.branchService.locationDropdown+"?locationId=" + location ).subscribe((res: any) => {
      console.log(location);
      this.locationDropdownList = res.locationDropdownList;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
     
  }
  
  onSubmit(){
    this.docForm.value.userId = this.tokenStorage.getUserId();
    this.branchMaster = this.docForm.value;
    console.log(this.branchMaster);
    if(this.docForm.valid){
    this.branchService.addBranch(this.branchMaster,this.router,this.notificationService);
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.branchService.editBranchMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      console.log(res);
     this.edit = true;
      this.docForm.patchValue({

        'branchname': res.branchbean.branchname,
        'companyId': res.branchbean.companyId,
        'isactive': res.branchbean.isactive,
        'location': res.branchbean.location,
        'branchCode' : res.branchbean.branchCode
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

    // console.log();
    this.branch = this.docForm.value;
    this.branch.branchId = this.requestId;
    this.branchService.branchUpdate(this.branch);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/Branch/listBranch']);

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onCancel(){
    this.router.navigate(['/master/Branch/listBranch']);
 }
 
 reset(){
  if (!this.edit) {
    location.reload()
  this.docForm = this.fb.group({
    branchCode: [""],
    location: [""],
    branchname: [""],
    companyId: [""],

  });
} else {
  this.fetchDetails(this.requestId);
}
}
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UserGroupMaster } from '../usergroup-model';
import { UsergroupService } from '../usergroup.service';

@Component({
  selector: 'app-add-usergroup',
  templateUrl: './add-usergroup.component.html',
  styleUrls: ['./add-usergroup.component.sass']
})
export class AddUsergroupComponent implements OnInit {
  
   userGroupMaster:UserGroupMaster
  docForm: FormGroup;
  roleList:any;
  userList:any;
  branchList:any;
  companyList:any;
  companydetailList:any;
  requestId: any;
  edit:boolean=false;
  countryList:any;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public usergroupService: UsergroupService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private serverUrl: serverLocations,    
    public tokenStorage: TokenStorageService,
    
  ) { 

    this.docForm = this.fb.group({

      companyName:[""],
      cmpdetails:["",[]],
      country:[""],
      address:[""],
      telephone:[""],
      person:[""],
      branch:[""],
      user_mapping_id:[""],
      loginedUser: this.tokenStorage.getUserId(),
      
      userDetailbean: this.fb.array([
        this.fb.group({
          users: '',
          role: '',
          
        })
      ]),


 });

}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId);

      }
    });
    this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      error: (error) => {
  
      }
    });

    this.httpService.get<any>(this.commonService.getCompanyDetailDropdown).subscribe({
      next: (data) => {
        this.companydetailList = data;
      },
      error: (error) => {
  
      }    
     });
    this.httpService.get<any>(this.commonService.getRoleDropdown).subscribe({
      next: (data) => {
       this.roleList = data;
       },
      error: (error) => {
  
       }    
     });

     this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
      next: (data) => {
       this.countryList = data;
       },
      error: (error) => {
  
       }    
     });
     this.httpService.get<any>(this.commonService.getBranchDropdown).subscribe({
      next: (data) => {
       this.branchList = data;
       },
      error: (error) => {
  
       }    
     });

     this.httpService.get<any>(this.commonService.getUserDropdown).subscribe({
      next: (data) => {
       this.userList = data;
       },
      error: (error) => {
  
       }    
     });


  }
  fetchDetails(mapping_id: any): void {
    const obj = {
      editId: mapping_id
    }
    this.spinner.show();
    this.usergroupService.editCompany(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.docForm.patchValue({
          // 'companyId': res.companyBean.companyId,
          // 'address': res.companyBean.address,
          // 'country': parseInt(res.companyBean.country),
          // 'person': res.companyBean.personIncharge,
          // 'telephone': res.companyBean.telephoneNo,
          'user_mapping_id':res.userBean.user_mapping_id,
          'companyName':res.userBean.companyName,
          'branch':res.userBean.branch,
          'users':res.userBean.users
        })

          let manageAuditDtlArray = this.docForm.controls.userDetailbean as FormArray;
          manageAuditDtlArray.removeAt(0);
          if(res.userBean.userDetailbean!=null){
       
          
           res.userBean.userDetailbean.forEach(element => {
                 let manageAuditDtlArray = this.docForm.controls.userDetailbean as FormArray;
                 let arraylen = manageAuditDtlArray.length;
                 let newUsergroup: FormGroup = this.fb.group({
                  users:[element.users],
                  
                })
          manageAuditDtlArray.insert(arraylen,newUsergroup);
        });
      }
      
      (err: HttpErrorResponse) => {
         // error code here
      }
  }
   

  })
}
  onSubmit(){
      this.httpService.post<any>(this.usergroupService.save, this.docForm.value).subscribe(data => {
        if(data.success){
          this.showNotification(
            "snackbar-success",
            "Record Added Successfully...!!!",
            "bottom",
            "center"
          )
        }
        else{
          this.showNotification(
            "snackbar-danger",
            data.message + "...!!!",
            "bottom",
            "center"
          );
        }
        
        },
        (err: HttpErrorResponse) => {
          
      });
    

  }


  addRow(){

    let scheduledListDetailArray = this.docForm.controls.userDetailbean as FormArray;
    let arraylen = scheduledListDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      users:[""],
      role:[""],
     

     
    })
    scheduledListDetailArray.insert(arraylen, newUsergroup);

  }
reset(){
if (!this.edit) {
  this.docForm.reset();
  this.docForm.patchValue({
    'companyName': '',
    'branch': '',
    'users': '',
    'loginedUser': this.tokenStorage.getUserId()
  })
} else {
  this.fetchDetails(this.requestId);
}
}

update(){
  this.userGroupMaster = this.docForm.value;
    this.spinner.show();
    this.usergroupService.update(this.userGroupMaster).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Edit Record Successfully",
            "bottom",
            "center"
          );
          this.onCancel();
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Updated Successfully...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "bottom",
          "center"
        );
      }
    });

    this.router.navigate(['master/usergroup/listusergroup']);

}

onCancel(){
this.router.navigate(['master/usergroup/listusergroup'])
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

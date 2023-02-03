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
  companyId:any;
  userList:[];
  string:any;
  List:[""];
  branchList:any;
  companyList:any;
  companydetailList:any;
  requestId: any;
  edit:boolean=false;
  countryList:any;
  branchDropdownList=[]
  branchDropDownList=[];
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
      person_in_charge:[""],
      companyid:[""],
      branchid:[""],
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

    // this.docForm = this.fb.group({

    //   companyid: this.tokenStorage.getCompanyId(),
    //   branchid: this.tokenStorage.getBranchId(),


    // });
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId);


      }
    });

   
    this.person_in_chargeList(this.docForm.value.loginedUser);
    //this.UserList(this.docForm.value.loginedUser);

    this.httpService.get<any>(this.commonService.getCompanyDetailDropdown).subscribe({
      next: (data) => {
        this.companydetailList = data;
      },
      error: (error) => {
  
      }    
     });
     this.httpService.get<any>(this.usergroupService.getRoleDropdown).subscribe({
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

    //  this.httpService.get<any>(this.commonService.getUserDropdown).subscribe({
    //   next: (data) => {
    //    this.userList = data;
    //    },
    //   error: (error) => {
  
    //    }    
    //  });


  }


  person_in_chargeList(companyName: any): void {
    this.httpService.get(this.usergroupService.getCompanyDropdown+ "?person_in_charge=" + companyName).subscribe((res: any) => {
      this.companyList = res;
 });
}
 UserList(user:any):void {
 this.httpService.get(this.usergroupService.getUserDropdown+ "?userId=" + user).subscribe((res: any) => {
   this.userList = res; });

}

// RoleList(user:any):void {
//   this.httpService.get(this.usergroupService.getRoleDropdown+ "?roleId=" + user).subscribe((res: any) => {
//     this.roleList = res; });
 
//  }



  fetchDetails(mapping_id: any): void {
    this.person_in_chargeList(this.docForm.value.loginedUser);

    const obj = {
      editId: mapping_id
    }
    this.spinner.show();
    this.usergroupService.editCompany(obj).subscribe({
      next: (res: any) => {
        this.validationUserGroup(res.userBean.companyName);

        this.spinner.hide();
        this.docForm.patchValue({
          // 'companyId': res.companyBean.companyId,
          // 'address': res.companyBean.address,
          // 'country': parseInt(res.companyBean.country),
          // 'person': res.companyBean.personIncharge,
          // 'telephone': res.companyBean.telephoneNo,
          'user_mapping_id':res.userBean.user_mapping_id,
          
          'companyName':res.userBean.companyName.toString(),
          'branch':res.userBean.branch,
          'users':res.userBean.users,
          'role':res.userBean.role
        })

          let manageAuditDtlArray = this.docForm.controls.userDetailbean as FormArray;
          manageAuditDtlArray.removeAt(0);
          if(res.userBean.userDetailbean!=null){
       
          
           res.userBean.userDetailbean.forEach(element => {
                 let manageAuditDtlArray = this.docForm.controls.userDetailbean as FormArray;
                 let arraylen = manageAuditDtlArray.length;
                 let newUsergroup: FormGroup = this.fb.group({
                  users:[element.users],
                  role:[element.role]
                  
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

validationUserGroup(branch: any) {
  this.httpService.get(this.usergroupService.branchDropdown + "?Id=" + branch ).subscribe((res: any) => {
    console.log(branch);
    this.branchDropDownList = res.branchDropDownList;
  //this.userList=res.userList;
  },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );

  this.httpService.get(this.usergroupService.userIdDropdown + "?usrId=" +parseInt(branch) ).subscribe((res: any) => {
    console.log(branch);
    //this.branchDropDownList = res.branchDropDownList;
  this.userList=res.userList;
  },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  this.httpService.get<any>(this.usergroupService.uniqueValidateUrl+ "?tableName=" +"user_mapping_hdr"+"&columnName="+"company_id"+"&columnValue="+branch).subscribe((res: any) => {
    if(res){
      this.docForm.controls['companyName'].setErrors({ company: true });
    }else{
      this.docForm.controls['companyName'].setErrors(null);
    }
  });

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
      this.router.navigate(['master/usergroup/listusergroup']);


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
    checkUser(user:any,index:any){
      this.userList;
      let scheduledListDetailArray = this.docForm.controls.userDetailbean as FormArray;
      let arraylen = scheduledListDetailArray.length;
      for(var k=0;k<arraylen;k++){
         if(scheduledListDetailArray.at(k).value.users ==user && k!=index){
          this.showNotification(
            "snackbar-danger",
            "User already selected",
            "bottom",
            "center"
          );
          scheduledListDetailArray.at(index).patchValue({
          'users':''
          })
         }
       }
  
    }

   
  
reset(){
if (!this.edit) {
  this.docForm.reset();
  this.docForm.patchValue({
    'companyName': '',
    'branch': '',
    'users': '',
    'role':'',
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


removeRow(index){
  let scheduledListDetailArray = this.docForm.controls.userDetailbean as FormArray;
  scheduledListDetailArray.removeAt(index);
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


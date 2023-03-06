import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { LocationMasterService } from '../../location/location-master.service';
import { AddMultipleUserErrorComponent } from '../add-multiple-user-error/add-multiple-user-error.component';
import { UserMasterService } from '../user-master.service';

@Component({
  selector: 'app-add-multiple-user',
  templateUrl: './add-multiple-user.component.html',
  styleUrls: ['./add-multiple-user.component.sass']
})
export class AddMultipleUserComponent implements OnInit {

  multipleuploadForm: FormGroup;
  dialogTitle: string;
  excelFile : any;
  companyId: string;

  constructor(private fb: FormBuilder,public dialog: MatDialog,public router:Router,private snackBar: MatSnackBar,private  userMasterService: UserMasterService,private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<AddMultipleUserComponent>) {
      this.multipleuploadForm = this.fb.group({

      uploadfile:  [""],
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

    }); }

  ngOnInit(): void {
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
    location.reload();
  }

  getCreditFile(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName",fileExtension);
    this.excelFile = frmData;
    console.log(this.excelFile);
  
    }

    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    upload(){ 
      this.companyId=this.tokenStorage.getCompanyId();
      this.httpService.post<any>(this.userMasterService.multipleUserUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId()+"&userId="+this.tokenStorage.getUserId(),this.excelFile).subscribe(data => {
        console.log(data);
       
          if(data.message =='Success'){
          this.showNotification(
            "snackbar-success",
            "Records Added Successfully...!!!",
            "bottom",
            "center"
          );
          window.sessionStorage.setItem("makerLogin","");
          this.router.navigate(['/master/userMaster/list-user-master'])
          } else  if(data.message =='Email Id or Employee Id Already Present'){
            let tempDirection;
            if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
            } else {
           tempDirection = "ltr";
           }
            const dialogRef = this.dialog.open(AddMultipleUserErrorComponent, {
              data: data,
              height:"40%",
              width: "640px",
              direction: tempDirection,
            });
            
        }else if (data.message =='Department Id or Branch Id is not Present in the System'){
          let tempDirection;
            if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
            } else {
           tempDirection = "ltr";
           }
            const dialogRef = this.dialog.open(AddMultipleUserErrorComponent, {
              data: data,
              height:"40%",
              width: "640px",
              direction: tempDirection,
            });
        }
        else{
          this.showNotification(
            "snackbar-danger",
            "Records Not Added...!!!",
            "bottom",
            "center"
          );
  
          
        }
        
        },
        (err: HttpErrorResponse) => {
          
      });

    }


}

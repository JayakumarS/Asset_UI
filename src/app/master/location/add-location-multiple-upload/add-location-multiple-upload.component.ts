import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CompanyEmployeeService } from '../../company-employees/company-employees.service';
import { AddLocationErrorComponent } from '../add-location-error/add-location-error.component';
import { LocationMasterService } from '../location-master.service';
import { UploadExcelPopupComponent } from '../upload-excel-popup/upload-excel-popup.component';

@Component({
  selector: 'app-add-location-multiple-upload',
  templateUrl: './add-location-multiple-upload.component.html',
  styleUrls: ['./add-location-multiple-upload.component.sass']
})
export class AddLocationMultipleUploadComponent implements OnInit {

  multipleuploadForm: FormGroup;
  dialogTitle: string;
  excelFile : any;
  companyId: string;

  constructor(private fb: FormBuilder,public dialog: MatDialog,public router:Router,private snackBar: MatSnackBar,private  locationMasterService: LocationMasterService,private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<AddLocationMultipleUploadComponent>) {
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

    // upload(){ 
    //   this.companyId=this.tokenStorage.getCompanyId();
    //   this.httpService.post<any>(this.locationMasterService.multipleLocationUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId()+"&userId="+this.tokenStorage.getUserId(),this.excelFile).subscribe(data => {
    //     console.log(data);
       
    //       if(data.message =='Success'){
    //       this.showNotification(
    //         "snackbar-success",
    //         "Records Added Successfully...!!!",
    //         "bottom",
    //         "center"
    //       );
    //       window.sessionStorage.setItem("makerLogin","");
    //       this.router.navigate(['/master/location/listLocation'])
    //       window.location.reload();
    //       } else  if(data.message =='Location code Already Exits.'){
    //         let tempDirection;
    //         if (localStorage.getItem("isRtl") === "true") {
    //         tempDirection = "rtl";
    //         } else {
    //        tempDirection = "ltr";
    //        }
    //         const dialogRef = this.dialog.open(AddLocationErrorComponent, {
    //           data: data,
    //           height:"40%",
    //           width: "640px",
    //           direction: tempDirection,
    //         });
            
    //     }
    //     else {
    //       this.showNotification(
    //         "snackbar-danger",
    //         "Records Not Added...!!!",
    //         "bottom",
    //         "center"
    //       );
  
          
    //     }

    //     if(data.locationCode ==false){
    //       this.showNotification(
    //         "snackbar-danger",
    //        "Please Enter Valid Location Code.",
    //         "top",
    //         "center"
    //         );
    //      }

    //   else if(data.location ==false){
    //       this.showNotification(
    //         "snackbar-danger",
    //        "Please Enter Valid Location Code !",
    //         "top",
    //         "left"
    //         );
    //      } 
    //      else if(data.primaryHead ==false){
    //       this.showNotification(
    //         "snackbar-danger",
    //        "Please Enter Valid Location Code.",
    //         "top",
    //         "right"
    //         );
    //      }
        
    //     },
    //     (err: HttpErrorResponse) => {
          
    //   });

    // }


    upload(){ 
      this.companyId=this.tokenStorage.getCompanyId();
      this.httpService.post<any>(this.locationMasterService.multipleLocationUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId(),this.excelFile).subscribe(data => {
        console.log(data);
        let tempDirection;
            if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
            } else {
           tempDirection = "ltr";
           }
            const dialogRef = this.dialog.open(UploadExcelPopupComponent, {
              data: data,
              height:"80%",
              width: "100%",
              direction: tempDirection,
            });       
        },
        (err: HttpErrorResponse) => {
          
      });

    }
    
}

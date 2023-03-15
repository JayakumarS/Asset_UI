import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { AssetService } from '../asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UploadErrorComponent } from '../upload-error/upload-error.component';
@Component({
  selector: 'app-add-multiple-asset-master',
  templateUrl: './add-multiple-asset-master.component.html',
  styleUrls: ['./add-multiple-asset-master.component.sass']
})
export class AddMultipleAssetMasterComponent implements OnInit {

  assetmultipleuploadForm: FormGroup;
  dialogTitle: string;
  excelFile : any;
  companyId: string;

  constructor(private fb: FormBuilder,public dialog: MatDialog,public router:Router,private snackBar: MatSnackBar,private  assetService: AssetService,private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<AddMultipleAssetMasterComponent>) {

    this.assetmultipleuploadForm = this.fb.group({

      uploadfile:  [""],
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

    });
  }
 

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
        duration: 6000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    upload(){ 
      this.companyId=this.tokenStorage.getCompanyId();
      this.httpService.post<any>(this.assetService.multipleAssetUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId(),this.excelFile).subscribe({
        next: (data) => {
          if(data.success){
          if(data.message =='Success'){
          this.showNotification(
            "snackbar-success",
            "Records Added Successfully...!!!",
            "bottom",
            "center"
          );
          this.router.navigate(['/asset/assetMaster/listAssetMaster'])
          } else {
            this.showNotification(
              "snackbar-danger",
              data.message + "...!!!",
              "top",
              "right"
            );
          }   
        }
        else{
          this.showNotification(
            "snackbar-danger",
            data.message + "...!!!",
            "top",
            "right"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "top",
          "right"
        );
      }
    });

    }

}

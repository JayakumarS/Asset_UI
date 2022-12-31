import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { AssetService } from '../asset.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-multiple-asset-master',
  templateUrl: './add-multiple-asset-master.component.html',
  styleUrls: ['./add-multiple-asset-master.component.sass']
})
export class AddMultipleAssetMasterComponent implements OnInit {

  assetmultipleuploadForm: FormGroup;
  dialogTitle: string;
  excelFile : any;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,private  assetService: AssetService,private httpService: HttpServiceService,public dialogRef: MatDialogRef<AddMultipleAssetMasterComponent>) {

    this.assetmultipleuploadForm = this.fb.group({

      uploadfile:  [""]
      
    });
  }
 

  ngOnInit(): void {
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
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

      this.httpService.post<any>(this.assetService.multipleAssetUploadFiles,this.excelFile).subscribe(data => {
        console.log(data);
        if(data.success){
          this.showNotification(
            "snackbar-success",
            "Records Added Successfully...!!!",
            "bottom",
            "center"
          );
          this.router.navigate(['/asset/assetMaster/listAssetMaster'])
        }
        else{
          this.showNotification(
            "snackbar-danger",
            "Records Added Successfully...!!!",
            "bottom",
            "center"
          );
  
          
        }
        
        },
        (err: HttpErrorResponse) => {
          
      });

    }

}

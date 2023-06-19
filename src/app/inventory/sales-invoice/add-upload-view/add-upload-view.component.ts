import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssetService } from 'src/app/asset/asset-master/asset.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-upload-view',
  templateUrl: './add-upload-view.component.html',
  styleUrls: ['./add-upload-view.component.sass']
})
export class AddUploadViewComponent implements OnInit {
  pathVariable: string;

  
  

  constructor(@Inject(MAT_DIALOG_DATA) public values: any,public dialogRef: MatDialogRef<AddUploadViewComponent>) {

  
  }
 

  ngOnInit(): void {

    this.pathVariable = '/root/asset_upload/'+this.values.data
  }

  submit() {
    // emppty stuff
  }
 
  onNoClick(): void {
    this.dialogRef.close();
    location.reload();
  }




}

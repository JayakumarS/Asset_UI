import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AddMultipleAssetMasterComponent } from '../add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-upload-error',
  templateUrl: './upload-error.component.html',
  styleUrls: ['./upload-error.component.sass']
})
export class UploadErrorComponent implements OnInit {

  dialogTitle: string;
  excelFile : any;
  companyId: string;
  totalCount: any;
  incorrectCount: any;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,private  assetService: AssetService,private httpService: HttpServiceService,
    @Inject(MAT_DIALOG_DATA) public values: any,private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<UploadErrorComponent>) {
    }
  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
    this.incorrectCount=this.values.incorrectRecords;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { LocationMasterService } from '../location-master.service';

@Component({
  selector: 'app-add-location-error',
  templateUrl: './add-location-error.component.html',
  styleUrls: ['./add-location-error.component.sass']
})
export class AddLocationErrorComponent implements OnInit {

  dialogTitle: string;
  excelFile : any;
  companyId: string;
  totalCount: any;
  incorrectCount: any;
  message:any;
  locationCode:boolean;
  branchAndDep:boolean;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,private  assetService: LocationMasterService,private httpService: HttpServiceService,
    @Inject(MAT_DIALOG_DATA) public values: any,private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<AddLocationErrorComponent>) {
    }
  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
    this.incorrectCount=this.values.incorrectRecords;
    this.message = this.values.message;
    this.locationCode = this.values.locationCode;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }

}

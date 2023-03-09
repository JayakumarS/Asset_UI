import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CompanyEmployeeService } from '../company-employees.service';

@Component({
  selector: 'app-companyemployee-upload-error',
  templateUrl: './companyemployee-upload-error.component.html',
  styleUrls: ['./companyemployee-upload-error.component.sass']
})
export class CompanyemployeeUploadErrorComponent implements OnInit {

  totalCount:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public values: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<CompanyemployeeUploadErrorComponent>
  ) { }

  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }

}

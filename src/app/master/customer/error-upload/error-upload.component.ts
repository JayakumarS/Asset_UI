import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-error-upload',
  templateUrl: './error-upload.component.html',
  styleUrls: ['./error-upload.component.sass']
})
export class ErrorUploadComponent implements OnInit {
  dialogTitle: string;
  excelFile : any;
  companyId: string;
  totalCount: any;
  incorrectCount: any;
  empidAndEmail:boolean;
  branchAndDep:boolean;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,private  customerService: CustomerService,private httpService: HttpServiceService,
    @Inject(MAT_DIALOG_DATA) public values: any,private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<ErrorUploadComponent>) {
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

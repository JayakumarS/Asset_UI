import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { LocationMasterService } from '../../location/location-master.service';
import { UserMasterService } from '../user-master.service';

@Component({
  selector: 'app-add-multiple-user-error',
  templateUrl: './add-multiple-user-error.component.html',
  styleUrls: ['./add-multiple-user-error.component.sass']
})
export class AddMultipleUserErrorComponent implements OnInit {

  dialogTitle: string;
  excelFile : any;
  companyId: string;
  totalCount: any;
  incorrectCount: any;
  message:any;
  empidAndEmail:boolean;
  branchAndDep:boolean;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,private  userMasterService: UserMasterService,private httpService: HttpServiceService,
    @Inject(MAT_DIALOG_DATA) public values: any,private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<AddMultipleUserErrorComponent>) {
    }
  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
    this.incorrectCount=this.values.incorrectRecords;
    this.message = this.values.message;
    this.empidAndEmail = this.values.empidAndEmail;
    this.branchAndDep = this.values.branchAndDep;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }

}


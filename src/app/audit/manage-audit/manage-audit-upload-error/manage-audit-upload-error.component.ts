import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ManageAuditService } from '../manage-audit.service';

@Component({
  selector: 'app-manage-audit-upload-error',
  templateUrl: './manage-audit-upload-error.component.html',
  styleUrls: ['./manage-audit-upload-error.component.sass']
})
export class ManageAuditUploadErrorComponent implements OnInit {
  dialogTitle: string;
  excelFile : any;
  companyId: string;
  totalCount: any;
  incorrectCount: any;
  message:any;
  empidAndEmail:boolean;
  branchAndDep:boolean;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,
    private  manageAuditService: ManageAuditService,private httpService: HttpServiceService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<ManageAuditUploadErrorComponent>) {
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

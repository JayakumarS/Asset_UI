import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ManageAuditService } from '../manage-audit.service';
import { UploadManageAuditExcelPopupComponent } from '../upload-manage-audit-excel-popup/upload-manage-audit-excel-popup.component'; 

@Component({
  selector: 'app-add-multipleupload-manage-audit',
  templateUrl: './add-multipleupload-manage-audit.component.html',
  styleUrls: ['./add-multipleupload-manage-audit.component.sass']
})
export class AddMultipleuploadManageAuditComponent implements OnInit {

  manageauditmultipleuploadForm: FormGroup;
  dialogTitle: string;
  excelFile : any;
  companyId: string;

  constructor(
    private fb: FormBuilder,public dialog: MatDialog,public router:Router,
    private snackBar: MatSnackBar,private  manageAuditService: ManageAuditService,
    private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<AddMultipleuploadManageAuditComponent>
  ) { 
    this.manageauditmultipleuploadForm = this.fb.group({

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
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    upload(){ 
      this.companyId=this.tokenStorage.getCompanyId();
      this.httpService.post<any>(this.manageAuditService.multipleManageAuditUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId(),this.excelFile).subscribe(data => {
        console.log(data);
         let tempDirection;
            if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
            } else {
           tempDirection = "ltr";
           }
            const dialogRef = this.dialog.open(UploadManageAuditExcelPopupComponent, {
              data: data,
              height:"60%",
              width: "100%",
              direction: tempDirection,
            });
            
        },
        (err: HttpErrorResponse) => {
          
      });

    }



}

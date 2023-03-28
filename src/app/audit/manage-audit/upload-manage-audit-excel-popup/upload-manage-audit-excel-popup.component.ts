import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UsergroupService } from 'src/app/master/usergroup/usergroup.service';
import { UploadManageAuditSuccessPopupComponent } from '../upload-manage-audit-success-popup/upload-manage-audit-success-popup.component';
import { ManageAuditService } from '../manage-audit.service';

@Component({
  selector: 'app-upload-manage-audit-excel-popup',
  templateUrl: './upload-manage-audit-excel-popup.component.html',
  styleUrls: ['./upload-manage-audit-excel-popup.component.sass']
})
export class UploadManageAuditExcelPopupComponent implements OnInit {

  userGroup:[]
  docForm: FormGroup;
  companyId:any;
  itemList:any;
  isValid: boolean=true;
  isValidMaker: boolean=true;
  isValidAuditor: boolean=true;
  auditTypevalid:  boolean=true;
  constructor(
    public router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl:serverLocations,
    private usergroupService : UsergroupService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    public manageAuditService: ManageAuditService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<UploadManageAuditSuccessPopupComponent>
  ) {
    this.docForm = this.fb.group({
      auditName:[""],
      startDateObj:[""],
      endDateObj:[""],
      makerId:[""],
      auditorId:[""],
      auditType:[""],
    });

  }

  ngOnInit(): void {
    this.itemList=this.values.manageAuditList;
    console.log(this.itemList);
   for(let i = 0;i<this.itemList.length;i++){
  
    if(this.itemList[i].isValidMaker == false){
      this.isValidMaker = false;
    }
    if(this.itemList[i].isValidAuditor == false){
      this.isValidAuditor = false;
    }
    if(this.itemList[i].auditTypevalid == false){
      this.auditTypevalid = false;
    }
    
  }
  }

   onSubmit(){
    this.itemList=this.values.manageAuditList;
    this.manageAuditService.addMultiple(this.itemList).subscribe({
      next:(data) => {
        if(data.message){
             
              const dialogRef = this.dialog.open(UploadManageAuditSuccessPopupComponent, {
                data: data,
                height:"100%",
                width: "100%",
              });
            }
          else{
            this.showNotification(
              "snackbar-danger",
              "Records Not Added...!!!",
              "bottom",
              "center"
            );


          }
      }
    })
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

   onNoClick(){
    this.dialogRef.close();
    location.reload();
  }

}

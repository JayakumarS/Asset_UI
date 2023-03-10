import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-upload-manage-audit-success-popup',
  templateUrl: './upload-manage-audit-success-popup.component.html',
  styleUrls: ['./upload-manage-audit-success-popup.component.sass']
})
export class UploadManageAuditSuccessPopupComponent implements OnInit {

  totalCount:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public values: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<UploadManageAuditSuccessPopupComponent>
  ) { }

  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }
}

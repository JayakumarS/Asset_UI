import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-upload-success-popup',
  templateUrl: './upload-success-popup.component.html',
  styleUrls: ['./upload-success-popup.component.sass']
})
export class UploadSuccessPopupComponent implements OnInit {

  totalCount:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public values: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<UploadSuccessPopupComponent>
  ) { }

  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }
}

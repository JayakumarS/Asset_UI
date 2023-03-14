import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-brand-upload-success-popup',
  templateUrl: './brand-upload-success-popup.component.html',
  styleUrls: ['./brand-upload-success-popup.component.sass']
})
export class BrandUploadSuccessPopupComponent implements OnInit {

  totalCount:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public values: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<BrandUploadSuccessPopupComponent>
  ) { }

  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }
}


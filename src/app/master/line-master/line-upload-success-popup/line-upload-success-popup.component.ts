import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-line-upload-success-popup',
  templateUrl: './line-upload-success-popup.component.html',
  styleUrls: ['./line-upload-success-popup.component.sass']
})
export class LineUploadSuccessPopupComponent implements OnInit {
  totalCount: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public values: any,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<LineUploadSuccessPopupComponent>
  ) { }

  ngOnInit(): void {
    this.totalCount=this.values.totalRecords;
  }

  onNoClick(){
    this.dialogRef.close();
    location.reload();
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MainService } from '../../main.service';
@Component({
  selector: 'app-company-map-popup',
  templateUrl: './company-map-popup.component.html',
  styleUrls: ['./company-map-popup.component.sass']
})
export class CompanyMapPopupComponent {
  
  constructor( public dialogRef: MatDialogRef<CompanyMapPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mainService: MainService, private tokenStorage:TokenStorageService) { }
 
  saveCompanyId(map){
    this.tokenStorage.saveCompanyId(map.companyId);
    this.tokenStorage.saveCompanyText(map.companyName);
    this.tokenStorage.saveActiveCompanyFlag("true");
    this.dialogRef.close();
    location.reload();
  }

  
    
  
}

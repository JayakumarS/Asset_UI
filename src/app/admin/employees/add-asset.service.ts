import { HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpServiceService, } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AddAsset } from './addAsset-model'; 
import { main } from '../dashboard/main-model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddAssetService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  // currencyList:[];
  dataChange: BehaviorSubject<AddAsset[]> = new BehaviorSubject<AddAsset[]>(
    []
  );

  constructor( private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  dialogData: any;
  
  private saveAsset = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/saveAsset`;
  public addAssetUploadFiles = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/addAssetUpload`;
  public categoryDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getCategoryDropdown`;
  public locationDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getLocationDropdown`;
  public departmentDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getDepartmentDropdown`;
  private saveInventory= `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/saveInventory`;


  get data(): AddAsset[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addAsset(addAsset: AddAsset,router,notificationService): void {
    this.dialogData = addAsset;
    this.httpService.post<AddAsset>(this.saveAsset, addAsset).subscribe(data => {
      console.log(data);
      

      if(data.Success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/admin/dashboard/listasset']);
      }
      else if(data.Success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated Successfully...!!!",
          "bottom",
          "center"
        );
        }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  addInventory(Main: main,router,notificationService): void {
    this.dialogData = Main;
    this.httpService.post<main>(this.saveInventory, Main).subscribe(data => {
      console.log(data);
      

      if(data.Success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/admin/dashboard/listasset']);
      }
      else if(data.Success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated Successfully...!!!",
          "bottom",
          "center"
        );
        }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  

  
}

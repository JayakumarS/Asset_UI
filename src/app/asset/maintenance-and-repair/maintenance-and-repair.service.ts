import { Injectable } from '@angular/core';
import { MaintenanceAndReport } from './maintenance-and-repair-model'; 

import { BehaviorSubject,Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MaintenanceAndRepairResultBean } from './maintenance-and-repair-result-bean';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MaintenanceAndRepairService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<MaintenanceAndReport[]> = new BehaviorSubject<MaintenanceAndReport[]>(
    []
  );

 // Temporarily stores data from dialogs
 dialogData: any;
 maintenanceAndReport : MaintenanceAndReport;
 constructor(private httpClient: HttpClient, private serverUrl: serverLocations, 
   private httpService: HttpServiceService) { 
     super();
  }
   
   private saveMaintenanceAndRepair = `${this.serverUrl.apiServerAddress}app/maintenanceAndRepair/save`;
   public assetListUrl = `${this.serverUrl.apiServerAddress}app/maintenanceAndRepair/getAssetlist`;
   public getAllMasters = `${this.serverUrl.apiServerAddress}app/maintenanceAndRepair/getlist`;

   get data(): MaintenanceAndReport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  addMaintenanceAndRepair(maintenanceAndReport: MaintenanceAndReport,router,notificationService): void {
  this.dialogData = maintenanceAndReport;  
  this.httpService.post<MaintenanceAndReport>(this.saveMaintenanceAndRepair, maintenanceAndReport).subscribe(data => {
    console.log(data);
      if(data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/asset/maintenanceAndReport/listMaintenanceAndReport']);
      }
      else if(data.success===false){
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

  getAllList():void {
    this.subs.sink = this.httpService.get<MaintenanceAndRepairResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.getMaintenanceAndRepairList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

}

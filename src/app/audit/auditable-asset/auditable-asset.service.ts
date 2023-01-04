import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service'
import { AuditableAsset } from './auditable-asset-model'; 
import { AuditableAssetResultBean } from './auditable-asset-result-bean'; 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuditableAssetService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: AuditableAsset;
  dataChange: BehaviorSubject<AuditableAsset[]> = new BehaviorSubject<AuditableAsset[]>(
    []
  );
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private getScheduleActivity = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getList`;
  public saveschedule = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/save`;
  public locationserviceUrl= `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/getlocationList`;
  public activityserviceurl= `${this.serverUrl.apiServerAddress}api/auth/app/activitymaster/getactivityList`;
  public editScheduleMaster= `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/edit`;
  public updateSchedule =  `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/update`;
  public deleteschedule = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/delete`;
  get data(): AuditableAsset[] {
    return this.dataChange.value;
  }

  addScheduleActivity(scheduleActivityMaster: AuditableAsset): void{

  }

  getAllList(){

    this.subs.sink = this.httpService.get<AuditableAssetResultBean>(this.getScheduleActivity).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.auditableAssetDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  
  addSchedule(addaudit:AuditableAsset): void {
    this.dialogData = addaudit;  
    this.httpService.post<AuditableAsset>(this.saveschedule,addaudit ).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  scheduleDelete(scheduleid: any): void {
    this.httpService.get(this.deleteschedule + "?scheduleid=" + scheduleid).subscribe(data => {
      console.log(scheduleid);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  scheduleUpdate(scheduleActivityMaster: AuditableAsset,router,notificationService): void {
    this.dialogData = scheduleActivityMaster;
    this.httpService.post<AuditableAsset>(this.updateSchedule, scheduleActivityMaster).subscribe(data => {
      console.log(data);
      if(data.success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/operations/workOrder/listWorkOrder']);
      }
      else if(data.success == false){
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

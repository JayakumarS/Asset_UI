import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service'
import { ScheduleActivityMaster } from './schedule-acvtivity.model';
import { ScheduleResultBean } from './schedule-activity-resultbean';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleActivityService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: ScheduleActivityMaster;
  dataChange: BehaviorSubject<ScheduleActivityMaster[]> = new BehaviorSubject<ScheduleActivityMaster[]>(
    []
  );
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private getScheduleActivity = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/getList`;
  public saveschedule = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/save`;
  public locationserviceUrl= `${this.serverUrl.apiServerAddress}app/locationMaster/getlocationList`;
  public activityserviceurl= `${this.serverUrl.apiServerAddress}app/activitymaster/getactivityList`;
  public editScheduleMaster= `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/edit`;
  public updateSchedule =  `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/update`;
  public deleteschedule = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/delete`;
  get data(): ScheduleActivityMaster[] {
    return this.dataChange.value;
  }

  addScheduleActivity(scheduleActivityMaster: ScheduleActivityMaster): void{

  }

  getAllList(){

    this.subs.sink = this.httpService.get<ScheduleResultBean>(this.getScheduleActivity).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.scheduleMasterDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  
  addSchedule(addaudit:ScheduleActivityMaster): void {
    this.dialogData = addaudit;  
    this.httpService.post<ScheduleActivityMaster>(this.saveschedule,addaudit ).subscribe(data => {
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

  scheduleUpdate(scheduleActivityMaster: ScheduleActivityMaster,router,notificationService): void {
    this.dialogData = scheduleActivityMaster;
    this.httpService.post<ScheduleActivityMaster>(this.updateSchedule, scheduleActivityMaster).subscribe(data => {
      console.log(data);
      if(data.Success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/operations/workOrder/listWorkOrder']);
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

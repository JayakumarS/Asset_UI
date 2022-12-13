import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service'
import { ScheduleActivityMaster } from './schedule-acvtivity.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleActivityService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  // dataChange: BehaviorSubject<LocationMaster[]> = new BehaviorSubject<LocationMaster[]>(
  //   []
  // );
  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private getScheduleActivity = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/getList`;
  public saveschedule = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/getList`;
  

  addScheduleActivity(scheduleActivityMaster: ScheduleActivityMaster): void{

  }
  

}

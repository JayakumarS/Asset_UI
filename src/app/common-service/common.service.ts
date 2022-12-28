import { Injectable } from '@angular/core';
import * as moment from "moment";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommonService extends UnsubscribeOnDestroyAdapter {

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  getDate(date): any {
    return moment(date).format('MM/DD/YYYY');
  }

  getMonthYear(date): any {
    return moment(date).format('MM/YYYY');
  }


  public getCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCategoryDropdown`;

  public getLocationDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationDropdown`;

  public getDepartmentDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getDepartmentDropdown`;
  
  public activityserviceurl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/activityserviceurl`;
 
  public getactivityList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getactivityList`;
  
}

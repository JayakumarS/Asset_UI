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

  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

  public getAssetCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAssetCategoryDropdown`;

  public getLocationDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationDropdown`;

  public getDepartmentDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getDepartmentDropdown`;
  
  public activityserviceurl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/activityserviceurl`;
 
  public getactivityList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getactivityList`;
  
  public getVendorDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getVendorDropdown`;

  public getParentCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getParentCategoryDropdown`;

  public getCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCategoryDropdown`;

  public getCommonDropdownByformId = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCommonDropdownByformId`;

  public getUOMDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUOMDropdown`;

  public getItemMasterDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemMasterDropdown`;

  public getCurrencyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCurrencyDropdown`;

  public getCountryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCountryDropdown`;

}

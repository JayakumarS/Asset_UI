import { Injectable } from '@angular/core';
import * as moment from "moment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommonService extends UnsubscribeOnDestroyAdapter {

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  getDate(date): any {
    return moment(date).format('DD/MM/YYYY');
  }

  getDateObj(string): any {
    return moment(string, 'DD/MM/YYYY')
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

  // public getCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCategoryDropdown`;

  public getCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAssetCategoryDropdown`;

  public getCommonDropdownByformId = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCommonDropdownByformId`;

  public getUOMDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUOMDropdown`;

  public getCurrencyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCurrencyDropdown`;

  public getCountryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCountryDropdown`;

  public getassetname = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getassetname`;

  public getuserlocation = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAdminDropdown`;

  public commonUploadFile = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/commonUploadFile`;

  public commonViewDocument = `${this.serverUrl.apiServerAddress}api/auth/app/commonViewDocument/view_document`;

  public getPurchaseOrderNumberDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPurchaseOrderNumberDropdown`;

  public getPurchaseInvoiceNumberDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPurchaseInvoiceNumberDropdown`;

  public getItemNameDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemMasterDropdown`;

  public getAdminDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAdminDropdown`;


  public getPurchaseTaxDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPurchaseTaxDropdown`;

  public getSalesTaxDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getSalesTaxDropdown`;

  public getExpenseAccountHeadDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getExpenseAccountHeadDropdown`;

  public getIncomeAccountHeadDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getIncomeAccountHeadDropdown`;

  public getItempropertiesDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItempropertiesDropdown`;

  public getItemCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemCategoryDropdown`;

  public getItemMasterDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemMasterDropdown`;

  public getuserCategoryName = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUomCategoryName`;

  public getEmployeeDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getEmployeeDropdown`;

  public getCompanyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyDropdown`;

  public getStateDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getStateDropdown`;

  public getCityDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCityDropdown`;

  public getAuditorDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAuditorDropdown`;

  public getCompanyStringDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyStringDropdown`;

  public getRequisitionList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getRequisitionList`;

  public getVendorAddressDetails = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getVendorAddressDetails`;


  //FOR DOCUMENT VIEW ADDED BY GOKUL
  viewDocument(filePath: any): Observable<Blob> {
    var authorization = 'Bearer ' + sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": authorization, responseType: 'blob'
    });

    return this.httpClient.post<Blob>(this.commonViewDocument, filePath, {
      headers: headers, responseType:
        'blob' as 'json'
    });
  }

}

import { Injectable } from '@angular/core';
import * as moment from "moment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommonService extends UnsubscribeOnDestroyAdapter {

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private snackBar: MatSnackBar) {
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

  public getAssetCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAssetCategoryDropdown`;

  public getLocationDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationDropdown`;

  public getMoveToDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationDropdownByCompany`;

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

  public getassetnameAudit = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getassetnameAudit`;

  public getuserlocation = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAdminDropdown`;

  public commonUploadFile = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/commonUploadFile`;

  public commonViewDocument = `${this.serverUrl.apiServerAddress}api/auth/app/commonViewDocument/view_document`;

  public getPurchaseOrderNumberDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPurchaseOrderNumberDropdown`;

  public getPurchaseInvoiceNumberDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPurchaseInvoiceNumberDropdown`;

  public getGRNNumberDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getGRNNumberDropdown`;

  public getItemNameDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemMasterDropdown`;

  public getAdminDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAdminDropdown`;

  // public getpersoninchargeDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getpersoninchargeDropdown`;

  public getUserBasedAuditList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUserBasedAuditList`;

  public getPercentageList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPercentageList`;

  public getPurchaseTaxDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPurchaseTaxDropdown`;

  public getSalesTaxDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getSalesTaxDropdown`;

  public getExpenseAccountHeadDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getExpenseAccountHeadDropdown`;

  public getIncomeAccountHeadDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getIncomeAccountHeadDropdown`;

  public getItempropertiesDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItempropertiesDropdown`;

  public getItemCategoryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemCategoryDropdown`;

  public getItemMasterDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemMasterDropdown`;

  public getItemMasterNameWithItemCodeDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getItemMasterNameWithItemCodeDropdown`;

  public getuserCategoryName = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUomCategoryName`;

  public getEmployeeDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getEmployeeDropdownByCompany`;

  public getAssetUserDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAssetUserDropdown`;

  public getCompanyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyDropdown`;

  public getCompanybasedlocationDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationBasedCompanyDropdown`;

  public getBranchDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getBranchDropdown`;

  public getStateDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getStateDropdown`;

  public getCityDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCityDropdown`;

  public getCityShipperDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCityDropdown`;

  public getCityDeliveryDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCityDropdown`;

  public getCityBillingDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCityDropdown`;

  public getAuditorDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAuditorDropdown`;

  public getCompanyStringDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyStringDropdown`;

  public getRequisitionList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getRequisitionList`;

  public getVendorAddressDetails = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getVendorAddressDetails`;

  public getCompanyByUser = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyByUser`;

  public getCompanyDetailDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyDetailDropdown`;

  public getRoleDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getRoleDropdown`;
;

  public getAllPagePermissionList = `${this.serverUrl.apiServerAddress}api/auth/app/roleRights/getAllPagePermissionList`;

  public getUserDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUserDropdown`;

  public getEmployeeDropdownByCompany = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getEmployeeDropdownByCompany`;

  public getAssetUserList = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getAssetUserDropdownByCompany`;

  public getUserBasedCompanyDropdown= `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUserBasedCompanyDropdown`;

  public getcompanyDropdown= `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyDropdown`;

  public getLocationDropdownByCompany = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationDropdownByCompany`;

  public getcompanybaseduser = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getcompanybaseduser`;

  public getdepreciationdropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getdepreciationdropdown`;

  public getassetcategorydropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getassetcategorydropdown`;

  //public getcompanybasedLocationHeadDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getLocationDropdownByCompany`;

  public getBranchByCompany = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getCompanyBasedBranchDropdown`;

  public getUserBasedCompany = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getUserBasedCompany`;

  public imageList = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/nonImageList`;

  public getPwdStatus = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/getPwdStatus`;

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

  // based on role and form code page permission list - Added by Gokul
  getAllPagePermission(obj: any): Observable<any> {
    return  this.httpClient.post<any>(this.getAllPagePermissionList, obj);
  }

  public validateOldPasswordUrl = `${this.serverUrl.apiServerAddress}app/userMaster/oldPasswordValidation`;
  public updateChangePasswordUrl = `${this.serverUrl.apiServerAddress}app/userMaster/updatePassword`;

  public uploadFileUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/uploadFile`;


}

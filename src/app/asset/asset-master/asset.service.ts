import { AssetMaster } from './asset-model';
import { AssetMasterResultBean } from './asset-result-bean';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AssetReplacement } from '../asset-replacement/asset-replacement.model';
import { AssetReplacementResultBean } from '../asset-replacement/asset-replacement-result-bean';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AssetService extends UnsubscribeOnDestroyAdapter {
 

  isTblLoading = true;
  dataChange: BehaviorSubject<AssetMaster[]> = new BehaviorSubject<AssetMaster[]>(
    []
  );

  dataChange1: BehaviorSubject<AssetReplacement[]> = new BehaviorSubject<AssetReplacement[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  companyId: string;
  branchId: string;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService,
   ) {
    super();
  }

  private getAllAssets = `${this.serverUrl.apiServerAddress}app/assetMaster/getAssetList`;
  private updateAsset = `${this.serverUrl.apiServerAddress}app/assetMaster/update`;
  public editAssetMaster = `${this.serverUrl.apiServerAddress}app/assetMaster/edit`;
  public viewAssetMaster = `${this.serverUrl.apiServerAddress}app/assetMaster/view`;
  public deleteAssetMaster = `${this.serverUrl.apiServerAddress}app/assetMaster/delete`;
  public getAssetDetails = `${this.serverUrl.apiServerAddress}app/assetMaster/getAssetDetails`;
  public getAssetList = `${this.serverUrl.apiServerAddress}app/assetMaster/getAssetListFor`;
  public getAssetDetailsReplacement = `${this.serverUrl.apiServerAddress}app/assetMaster/getAssetDetailsReplacement`;

  //new
  public addAssetImageUploadFiles = `${this.serverUrl.apiServerAddress}app/assetMaster/addAssetImageUpload`;
  public addAssetUploadFiles = `${this.serverUrl.apiServerAddress}app/assetMaster/addAssetUpload`;
  public multipleAssetUploadFiles = `${this.serverUrl.apiServerAddress}app/assetMaster/multipleAssetuploadExefile`;
  public categoryDropdownList = `${this.serverUrl.apiServerAddress}app/assetMaster/getCategoryDropdown`;
  public locationDropdownList = `${this.serverUrl.apiServerAddress}app/addAsset/getLocationDropdown`;
  public departmentDropdownList = `${this.serverUrl.apiServerAddress}app/addAsset/getDepartmentDropdown`;
  public commoditylist = `${this.serverUrl.apiServerAddress}app/countryMaster/getCategoryList`;
  public saveQuantityBasedMutipleAsset = `${this.serverUrl.apiServerAddress}app/assetMaster/saveQuantityBasedMutipleAsset`;
  public exportPdfBulkAssetQRcode = `${this.serverUrl.apiServerAddress}app/assetMaster/exportPdf_BulkAssetQRcode`;
  public getCompanyBasedCurrency = `${this.serverUrl.apiServerAddress}app/salesOrder/getCompanyBasedCurrency`;


  private getAllAssetsReplacement = `${this.serverUrl.apiServerAddress}app/assetReplacement/getAssetReplacementList`;

  get data(): AssetMaster[] {
    return this.dataChange.value;
  }

  get data1(): AssetReplacement[] {
    return this.dataChange1.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    console.log();
    this.companyId=this.tokenStorage.getCompanyId();
    this.branchId= this.tokenStorage.getBranchId(),

    this.subs.sink = this.httpService.get<AssetMasterResultBean>(this.getAllAssets+"?companyId="+this.companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.assetList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }


   /** CRUD METHODS */
   getAllReplacementCustomers(): void {

    this.subs.sink = this.httpService.get<AssetMasterResultBean>(this.getAllAssetsReplacement).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.assetReplacementList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
 
  }


  editAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editAssetMaster, obj);
  }

 viewAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.viewAssetMaster, obj);
  }

  deleteAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteAssetMaster, obj);
  }
 
  updateAssetMaster(assetMaster: AssetMaster): Observable<any> {
    return this.httpClient.post<AssetMaster>(this.updateAsset, assetMaster);
  }

  addQuantityBasedMutipleAsset(assetMaster: AssetMaster): Observable<any> {
    return this.httpClient.post<AssetMaster>(this.saveQuantityBasedMutipleAsset, assetMaster);
  }

  //FOR QR CODE PDF ADDED BY Gokul
  assetQRcodeExportPdf(obj: any): Observable<Blob> {
    var authorization = 'Bearer ' + sessionStorage.getItem("access_token");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": authorization, responseType: 'blob'
    });

    return this.httpClient.post<Blob>(this.exportPdfBulkAssetQRcode, obj, {
      headers: headers, responseType:
        'blob' as 'json'
    });
  }

}

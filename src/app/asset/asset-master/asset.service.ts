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
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService) {
    super();
  }

  private getAllAssets = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/getAssetList`;
  private saveAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/saveAsset`;
  private updateAsset = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/update`;
  public editAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/edit`;
  public deleteAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/delete`;
  public getAssetDetails = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/getAssetDetails`;
  public getAssetList = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/getAssetListFor`;

  

  //new
  
  public addAssetImageUploadFiles = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/addAssetImageUpload`;
  public addAssetUploadFiles = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/addAssetUpload`;

  public multipleAssetUploadFiles = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/multipleAssetuploadExefile`;
  public categoryDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/getCategoryDropdown`;
  public locationDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getLocationDropdown`;
  public departmentDropdownList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getDepartmentDropdown`;
  public commoditylist = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCategoryList`;

  get data(): AssetMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCustomers(): void {
    this.subs.sink = this.httpService.get<AssetMasterResultBean>(this.getAllAssets).subscribe(
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

  

  multipleAssetUpload(assetMaster: AssetMaster): void {
    this.dialogData = assetMaster;
    this.httpService.post<AssetMaster>(this.saveAssetMaster, assetMaster).subscribe(data => {
      console.log(data);
      
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  editAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editAssetMaster, obj);
  }

  deleteAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteAssetMaster, obj);
  }

  addAssetMaster(AssetMaster: AssetMaster): Observable<any> {
    return this.httpClient.post<AssetMaster>(this.saveAssetMaster, AssetMaster);
  }

  updateAssetMaster(AssetMaster: AssetMaster): Observable<any> {
    return this.httpClient.post<AssetMaster>(this.updateAsset, AssetMaster);
  }
 
}

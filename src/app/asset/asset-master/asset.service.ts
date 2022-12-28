import { AssetMaster } from './asset-model';
import { AssetMasterResultBean } from './asset-result-bean';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

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
  private saveAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/save`;
  public editAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/edit`;
  public updateAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/update`;
  public deleteAssetMaster = `${this.serverUrl.apiServerAddress}api/auth/app/assetMaster/delete`;

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

  addAssetMaster(assetMaster: AssetMaster): Observable<any> {
    return this.httpClient.post<AssetMaster>(this.saveAssetMaster, assetMaster);
  }

  editAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editAssetMaster, obj);
  }

  assetMasterUpdate(assetMaster: AssetMaster): Observable<any> {
    return this.httpClient.post<AssetMaster>(this.updateAssetMaster, assetMaster);
  }

  deleteAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteAssetMaster, obj);
  }

}

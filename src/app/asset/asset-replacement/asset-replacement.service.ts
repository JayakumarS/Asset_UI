import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject,Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AssetMasterResultBean } from "../asset-master/asset-result-bean";
import { AssetReplacementResultBean } from "./asset-replacement-result-bean";
import { AssetReplacement } from "./asset-replacement.model";

@Injectable({
  providedIn: 'root'
})
export class AssetReplacementService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: AssetReplacement;
  dataChange: BehaviorSubject<AssetReplacement[]> = new BehaviorSubject<AssetReplacement[]>(
    []
  );
  companyId: string;
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,  private httpService: HttpServiceService,    private token: TokenStorageService) {
    super();
  }
  

  //asset replacement
  private SaveAssetReplacement = `${this.serverUrl.apiServerAddress}app/assetReplacement/saveAssetReplacement`;
  private UpdateAssetReplacement = `${this.serverUrl.apiServerAddress}app/assetReplacement/updateAssetReplacement`;

 
  
  get data(): AssetReplacement[] {
    return this.dataChange.value;
  }

  addScheduleActivity(scheduleActivityMaster: AssetReplacement): void{

  }

 
  

  addAssetReplacement(assetReplacement: AssetReplacement): Observable<any> {
    return this.httpClient.post<AssetReplacement>(this.SaveAssetReplacement, assetReplacement);
  }

  
  updateAssetReplacement(assetReplacement: AssetReplacement): Observable<any> {
    return this.httpClient.post<AssetReplacement>(this.UpdateAssetReplacement, assetReplacement);
  }
}
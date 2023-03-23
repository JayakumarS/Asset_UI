import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AssetPrintReport } from "./asset-QRprint-model";
import { AssetResultBean } from "./asset-QRprint-result-bean";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
  export class AssetPrintService extends UnsubscribeOnDestroyAdapter {
    isTblLoading = true;
  
    dataChange: BehaviorSubject<AssetPrintReport[]> = new BehaviorSubject<AssetPrintReport[]>(
      []
    );
    companyId: string;
    dialogData: any;
 
  
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,  public tokenStorage: TokenStorageService
      ) {
      super();
  
      }
      
      public getAllAssets = `${this.serverUrl.apiServerAddress}app/assetMaster/getassetprintList`;
    
      get data(): AssetPrintReport[] {
        return this.dataChange.value;
      }
    
   
      getDialogData() {
        return this.dialogData;
      }

    assetListUrl(object): void {
      console.log(object);
      this.subs.sink = this.httpService.post<any>(this.getAllAssets,object).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.assetprintlist);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  
    }
    }
    
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
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
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private token: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }
  
  public listUrl = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/list`;
  public saveUrl = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/save`;
  public editUrl = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/edit`;
  public updateUrl = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/update`;
  public assetListUrl = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/assetItemList`;
  public assetQuantityUrl =  `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/assetItemList`;
  public assetTrackListUrl = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/assetTrackDetails`;
  public assetTrackListUrlNew = `${this.serverUrl.apiServerAddress}app/asset/assetRequisition/assetTrackDetailsNew`;
  get data(): AssetReplacement[] {
    return this.dataChange.value;
  }

  addScheduleActivity(scheduleActivityMaster: AssetReplacement): void{

  }

  getAllList(){
    console.log();
    this.companyId=this.token.getCompanyId();
    this.subs.sink = this.httpService.get<any>(this.listUrl+"?companyId="+this.companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.assetRequisitionDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  save(assetRequisition:AssetReplacement,router,notificationService): void {
    this.dialogData = assetRequisition;  
    this.httpService.post<any>(this.saveUrl,assetRequisition ).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/asset/assetRequisition/listAssetRequisition']);
      }
      else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  update(assetRequisition:AssetReplacement,router,notificationService): void {
    this.dialogData = assetRequisition;  
    this.httpService.post<any>(this.updateUrl,assetRequisition ).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/asset/assetRequisition/listAssetRequisition']);
      }
      else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  
}
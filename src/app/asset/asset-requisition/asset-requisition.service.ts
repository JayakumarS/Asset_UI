import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AssetRequisition } from "./asset-requisition.model";

@Injectable({
  providedIn: 'root'
})
export class AssetRequisitionService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: AssetRequisition;
  dataChange: BehaviorSubject<AssetRequisition[]> = new BehaviorSubject<AssetRequisition[]>(
    []
  );
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  
  private listUrl = `${this.serverUrl.apiServerAddress}api/auth/app/asset/assetRequisition/list`;
  public saveUrl = `${this.serverUrl.apiServerAddress}api/auth/app/asset/assetRequisition/save`;
  public editUrl = `${this.serverUrl.apiServerAddress}api/auth/app/asset/assetRequisition/edit`;
  public assetListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/asset/assetRequisition/assetItemList`;
  public assetQuantityUrl =  `${this.serverUrl.apiServerAddress}api/auth/app/asset/assetRequisition/assetItemList`;
  public assetTrackListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/asset/assetRequisition/assetTrackDetails`;

  get data(): AssetRequisition[] {
    return this.dataChange.value;
  }

  addScheduleActivity(scheduleActivityMaster: AssetRequisition): void{

  }

  getAllList(object){
    console.log(object);
    this.subs.sink = this.httpService.post<any>(this.listUrl,object).subscribe(
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

  save(assetRequisition:AssetRequisition,router,notificationService): void {
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

  
}
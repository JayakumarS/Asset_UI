import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service'
import { AuditableAsset } from './auditable-asset-model'; 
import { AuditableAssetResultBean } from './auditable-asset-result-bean'; 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuditableAssetService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: AuditableAsset;
  dataChange: BehaviorSubject<AuditableAsset[]> = new BehaviorSubject<AuditableAsset[]>(
    []
  );
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  
  private getScheduleActivity = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getList`;
  public assetListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getAssetList`;
  public fetchAssetNameUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getfetchAssetName`;
  public assetTypeListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getassetTypeList`;
  public depreciationMethodUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getdepreciationMethodList`;
  public saveAuditableAsset = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/save`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getCurrencyList`;
  public assetPopUpUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getAssetDetailsForPopUp`;
  public financialChangeUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getfinancialChangeDetails`;
  public editAuditableAsset = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/edit`;
  public updateauditable = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/update`;
  public validateAssetIdUrl = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/validateAssetId`;
  public deleteschedule = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/delete`;
  get data(): AuditableAsset[] {
    return this.dataChange.value;
  }

  addScheduleActivity(scheduleActivityMaster: AuditableAsset): void{

  }

  getAllList(object){
    console.log(object);
    this.subs.sink = this.httpService.post<AuditableAssetResultBean>(this.getScheduleActivity,object).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.auditableAssetDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  addAuditableAsset(auditableAsset:AuditableAsset,router,notificationService): void {
    this.dialogData = auditableAsset;  
    this.httpService.post<AuditableAsset>(this.saveAuditableAsset,auditableAsset ).subscribe(data => {
      console.log(data);
      if(data.success===true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/audit/auditableAsset/listAuditableAsset']);
      }
      else if(data.success===false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated Successfully...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  scheduleDelete(scheduleid: any): void {
    this.httpService.get(this.deleteschedule + "?scheduleid=" + scheduleid).subscribe(data => {
      console.log(scheduleid);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  auditableUpdate(scheduleActivityMaster: AuditableAsset,router,notificationService): void {
    this.dialogData = scheduleActivityMaster;
    this.httpService.post<AuditableAsset>(this.updateauditable, scheduleActivityMaster).subscribe(data => {
      console.log(data);
      if(data.success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/audit/auditableAsset/listAuditableAsset']);
      }
      else if(data.success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated Successfully...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
  }

}

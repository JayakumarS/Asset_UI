import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { BackupLocationResultBean } from './backup-location-result-bean';
import { BackupLocation } from './backup-location.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackupLocationService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<BackupLocation[]> = new BehaviorSubject<BackupLocation[]>(
    []
  );

  dialogData: any;
  backupLocation: BackupLocation;

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) { 
    super();
  }

  public getbackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/get`;
  public savebackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/add`;
  public editbackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/edit`;
  public viewbackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/view`;
  public deletebackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/delete`;
  public updatebackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/update`;
  public Assetbackuplocation = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/getRegisterList`;
  public sampleexportExcel = `${this.serverUrl.apiServerAddress}api/auth/app/assertbackupLocation/exportExcel`;

  get data(): BackupLocation[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllList(): void {
    let companyId=this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<BackupLocationResultBean>(this.getbackuplocation).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.sampleDtl);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  exportExcel(): void {
    let companyId=this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<BackupLocationResultBean>(this.sampleexportExcel).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.sampleDtl);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    )
  }

  // exportExcel(): Observable<any> {
  //   return this.httpClient.get(this.sampleexportExcel); // Default responseType is JSON
  // }

  // For Save
  addBackupLocation(backuplocation,router,notificationService): void {
    this.dialogData = backuplocation;  
    this.httpService.post<any>(this.savebackuplocation, backuplocation).subscribe(data => {
    console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/backup-location/list-backup-location']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not ADDED, "+data.message,
          "bottom",
          "center"
        );
      }
    },
      (err: HttpErrorResponse) => {
        
    });
  }

  backupLocationUpdate(backuplocation,router,notificationService): void {
    this.dialogData = backuplocation;
    this.httpService.post<any>(this.updatebackuplocation, backuplocation).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/backup-location/list-backup-location']);
      }else{
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
    
  }

  getBackupLocation(backuplocation: any): Observable<any> {
    return this.httpClient.post<any>(this.Assetbackuplocation, backuplocation);
  }



  deleteBackupLocationList(locationID: any): Observable<any>  {

    return  this.httpClient.get<any>(this.deletebackuplocation+"?location_id="+locationID);

  };

  editBackupLocation(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editbackuplocation, obj);
  };
  
}

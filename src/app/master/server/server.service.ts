import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ServerResultBean } from './server-result-bean';
import { Assetserver } from './server.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServerService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<Assetserver[]> = new BehaviorSubject<Assetserver[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  assertServer:Assetserver;

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) {
    super();
   }

   public getserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/getServer`;
   public saveserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/addServer`;
   public editserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/editServer`;
   public viewserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/view`;
   public deleteserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/delete`;
   public updateserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/update`;
   public Assetserver = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/getRegisterList`;
   public sampleexportExcel = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/exportExcel`;
   public sampleexportPdf = `${this.serverUrl.apiServerAddress}api/auth/app/assertServer/exportPdf`;
   get data(): Assetserver[] {
    return this.dataChange.value;
   }

  //  editserver(obj: any): Observable<any> {
  //   return this.httpClient.post<any>(this.edit, obj);
  //  }

   getDialogData() {
    return this.dialogData;
  }

      /** CRUD METHODS */
      getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
          this.subs.sink = this.httpService.get<ServerResultBean>(this.getserver).subscribe(
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

  // For Save
  addserver(assetserver,router,notificationService): void {
    this.dialogData = assetserver;  
    this.httpService.post<any>(this.saveserver, assetserver).subscribe(data => {
    console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/server/list-server']);
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

  serverUpdate(assetserver,router,notificationService): void {
    this.dialogData = assetserver;
    this.httpService.post<any>(this.updateserver, assetserver).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/server/list-server']);
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

  getAssetserver(assetserver: any): Observable<any> {
    return this.httpClient.post<any>(this.Assetserver, assetserver);
  }

  // deleteServerList(id: any): Observable<any> {
  //   return this.httpClient.post<any>(this.deleteserver,id);
  // }

  
  deleteServerList(serverId: any): Observable<any>  {

    return  this.httpClient.get<any>(this.deleteserver+"?server_id="+serverId);

  };

  editServer(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editserver, obj);
  };


}

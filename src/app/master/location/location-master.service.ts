import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { LocationMaster } from './location-master.model';
import { LocationMasterResultBean } from './location-master-result-bean';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList: [];
  dataChange: BehaviorSubject<LocationMaster[]> = new BehaviorSubject<LocationMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,public tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/locationMaster/getList`;
  private saveLocation = `${this.serverUrl.apiServerAddress}app/locationMaster/save`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}app/locationMaster/getCurrencyList`;
  public deleteLocation = `${this.serverUrl.apiServerAddress}app/locationMaster/delete`;
   public editLocation = `${this.serverUrl.apiServerAddress}app/locationMaster/edit`;
  public updateLocation = `${this.serverUrl.apiServerAddress}app/locationMaster/update`;
  public companyadList = `${this.serverUrl.apiServerAddress}app/locationMaster/companyadList`;
  public multipleLocationUploadFiles = `${this.serverUrl.apiServerAddress}app/locationMaster/multipleuploadExefile`;
  public saveMultiple = `${this.serverUrl.apiServerAddress}app/locationMaster/multipleSave`;

  get data(): LocationMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  // CRUD METHODS
  getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<LocationMasterResultBean>(this.getAllMasters+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.locationMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
// tslint:disable-next-line:no-shadowed-variable
addLocation(locationMaster: LocationMaster): Observable<any> {
  return this.httpClient.post<LocationMaster>(this.saveLocation, locationMaster);
}

  getCurrencyList() {

    this.httpService.get<LocationMasterResultBean>(this.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.currencyList;
      },
      (error: HttpErrorResponse) => {

        console.log(error.name + " " + error.message);
      }
    );
    return this.currencyList;
  }
  editLoction(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editLocation, obj);
  }


  update(locationMaster: LocationMaster): Observable<any> {
    return this.httpClient.post<LocationMaster>(this.updateLocation, locationMaster);
  }
  delete(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteLocation, obj);
 }

 addMultiple(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.saveMultiple, obj);
}

}

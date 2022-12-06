import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { LocationMaster } from './location-master.model';
import { LocationMasterResultBean } from './location-master-result-bean';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<LocationMaster[]> = new BehaviorSubject<LocationMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/getList`;
  private saveLocation = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/save`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/getCurrencyList`;
  public deleteLocation = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/delete`;
   public editLocation = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/edit`;
  public updateLocation = `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/update`;
  get data(): LocationMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  // CRUD METHODS 
  getAllList(): void {
        this.subs.sink = this.httpService.get<LocationMasterResultBean>(this.getAllMasters).subscribe(
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
  addLocation(locationMaster: LocationMaster): void {
    this.dialogData = locationMaster;
      
    
    
    this.httpService.post<LocationMaster>(this.saveLocation, locationMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
  locationUpdate(locationMaster: LocationMaster): void {
    this.dialogData = locationMaster;
    this.httpService.post<LocationMaster>(this.updateLocation, locationMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  locationDelete(cslLocationCode: any): void {
    this.httpService.get(this.deleteLocation + "?cslLocationCode=" + cslLocationCode).subscribe(data => {
      console.log(cslLocationCode);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
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

 
}

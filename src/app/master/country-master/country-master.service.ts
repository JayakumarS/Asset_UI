import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CountryMaster } from "./country-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CountryMasterResultBean } from './country-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountryMasterService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  currencyList:[];
  dataChange: BehaviorSubject<CountryMaster[]> = new BehaviorSubject<CountryMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getList`;
  private saveCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/save`;
  public deleteCountryUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/delete`;
  public editCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/edit`;
  public updateCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/update`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCurrencyList`;
  public editcountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCode`;

  get data(): CountryMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<CountryMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.countryMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addCountry(countryMaster: CountryMaster): void {
    this.dialogData = countryMaster;
      
    
    
    this.httpService.post<CountryMaster>(this.saveCountryMaster, countryMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  countryUpdate(countryMaster: CountryMaster): void {
    this.dialogData = countryMaster;
    this.httpService.post<CountryMaster>(this.updateCountryMaster, countryMaster).subscribe(data => {
      console.log(data);
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  });
}
  deleteEmployees(countryCode : any): void {
     this.httpService.get(this.deleteCountryUrl+"?countryCode="+countryCode).subscribe(data => {
      console.log(countryCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  getCurrencyList() {
   
    this.httpService.get<CountryMasterResultBean>(this.currencyListUrl).subscribe(
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

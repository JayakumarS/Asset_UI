import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
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
export class CountryMasterService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<CountryMaster[]> = new BehaviorSubject<CountryMaster[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getList`;
  public saveCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/save`;
  public editCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/edit`;
  public updateCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/update`;
  public deleteCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/delete`;
  public validateCountryCodeUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/validateUniqueCountryCode`;
  public validateCountryNameUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/validateUniqueCountryName`;
  

  
  get data(): CountryMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllCountrys(): void {
    this.subs.sink = this.httpService.get<CountryMasterResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.countryMasterList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addCountry(countryMaster: CountryMaster): Observable<any> {
    return this.httpClient.post<CountryMaster>(this.saveCountryMaster, countryMaster);
  }

  editCountry(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editCountryMaster, obj);
  }

  updateCountry(drugInfoMaster: CountryMaster): Observable<any> {
    return this.httpClient.post<CountryMaster>(this.updateCountryMaster, drugInfoMaster);
  }

  deleteCountry(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteCountryMaster, obj);
  }

}

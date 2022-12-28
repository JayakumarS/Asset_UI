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
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
     private httpService: HttpServiceService) {
    super();
  }
  //private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getList`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCategoryList`;
  public getAssetList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getAssetList`;
  public deleteassetUrl = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/delete`;
  public editasset = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/edit`;
 

  private saveCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/save`;
 // private saveAsset = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/saveAsset`;
  public deleteCountryUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/delete`;
  public editCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/editCategoryList`;
  public updateCountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/updateCategory`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCurrencyList`;
  public editcountryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCode`;
  public commoditylist = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCategoryList`;
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

    /** CRUD METHODS */
    getAllAssetList(): void {
      this.subs.sink = this.httpService.get<CountryMasterResultBean>(this.getAssetList).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.assetList);
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
  //addAsset
  // addAsset(countryMaster: CountryMaster): void {
  //   this.dialogData = countryMaster;
  //   this.httpService.post<CountryMaster>(this.saveAsset, countryMaster).subscribe(data => {
  //     console.log(data);
  //     //this.dialogData = employees;
  //     },
  //     (err: HttpErrorResponse) => {
        
  //   });
  // }
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
  deleteEmployees(id : any): void {
     this.httpService.get(this.deleteCountryUrl+"id?="+id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  deleteasset(id: any): void {
    this.httpService.get(this.deleteassetUrl+"?id="+id).subscribe(data => {
     console.log(id);
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

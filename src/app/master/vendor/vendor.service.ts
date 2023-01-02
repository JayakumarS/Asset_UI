// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class VendorService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Commodity } from './vendor-model';
import { CommodityResultBean } from './vendor-result-bean';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VendorService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  currencyList: [];
  dataChange: BehaviorSubject<Commodity[]> = new BehaviorSubject<Commodity[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/getVendorList`;
  private saveCommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/saveVendor`;
  public deleteCommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/deleteVendor`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/getCurrencyList`;
  public editcommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/editVendor`;
  public updatecommodity = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/updateVendor`;
  public countryListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/getCountryList`;

  
  
  get data(): Commodity[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    this.subs.sink = this.httpService.get<CommodityResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.vonderDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addCommodity(commodity: Commodity): void {
    this.dialogData = commodity;



    this.httpService.post<Commodity>(this.saveCommodity, commodity).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
    },
      (err: HttpErrorResponse) => {

      });
  }

  updateCommodity(commodity: Commodity): void {
    this.dialogData = commodity;
    this.httpService.post<Commodity>(this.updatecommodity, commodity).subscribe(data => {
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
  // deleteCommodity(vendorId: any): void {
  //   this.httpService.get(this.deleteCommodityUrl + "?vendorId=" + vendorId).subscribe(data => {
  //     console.log(vendorId);
  //   },
  //     (err: HttpErrorResponse) => {
  //       // error code here
  //     }
  //   );
  // }

  getCurrencyList() {

    this.httpService.get<CommodityResultBean>(this.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.currencyList;
      },
      (error: HttpErrorResponse) => {

        console.log(error.name + " " + error.message);
      }
    );
    return this.currencyList;
  }
  editVonder(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editcommodity, obj);
  }

  deleteVonder(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteCommodity, obj);
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Commodity } from './commodity.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CommodityResultBean } from './commodity-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommodityService extends UnsubscribeOnDestroyAdapter {

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
  private getAllCommodity = `${this.serverUrl.apiServerAddress}api/auth/app/commodity/getList`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/getVendorList`;
  private saveCommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/saveVendor`;
  // public deleteCommodityUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commodity/delete`;
  public deleteCommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/deleteVendor`;
  public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commodity/getCurrencyList`;
  // public editcommodity = `${this.serverUrl.apiServerAddress}api/auth/app/commodity/edit`;
  public editcommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/editVendor`;
  // public updatecommodity = `${this.serverUrl.apiServerAddress}api/auth/app/commodity/update`;
  public updatecommodity = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/updateVendor`;
  
  
  
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

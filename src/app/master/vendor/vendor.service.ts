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
  public updatecommodity = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/updateVendor`;
  public countryListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/vendorMaster/getCountryList`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

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
  addCommodity(commodity: Commodity,router,notificationService): void {
    this.dialogData = commodity;
    this.httpService.post<Commodity>(this.saveCommodity, commodity).subscribe(data => {
      console.log(data);
      if(data.success===true){
        if(data.message != null && data.message != ""){
          notificationService.showNotification(
            "snackbar-danger",
            "Email Already Exists!!!",
            "bottom",
            "center"
          );
        }else{
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...",
          "bottom",
          "center"
        );
        router.navigate(['/master/vendor/listVendor']);
        }

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
  updateCommodity(commodityMaster: Commodity): Observable<any> {
    return this.httpClient.post<Commodity>(this.updatecommodity, commodityMaster);
  }
  // updateCommodity(commodity: Commodity,router,notificationService): void {
  //   this.dialogData = commodity;
  //   this.httpService.post<Commodity>(this.updatecommodity, commodity).subscribe(data => {
  //     console.log(data);
  //     if(data.success===true){
  //       if(data.message != null && data.message != ""){
  //         notificationService.showNotification(
  //           "snackbar-danger",
  //           "Email Already Exists!!!",
  //           "bottom",
  //           "center"
  //         );
  //       }else{
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Edit Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //       router.navigate(['/master/vendor/listVendor']);
  //       }

  //     }
  //     else if(data.success===false){
  //       notificationService.showNotification(
  //         "snackbar-danger",
  //         "Not Updated Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }
  //   });
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

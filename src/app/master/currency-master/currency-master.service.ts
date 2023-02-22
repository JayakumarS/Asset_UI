import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { CurrencyMaster } from "./currency-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CurrencyMasterResultBean } from './currency-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CurrencyMasterService extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  dataChange: BehaviorSubject<CurrencyMaster[]> = new BehaviorSubject<CurrencyMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  edit: string;
  update:string;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,public tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/currencyMaster/getList`;
  private saveCurrency = `${this.serverUrl.apiServerAddress}app/currencyMaster/save`;
  public editDepartment = `${this.serverUrl.apiServerAddress}app/currencyMaster/edit`;
  public updateCurrency = `${this.serverUrl.apiServerAddress}app/currencyMaster/update`;
  public deleteCurrency = `${this.serverUrl.apiServerAddress}app/currencyMaster/delete`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

  get data(): CurrencyMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<CurrencyMasterResultBean>(this.getAllMasters+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.currencyMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  editAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editDepartment, obj);
  }
  // tslint:disable-next-line:no-shadowed-variable
  addCurrency(CurrencyMaster: CurrencyMaster): Observable<any> {
    return this.httpClient.post<CurrencyMaster>(this.saveCurrency, CurrencyMaster);
  }

  updateCountry(currencyMaster: CurrencyMaster): Observable<any> {
    return this.httpClient.post<CurrencyMaster>(this.updateCurrency, currencyMaster);
  }
  currencydelete(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteCurrency, obj);
 }

}



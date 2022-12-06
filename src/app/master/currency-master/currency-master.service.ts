import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CurrencyMaster } from "./currency-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CurrencyMasterResultBean } from './currency-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

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
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/currencyMaster/getList`;
  private saveCurrency = `${this.serverUrl.apiServerAddress}api/auth/app/currencyMaster/save`;
   public editDepartment = `${this.serverUrl.apiServerAddress}api/auth/app/currencyMaster/edit`;
  public updateCurrency = `${this.serverUrl.apiServerAddress}api/auth/app/currencyMaster/update`;
  public deleteCurrency = `${this.serverUrl.apiServerAddress}api/auth/app/currencyMaster/delete`;
  get data(): CurrencyMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  
  getAllList(): void {
        this.subs.sink = this.httpService.get<CurrencyMasterResultBean>(this.getAllMasters).subscribe(
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
  addCurrency(CurrencyMaster: CurrencyMaster): void {
    this.dialogData = CurrencyMaster;
      
    
    
    this.httpService.post<CurrencyMaster>(this.saveCurrency, CurrencyMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
 
  currencyUpdate(CurrencyMaster: CurrencyMaster): void {
    this.dialogData = CurrencyMaster;
    this.httpService.post<CurrencyMaster>(this.updateCurrency, CurrencyMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

   currencydelete (currencyCode: any): void {
     this.httpService.get(this.deleteCurrency+"?currencyCode="+currencyCode).subscribe(data => {
       console.log(currencyCode);
       },
       (err: HttpErrorResponse) => {
          // error code here
       }
     );
   
   }
}


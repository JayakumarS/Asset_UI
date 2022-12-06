import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { StockVerification } from './stock-verification-model';
import { StockVerificationResultBean } from './stock-verification-result-bean';

@Injectable({
  providedIn: 'root'
})
export class StockVerificationService extends UnsubscribeOnDestroyAdapter {

  
  isTblLoading = true;
  stockList:[];
  dataChange: BehaviorSubject<StockVerification[]> = new BehaviorSubject<StockVerification[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllInventry = `${this.serverUrl.apiServerAddress}api/auth/app/stockVerification/getList`;
  private saveStock = `${this.serverUrl.apiServerAddress}api/auth/app/stockVerification/save`;
  public editStock = `${this.serverUrl.apiServerAddress}api/auth/app/stockVerification/edit`;
  public updateStock = `${this.serverUrl.apiServerAddress}api/auth/app/stockVerification/update`;
  public deleteStock= `${this.serverUrl.apiServerAddress}api/auth/app/stockVerification/delete`;
  public stockListUrl= `${this.serverUrl.apiServerAddress}api/auth/app/stockVerification/getStockList`;
  
  get data(): StockVerification[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<StockVerificationResultBean>(this.getAllInventry).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.stockVerificationDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  // For Save
  stockSave(stockVerification: StockVerification): void {
    this.dialogData = stockVerification;
    this.httpService.post<StockVerification>(this.saveStock, stockVerification).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  stockUpdate(stockVerification: StockVerification): void {
    this.dialogData = stockVerification;
    this.httpService.post<StockVerification>(this.updateStock, stockVerification).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  stockDelete(deptCode: any): void {
    this.httpService.get(this.deleteStock+"?stockVerification="+deptCode).subscribe(data => {
      console.log(deptCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  getStockList() {
   
    this.httpService.get<StockVerificationResultBean>(this.stockListUrl).subscribe(
      (data) => {
        this.stockList = data.stockList;
      },
      (error: HttpErrorResponse) => {
        
        console.log(error.name + " " + error.message);
      }
    );
    return this.stockList;
  }
 
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { SalesQuote } from "./sales-quote.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { SalesQuoteResultBean } from './sales-quote-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalesQuoteService extends UnsubscribeOnDestroyAdapter{

  
  isTblLoading = true;
  dataChange: BehaviorSubject<SalesQuote[]> = new BehaviorSubject<SalesQuote[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllSalesQuote = `${this.serverUrl.apiServerAddress}api/auth/app/saleQuote/getList`;
  private saveSalesQuote = `${this.serverUrl.apiServerAddress}api/auth/app/saleQuote/save`;
  public editSalesQuote = `${this.serverUrl.apiServerAddress}api/auth/app/saleQuote/edit`;
  public updateSalesQuote = `${this.serverUrl.apiServerAddress}api/auth/app/saleQuote/update`;
  public deleteSalesQuote = `${this.serverUrl.apiServerAddress}api/auth/app/saleQuote/delete`;
  get data(): SalesQuote[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<SalesQuoteResultBean>(this.getAllSalesQuote).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.salesQuoteDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  addSalesQuote(salesQuote: SalesQuote): void {
    this.dialogData = salesQuote;
    this.httpService.post<SalesQuote>(this.saveSalesQuote, salesQuote).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  UpdateSalesQuote(salesQuote: SalesQuote): void {
    this.dialogData = salesQuote;
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  this.httpService.post<SalesQuote>(this.updateSalesQuote, salesQuote).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
  }
  DeleteSalesQuote(countValue:any): void {
    this.httpService.get(this.deleteSalesQuote+"?salesQuote="+countValue).subscribe(data => {
    console.log(countValue);
      // this.httpClient.delete(this.API_URL + id).subscribe(data => {
      // console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}

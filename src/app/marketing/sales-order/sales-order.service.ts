import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { SalesOrder } from "./sales-order.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { SalesOrderResultBean } from './sales-order-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService extends UnsubscribeOnDestroyAdapter{

  
  isTblLoading = true;
  dataChange: BehaviorSubject<SalesOrder[]> = new BehaviorSubject<SalesOrder[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/saleOrder/getList`;
  private saveSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/saleOrder/save`;
  public editSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/saleOrder/edit`;
  public updateSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/saleOrder/update`;
  public deleteSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/saleOrder/delete`;

  get data(): SalesOrder[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<SalesOrderResultBean>(this.getAllSalesOrder).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.salesOrderDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  addSalesOrder(salesOrder: SalesOrder): void {
    this.dialogData = salesOrder;
    this.httpService.post<SalesOrder>(this.saveSalesOrder, salesOrder).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  UpdateSalesOrder(salesOrder: SalesOrder): void {
    this.dialogData = salesOrder;
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  this.httpService.post<SalesOrder>(this.updateSalesOrder, salesOrder).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
  }
  DeleteSalesOrder(countValue:any): void {
    this.httpService.get(this.deleteSalesOrder+"?salesOrder="+countValue).subscribe(data => {
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

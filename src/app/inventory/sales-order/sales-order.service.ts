import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { SalesOrder } from './sales-order-model';
import { SalesOrderResultBean } from './sales-order-result-bean'; 

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;

  dataChange: BehaviorSubject<SalesOrder[]> = new BehaviorSubject<SalesOrder[]>(
    []
  );

  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    public tokenStorage: TokenStorageService,
    private httpService: HttpServiceService)
   { 
    super();
  }
  private saveSalesOrder = `${this.serverUrl.apiServerAddress}app/salesOrder/save`; 
  private getList = `${this.serverUrl.apiServerAddress}app/salesOrder/getList`;
  public editSaleOrder = `${this.serverUrl.apiServerAddress}app/salesOrder/edit`;
  public updateSalesOrder = `${this.serverUrl.apiServerAddress}app/salesOrder/update`;
  public deleteSalesOrder = `${this.serverUrl.apiServerAddress}app/salesOrder/delete`;



  
  get data(): SalesOrder[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllList(): void {
    let companyId = this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<SalesOrderResultBean>(this.getList + "?companyId=" + companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.salesOrderList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  save(salesOrder: SalesOrder): Observable<any> {
    salesOrder.companyId = this.tokenStorage.getCompanyId();
    return this.httpClient.post<SalesOrder>(this.saveSalesOrder, salesOrder);
  }

  editSalesOrder(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editSaleOrder, obj);
  }

  update(salesOrder: SalesOrder): Observable<any> {
    return this.httpClient.post<SalesOrder>(this.updateSalesOrder, salesOrder);
  }

  delete(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteSalesOrder, obj);
  }
  
  }


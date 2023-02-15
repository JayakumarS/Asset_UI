import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { SalesInvoiceResultBean } from './sales-invoice-result-bean';
import { SalesInvoice } from './sales-invoice.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService extends UnsubscribeOnDestroyAdapter{
  dataChange: BehaviorSubject<SalesInvoice[]> = new BehaviorSubject<SalesInvoice[]>(
    []
    );
  isTblLoading: boolean;
  dialogData: any;

  constructor(private httpClient: HttpClient,
              private serverUrl: serverLocations,
              public tokenStorage: TokenStorageService,
              private httpService: HttpServiceService
     ) {
    super();
  }
  private salesInvoice = `${this.serverUrl.apiServerAddress}app/salesInvoice/save`;
  private getSalesList = `${this.serverUrl.apiServerAddress}app/salesInvoice/getList`;
  public deleteSalesInvoice = `${this.serverUrl.apiServerAddress}app/salesInvoice/delete`;
  public editSaleInvoice = `${this.serverUrl.apiServerAddress}app/salesInvoice/edit`;
  public updateSalesInvoice = `${this.serverUrl.apiServerAddress}app/salesInvoice/update`;


  get data(): SalesInvoice[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  AddSalesInvoiceComponent(salesInvoice: SalesInvoice): Observable<any> {
    return this.httpClient.post<SalesInvoice>(this.salesInvoice, salesInvoice);
  }
  getAllList(): void {
    let companyId = this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<SalesInvoiceResultBean>(this.getSalesList + "?companyId=" + companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.salesInvoiceList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}

delete(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.deleteSalesInvoice, obj);
}

editSalesInvoice(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.editSaleInvoice, obj);
}

update(salesInvoice: SalesInvoice): Observable<any> {
  return this.httpClient.post<SalesInvoice>(this.updateSalesInvoice, salesInvoice);
}

}

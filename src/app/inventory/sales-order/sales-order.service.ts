import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { SalesOrder } from './sales-order-model';

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
    private httpService: HttpServiceService)
   { 
    super();
  }
  private saveSalesOrder = `${this.serverUrl.apiServerAddress}api/auth/app/salesOrder/save`; 
  
  
  get data(): SalesOrder[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllList(): void {
  }

  save(salesOrder : SalesOrder): void {
    this.dialogData = salesOrder;
    this.httpClient.post<SalesOrder>(this.saveSalesOrder, salesOrder).subscribe(data => {
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        
    });
  }
}

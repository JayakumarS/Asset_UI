import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { InventoryReports } from './inventory-reports-model';

@Injectable({
  providedIn: 'root'
})
export class InventoryReportsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading: boolean;
  dataChange: BehaviorSubject<InventoryReports[]> = new BehaviorSubject<InventoryReports[]>(
    []
  );
 
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  
  public getInventoryReports = `${this.serverUrl.apiServerAddress}app/inventoryReports/getInventoryReports`;

  get data(): InventoryReports[] {
    return this.dataChange.value;
  }
  
  getInventoryReport(inventoryReport: any): Observable<any> {
    return this.httpClient.post<any>(this.getInventoryReports, inventoryReport);
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { InventoryReports } from './inventory-reports-model';
import { InventoryResultBean } from './inventory-reports-resiltBean';

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

  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/inventoryReport/getList`;
  public excelExportUrl = `${this.serverUrl.apiServerAddress}api/auth/app/inventoryReport/excelExport`;



  get data(): InventoryReports[] {
    return this.dataChange.value;
  }

  getAllList(): void {
    this.subs.sink = this.httpService.get<InventoryResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.inventoryDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  
  }
}

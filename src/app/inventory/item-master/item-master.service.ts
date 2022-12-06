import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ItemMasterResultBean } from './item-master-result-bean';
import { ItemMaster } from './item-master.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ItemMasterService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  // currencyList:[];
  dataChange: BehaviorSubject<ItemMaster[]> = new BehaviorSubject<ItemMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/getList`;
  private saveItemMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/save`;
  public deleteItem = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/delete`;
  public editItem = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/edit`;
  public updateItem = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/update`;
  //public currencyListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/countryMaster/getCurrencyList`;
  get data(): ItemMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  addItem(itemMaster: ItemMaster): void {
    this.dialogData = itemMaster;

    this.httpService.post<ItemMaster>(this.saveItemMaster, itemMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
    },
      (err: HttpErrorResponse) => {
        throw new Error('Method not implemented.');
      });
  }
  getAllList(): void {
    this.subs.sink = this.httpService.get<ItemMasterResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.itemMasterDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  itemUpdate(itemMaster: ItemMaster): void {
    this.dialogData = itemMaster;
    this.httpService.post<ItemMaster>(this.updateItem, itemMaster).subscribe(data => {
      console.log(data);
      /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
        this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );*/
    });
  }
  itemDelete(itemId: any): void {
    this.httpService.get(this.deleteItem + "?itemId=" + itemId).subscribe(data => {
      console.log(itemId);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}

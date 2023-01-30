import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ItemMaster } from './item-master.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ItemMasterResultBean } from './item-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<ItemMaster[]> = new BehaviorSubject<ItemMaster[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  companyId: string;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService, private tokenStorage: TokenStorageService,) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/getList`;
  public saveItemMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/save`;
  public editItemMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/edit`;
  public updateItemMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/update`;
  public deleteItemMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/delete`;
  public attributeDetails = `${this.serverUrl.apiServerAddress}api/auth/app/itemMaster/attributeDetails`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;

  get data(): ItemMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllItemMasters(): void {
    this.companyId=this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<ItemMasterResultBean>(this.getAllMasters+"?companyId="+this.companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.itemMasterList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addItem(itemMaster: ItemMaster): Observable<any> {
    return this.httpClient.post<ItemMaster>(this.saveItemMaster, itemMaster);
  }

  editItem(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editItemMaster, obj);
  }

  updateItem(itemMaster: ItemMaster): Observable<any> {
    return this.httpClient.post<ItemMaster>(this.updateItemMaster, itemMaster);
  }

  deleteItem(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteItemMaster, obj);
  }

}

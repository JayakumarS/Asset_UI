import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ItemProperties } from './item-properties-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ItemPropertiesResultBean } from './item-properties-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemPropertiesService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<ItemProperties[]> = new BehaviorSubject<ItemProperties[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  companyId: string;
  RoleId: string;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService, private tokenStorage: TokenStorageService,) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperties/getList`;
  public saveItemPropertiesMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperties/save`;
  public editItemPropertiesMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperties/edit`;
  public updateItemPropertiesMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperties/update`;
  public deleteItemPropertiesMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperties/delete`;
  
  get data(): ItemProperties[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllItemProperties(): void {
    this.companyId=this.tokenStorage.getCompanyId();
    this.RoleId=this.tokenStorage.getRoleId();
    if(this.RoleId=="1")
    {
      this.companyId = "1";
    }

    this.subs.sink = this.httpService.get<ItemPropertiesResultBean>(this.getAllMasters+"?companyId="+this.companyId+"&RoleId="+this.RoleId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.itemPropertiesList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addItemProperties(itemProperties: ItemProperties): Observable<any> {
    return this.httpClient.post<ItemProperties>(this.saveItemPropertiesMaster, itemProperties);
  }

  editItemProperties(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editItemPropertiesMaster, obj);
  }

  updateItemProperties(itemProperties: ItemProperties): Observable<any> {
    return this.httpClient.post<ItemProperties>(this.updateItemPropertiesMaster, itemProperties);
  }

  deleteItemProperties(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteItemPropertiesMaster, obj);
  }

}

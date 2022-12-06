import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemProperties } from './item-properties-model';
import { ItemPropertiesResultBean } from './item-properties-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemPropertiesService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  propertyType:[];
  typelist:[];
  dataChange: BehaviorSubject<ItemProperties[]> = new BehaviorSubject<ItemProperties[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(
    private httpClient: HttpClient, 
    private serverUrl: serverLocations, 
    private httpService: HttpServiceService
  ) 
  { 
    super();
  }

  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/getList`;
  private saveItemProperties = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/save`;
  public editItemProperties = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/edit`;
  public updateItemProperties = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/update`;
  private deleteItemProperties = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/delete`;
  public getpropertyType = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/propertyList`;
  public gettypeList = `${this.serverUrl.apiServerAddress}api/auth/app/itemProperty/typeList`;

  get data(): ItemProperties[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  getAllList(): void {
    this.subs.sink = this.httpService.get<ItemPropertiesResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.itemPropertiesDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}

// This is for save
addItemProperties(itemProperties: ItemProperties): void {
  this.dialogData = itemProperties;
  this.httpService.post<ItemProperties>(this.saveItemProperties, itemProperties).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
}

itemPropertiesUpdate(itemProperties: ItemProperties): void {
  this.dialogData = itemProperties;
  this.httpService.post<ItemProperties>(this.updateItemProperties, itemProperties).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
}

itemPropertiesdelete(itemPropertyId: any): void {
  this.httpService.get(this.deleteItemProperties+"?itemProperties="+itemPropertyId).subscribe(data => {
    console.log(itemPropertyId);
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
  
}
}

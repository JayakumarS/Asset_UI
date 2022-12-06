import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ItemCategory } from "./item-category.models";
import { ItemCategoryResultBean } from './item-category-result-bean';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<ItemCategory[]> = new BehaviorSubject<ItemCategory[]>(
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

  private getAllCategory = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/getList`;
  private saveItemCategory = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/save`;
  public editItemCategory = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/edit`;
  public updateItemCategory = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/update`;
  private deleteItemCategory = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/delete`;
  public getPropertyValue = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/getproperValue`;
  public getCategoryType = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/getCategoryType`;

  get data(): ItemCategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  getAllList(): void {
    this.subs.sink = this.httpService.get<ItemCategoryResultBean>(this.getAllCategory).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.itemCategoryDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}

// This is for save
addItemCatagory(itemCategory: ItemCategory): void {
  this.dialogData = itemCategory;
  this.httpService.post<ItemCategory>(this.saveItemCategory, itemCategory).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
}

itemCategoryUpdate(itemCategory: ItemCategory): void {
  this.dialogData = itemCategory;
  this.httpService.post<ItemCategory>(this.updateItemCategory, itemCategory).subscribe(data => {
    console.log(data);
    //this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      
  });
}

itemCategorydelete(itemCategoryId: any): void {
  this.httpService.get(this.deleteItemCategory+"?itemCategory="+itemCategoryId).subscribe(data => {
    console.log(itemCategoryId);
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
  
}

}

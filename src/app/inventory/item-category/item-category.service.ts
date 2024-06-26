import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ItemCategory } from './Item-category.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ItemCategoryResultBean } from './item-category-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


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
  companyId: string;
  RoleId: string;
   constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
              private httpService: HttpServiceService, private tokenStorage: TokenStorageService,) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/getList`;
  public saveItemCategoryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/save`;
  public editItemCategoryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/edit`;
  public updateItemCategoryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/update`;
  public deleteItemCategoryMaster = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/delete`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
  public uniqueValidateCompanyBasedUrl = `${this.serverUrl.apiServerAddress}api/auth/app/itemCategory/validation`;


  get data(): ItemCategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllItemCategorys(): void {
    this.companyId=this.tokenStorage.getCompanyId();
    this.RoleId=this.tokenStorage.getRoleId();
    if(this.RoleId=="1")
    {
      this.companyId = "1";
    }
    this.subs.sink = this.httpService.get<ItemCategoryResultBean>(this.getAllMasters+"?companyId="+this.companyId+"&RoleId="+this.RoleId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.itemCategoryList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addItemCategory(itemCategory: ItemCategory): Observable<any> {
    return this.httpClient.post<ItemCategory>(this.saveItemCategoryMaster, itemCategory);
  }

  editItemCategory(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editItemCategoryMaster, obj);
  }

  updateItemCategory(itemCategory: ItemCategory): Observable<any> {
    return this.httpClient.post<ItemCategory>(this.updateItemCategoryMaster, itemCategory);
  }

  deleteItemCategory(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteItemCategoryMaster, obj);
  }

}

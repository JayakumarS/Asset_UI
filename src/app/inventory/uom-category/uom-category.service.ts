import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { UomCategory} from "./uom-category.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { UomCategoryResultBean } from './uom-category-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UomCategoryService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<UomCategory[]> = new BehaviorSubject<UomCategory[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  companyId: string;
  RoleId: string;
  constructor(private httpClient: HttpClient,
    private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService,) {
    super();
  }

  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/uom/getList`;
  private saveUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uom/save`;
  public editUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uom/edit`;
  public deleteUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uom/delete`;
  public updateUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uom/update`;
  public fetchUomCategoryName = `${this.serverUrl.apiServerAddress}api/auth/app/uom/getUomCategory`;
  public uniqueValidateCompanyBasedUrl = `${this.serverUrl.apiServerAddress}api/auth/app/uom/validation`;

  get data(): UomCategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    this.companyId=this.tokenStorage.getCompanyId();
    this.RoleId=this.tokenStorage.getRoleId();
    if(this.RoleId=="1")
    {
      this.companyId = "1";
    }
        this.subs.sink = this.httpService.get<UomCategoryResultBean>(this.getAllMasters+"?companyId="+this.companyId+"&RoleId="+this.RoleId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.uomCategoryDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }


  editAsset(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editUomCategory, obj);
  }

  addUomCategory(uomCategory: UomCategory): Observable<any> {
    return this.httpClient.post<UomCategory>(this.saveUomCategory, uomCategory);
  }

  uomCategoryUpdate(uomCategory: UomCategory): Observable<any> {
    return this.httpClient.post<UomCategory>(this.updateUomCategory, uomCategory);
  }

  DeleteUomCategory(obj: any): Observable<any> {
     return this.httpClient.post<any>(this.deleteUomCategory, obj);
  }

  updateEmployees(uomCategory: UomCategory): void {
    this.dialogData = uomCategory;
  }


}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UCategory } from './uom-model';
import { CategoryResultBean } from './uom-resultbean';

@Injectable({
  providedIn: 'root'
})
export class UomService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;
  dataChange: BehaviorSubject<UCategory[]> = new BehaviorSubject<UCategory[]>(
    []
  );
  dialogData:any;
  companyId: string;
  RoleId: string;
  
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService, private tokenStorage: TokenStorageService,) {
      super();
  }

  private saveUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomgcateory/save`;
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/uomgcateory/getList`;
  public editUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomgcateory/edit`;
  public updateUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomgcateory/update`;
  public deleteUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomgcateory/delete`;
  public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;





  get data(): UCategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }


  getAllCategory():void {
    this.companyId=this.tokenStorage.getCompanyId();
    this.RoleId=this.tokenStorage.getRoleId();
    if(this.RoleId=="1")
    {
      this.companyId = "1";
    }
    this.subs.sink = this.httpService.get<CategoryResultBean>(this.getAllMasters+"?companyId="+this.companyId+"&RoleId="+this.RoleId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.categoryMasterList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addUomCategory(uCategory: UCategory): Observable<any> {
    return this.httpClient.post<UCategory>(this.saveUomCategory, uCategory);
  }
  editCategory(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editUomCategory, obj);
   }

   updateCategory(uCategory: UCategory): Observable<any> {
    return this.httpClient.post<UCategory>(this.updateUomCategory, uCategory);
 }

   DeleteUomCategory(obj: any): Observable<any> {
     return this.httpClient.post<any>(this.deleteUomCategory, obj);
   }

  
  }


import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { BrandResultbean } from "./brand-result-bean";
import { Brand } from "./brand.model";


  
  @Injectable({
    providedIn: 'root'
})
export class BrandMasterService extends UnsubscribeOnDestroyAdapter {
    companyId: string;
    branchId: string;
    isTblLoading = true;
    dataChange: BehaviorSubject<Brand[]> = new BehaviorSubject<Brand[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: Brand;
   
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) {
      super();
    }
    
    public saveBranch = `${this.serverUrl.apiServerAddress}app/Brand/save`;
    public getList = `${this.serverUrl.apiServerAddress}app/Brand/getlist`;
    public editMaster = `${this.serverUrl.apiServerAddress}app/Brand/edit`;
    public deletecity = `${this.serverUrl.apiServerAddress}app/Brand/delete`;
    public updatebrand = `${this.serverUrl.apiServerAddress}app/Brand/update`;
    public saveMultiple = `${this.serverUrl.apiServerAddress}app/Brand/multipleSave`;
    public multipleUpload = `${this.serverUrl.apiServerAddress}app/Brand/brandmultipleUpload`;

    get data(): Brand[] {
        return this.dataChange.value;
      }
      getDialogData() {
        return this.dialogData;
      }
  
   // For Save
  addbrand(brand:Brand): void {
    this.dialogData = brand;  
    this.httpService.post<any>(this.saveBranch, brand).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      window.location.reload();

      },
      (err: HttpErrorResponse) => {
        
    });
  }
 

  getAllList(): void {
    this.companyId=this.tokenStorage.getCompanyId();
    this.branchId= this.tokenStorage.getBranchId(),
    this.subs.sink = this.httpService.get<BrandResultbean>(this.getList+"?companyId="+this.companyId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.brandDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

edit(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.editMaster, obj);
}
updateMaster(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.updatebrand, obj);
}
deletebrand(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.deletecity, obj);
}

addMultiple(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.saveMultiple, obj);
}

}


import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { CategoryResultBean } from "./category-result-bean";
import { Assetcategory } from "./category.model";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
})
export class CategoryMasterService extends UnsubscribeOnDestroyAdapter {

    isTblLoading = true;
    dataChange: BehaviorSubject<Assetcategory[]> = new BehaviorSubject<Assetcategory[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
    assetcategory:Assetcategory;
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) {
      super();
    }
   public getcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getList`;
   public savecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/save`;
   public editcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/edit`;
   public viewcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/view`;
   public deletecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/delete`;
   public updatecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/update`;
   public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
   public getAssetTypeDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getassettype`;
   public getAssetDepreciationDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getdepreciation`;
   public getCurrencyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getCurrency`;
   public uniqueValidateCompanyBasedUrl = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/validation`;

   public Assetcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getCategoryList`;

   public getReferralListByUser = `${this.serverUrl.apiServerAddress}api/auth/app/company/getReferralListByUser`;
   
   
get data(): Assetcategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

    /** CRUD METHODS */
    getAllList(): void {
      let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<CategoryResultBean>(this.getcategory+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.categoryMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }

  // For Save
  addcategory(assetcategory,router,notificationService): void {
    this.dialogData = assetcategory;  
    this.httpService.post<any>(this.savecategory, assetcategory).subscribe(data => {
    console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/category/list-category']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not ADDED, "+data.message,
          "bottom",
          "center"
        );
      }
    },
      (err: HttpErrorResponse) => {
        
    });
  }
  categoryUpdate(assetcategory,router,notificationService): void {
    this.dialogData = assetcategory;
    this.httpService.post<any>(this.updatecategory, assetcategory).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/category/list-category']);
      }else{
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
    
  }


  getAssetcategory(assetcategory: any): Observable<any> {
    return this.httpClient.post<any>(this.Assetcategory, assetcategory);
  }
}
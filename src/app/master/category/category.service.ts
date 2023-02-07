import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
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
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) {
      super();
    }
   public getcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getList`;
   public savecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/save`;
   public editcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/edit`;
   public deletecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/delete`;
   public updatecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/update`;
   public uniqueValidateUrl = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUnique`;
   public getAssetTypeDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getassettype`;
   public getAssetDepreciationDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getdepreciation`;
   public getCurrencyDropdown = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getCurrency`;


   
   
get data(): Assetcategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

    /** CRUD METHODS */
    getAllList(): void {
        this.subs.sink = this.httpService.get<CategoryResultBean>(this.getcategory).subscribe(
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
  addcategory(assetcategory: Assetcategory,router): void {
    this.dialogData = assetcategory;  
    this.httpService.post<Assetcategory>(this.savecategory, assetcategory).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
    router.navigate(['/master/category/list-category']);

      },
      (err: HttpErrorResponse) => {
        
    });
  }
  categoryUpdate(assetcategory: Assetcategory,router,notificationService): void {
    this.dialogData = assetcategory;
    this.httpService.post<Assetcategory>(this.updatecategory, assetcategory).subscribe(data => {
      console.log(data);
      if(data.Success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/category/list-category']);
      }
      else if(data.Success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated Successfully...!!!",
          "bottom",
          "center"
        );
      }
      },
      (err: HttpErrorResponse) => {
        
    });
    
  }

}
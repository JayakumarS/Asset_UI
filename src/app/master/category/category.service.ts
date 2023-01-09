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
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) {
      super();
    }
   public getcategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/getList`;
   public savecategory = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/save`;

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
  addcategory(assetcategory: Assetcategory): void {
    this.dialogData = assetcategory;  
    this.httpService.post<Assetcategory>(this.savecategory, assetcategory).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
}
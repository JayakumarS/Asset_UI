import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Brand } from "./brand.model";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
})
export class BrandMasterService extends UnsubscribeOnDestroyAdapter {

    isTblLoading = true;
    dataChange: BehaviorSubject<Brand[]> = new BehaviorSubject<Brand[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
    brand:Brand;
    constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) {
      super();
    }
    
    public saveBranch = `${this.serverUrl.apiServerAddress}api/auth/app/assetcategory/save`;



    get data(): Brand[] {
        return this.dataChange.value;
      }
      getDialogData() {
        return this.dialogData;
      }
      getAllList
      

        // For Save
  addbrand(brand: Brand,router): void {
    this.dialogData = brand;  
    this.httpService.post<Brand>(this.saveBranch, brand).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
    router.navigate(['/master/brand/listBrand']);

      },
      (err: HttpErrorResponse) => {
        
    });
  }
}


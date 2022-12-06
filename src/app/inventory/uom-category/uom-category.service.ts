import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { UomCategory} from "./uom-category.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { UomCategoryResultBean } from './uom-category-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

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
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/uomCategory/getList`;
  private saveUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomCategory/save`;
  public editUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomCategory/getCode`;
  public deleteUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomCategory/delete`;
  public updateUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uomCategory/update`;
  
  
  get data(): UomCategory[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<UomCategoryResultBean>(this.getAllMasters).subscribe(
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




  addUomCategory(uomCategory: UomCategory): void {
    this.dialogData = uomCategory;
    this.httpService.post<UomCategory>(this.saveUomCategory, uomCategory).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  uomCategoryUpdate(uomCategory: UomCategory): void {
    this.dialogData = uomCategory;
    this.httpService.post<UomCategory>(this.updateUomCategory, uomCategory).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }


  

  DeleteUomCategory(uomCode: any): void {
    this.httpService.get(this.deleteUomCategory+"?uomCategory="+uomCode).subscribe(data => {
      console.log(uomCode);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }



  updateEmployees(uomCategory: UomCategory): void {
    this.dialogData = uomCategory;
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  
}

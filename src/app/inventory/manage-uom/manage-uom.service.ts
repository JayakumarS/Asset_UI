import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { UomMaster } from "./uom-master.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { UomMasterResultBean } from './uom-master-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ManageUomService  extends UnsubscribeOnDestroyAdapter {


  isTblLoading = true;
  uomCategoryList: [];
  dataChange: BehaviorSubject<UomMaster[]> = new BehaviorSubject<UomMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/uom/getList`;
  private saveUom = `${this.serverUrl.apiServerAddress}api/auth/app/uom/save`;
  public getUomCategory = `${this.serverUrl.apiServerAddress}api/auth/app/uom/getUomCategory`;
  public editUom = `${this.serverUrl.apiServerAddress}api/auth/app/uom/edit`;
  public updateUom = `${this.serverUrl.apiServerAddress}api/auth/app/uom/update`;
  public deleteUom = `${this.serverUrl.apiServerAddress}api/auth/app/uom/delete`;

  get data(): UomMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<UomMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.uomDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addUomManage(uomMaster: UomMaster): void {
    this.dialogData = uomMaster;
    this.httpService.post<UomMaster>(this.saveUom, uomMaster).subscribe(data => {
      console.log(data);
      // this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {

    });
  }

  getuomCategoryList() {

    this.httpService.get<UomMasterResultBean>(this.getUomCategory).subscribe(
      (data) => {
        this.uomCategoryList = data.uomCategoryList;
      },
      (error: HttpErrorResponse) => {

        console.log(error.name + " " + error.message);
      }
    );
    return this.uomCategoryList;
  }

  // This is for update
  // uomUpdate(uomMaster: UomMaster): void {
  // this.dialogData = uomMaster;
  // this.httpService.post<UomMaster>(this.updateUom, uomMaster).subscribe(data => {
  //   console.log(data);
  //   //this.dialogData = employees;
  //   },
  //   (err: HttpErrorResponse) => {

  // });
// }
uomUpdate(uomMaster: UomMaster): Observable<any> {
  return this.httpClient.post<UomMaster>(this.updateUom, uomMaster);
}

uomDelete(obj: any): Observable<any> {
  return this.httpClient.post<any>(this.deleteUom, obj);
}
// uomDelete(id: any): void {
//   this.httpService.get(this.deleteUom+"?manageUom="+id).subscribe(data => {
//     console.log(id);
//     },
//     (err: HttpErrorResponse) => {
//        // error code here
//     }
//   );

// }

}

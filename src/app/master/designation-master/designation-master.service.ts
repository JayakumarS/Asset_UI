import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DesignationMaster } from './designation-master.model';
import { DesignationMasterResultBean } from './designation-master-result-bean';
@Injectable({
  providedIn: 'root'
})
export class DesignationMasterService extends UnsubscribeOnDestroyAdapter {

  
  isTblLoading = true;
  dataChange: BehaviorSubject<DesignationMaster[]> = new BehaviorSubject<DesignationMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/designationMaster/getList`;
  private saveDesignation = `${this.serverUrl.apiServerAddress}api/auth/app/designationMaster/save`;
  public editDesignationMaster = `${this.serverUrl.apiServerAddress}api/auth/app/designationMaster/edit`;
  public updateDesignationMaster = `${this.serverUrl.apiServerAddress}api/auth/app/designationMaster/update`;
  private deleteDesignationMaster = `${this.serverUrl.apiServerAddress}api/auth/app/designationMaster/delete`;

  
  
  get data(): DesignationMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<DesignationMasterResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.designationMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addDesignation(designationMaster: DesignationMaster): void {
    this.dialogData = designationMaster;
    this.httpService.post<DesignationMaster>(this.saveDesignation, designationMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  designationMasterUpdate(designationMaster: DesignationMaster): void {
    this.dialogData = designationMaster;
    this.httpService.post<DesignationMaster>(this.updateDesignationMaster, designationMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  DeleteDesignationMaster(desgnCode: any): void {
    this.httpService.get(this.deleteDesignationMaster+"?designationMaster="+desgnCode).subscribe(data => {
      console.log(desgnCode);
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


  deleteEmployees(id: number): void {
    console.log(id);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { DesignationMaster } from './designation-master.model';
import { DesignationMasterResultBean } from './designation-master-result-bean';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
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
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/activitymaster/getList`;
  private saveDesignation = `${this.serverUrl.apiServerAddress}app/activitymaster/save`;
  public editDesignationMaster = `${this.serverUrl.apiServerAddress}app/activitymaster/edit`;
  public updateDesignationMaster = `${this.serverUrl.apiServerAddress}app/activitymaster/update`;
  private deleteDesignationMaster = `${this.serverUrl.apiServerAddress}app/activitymaster/delete`;

  
  
  get data(): DesignationMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<DesignationMasterResultBean>(this.getAllMasters+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.activityMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  // addDesignation(designationMaster: DesignationMaster): void {
  //   this.dialogData = designationMaster;
  //   this.httpService.post<DesignationMaster>(this.saveDesignation, designationMaster).subscribe(data => {
  //     console.log(data);
  //     //this.dialogData = employees;
  //     },
  //     (err: HttpErrorResponse) => {
        
  //   });
  // }

  addDesignation(designationMaster: DesignationMaster): Observable<any> {
    return this.httpClient.post<DesignationMaster>(this.saveDesignation, designationMaster);
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

  DeleteDesignationMaster(id: any,router,notificationService): void {
    this.httpService.get<DesignationMaster>(this.deleteDesignationMaster+"?id="+id).subscribe(data => {
      console.log(id);
      if(data.Success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Deleted Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/Activity-master/list-activity']);
      }
      else if(data.Success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Deleted Successfully...!!!",
          "bottom",
          "center"
        );
      }

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

}

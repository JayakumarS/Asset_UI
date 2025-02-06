import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApplicationDetailsResultBean } from './application-details-result-bean';
import { ApplicationDetails } from './application-details.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailsService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<ApplicationDetails[]> = new BehaviorSubject<ApplicationDetails[]>(
    []
  );
  dialogData: any;
  applicationDetails: ApplicationDetails;
  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,public tokenStorage: TokenStorageService) {
    super();
  }

  public getapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/get`;
  public saveapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/add`;
  public editapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/edit`;
  public viewapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/view`;
  public deleteapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/delete`;
  public updateapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/update`;
  public Assetapplicationdetails = `${this.serverUrl.apiServerAddress}api/auth/app/assertapplicationDetails/getRegisterList`;
  get data(): ApplicationDetails[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllList(): void {
    let companyId=this.tokenStorage.getCompanyId();
    this.subs.sink = this.httpService.get<ApplicationDetailsResultBean>(this.getapplicationdetails).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.sampleDtl);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  // For Save
  addApplicationDetails(applicationdetails,router,notificationService): void {
    this.dialogData = applicationdetails;  
    this.httpService.post<any>(this.saveapplicationdetails, applicationdetails).subscribe(data => {
    console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Added successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/application-details/list-application-details']);
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

  applicationDetailsUpdate(applicationdetails,router,notificationService): void {
    this.dialogData = applicationdetails;
    this.httpService.post<any>(this.updateapplicationdetails, applicationdetails).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Record Updated Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/application-details/list-application-details']);
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

  getApplicationDetails(applicationdetails: any): Observable<any> {
    return this.httpClient.post<any>(this.Assetapplicationdetails, applicationdetails);
  }

  deleteApplicationDetailsList(applicationId: any): Observable<any>  {

    return  this.httpClient.get<any>(this.deleteapplicationdetails+"?application_id="+applicationId);

  };

  editApplicationDetails(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editapplicationdetails, obj);
  };

}

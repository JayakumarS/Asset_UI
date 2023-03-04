import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { StatusMaster } from './status-model';
import { StatusResultBean } from './status-result-bean';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StatusService extends UnsubscribeOnDestroyAdapter {
  
  isTblLoading = true;
  currencyList: [];
  dataChange: BehaviorSubject<StatusMaster[]> = new BehaviorSubject<StatusMaster[]>(
    []
  );
  dialogData: any;
  companyId: any;
  RoleId: string;



  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
    super();
  }

  private saveStatus = `${this.serverUrl.apiServerAddress}app/statusMaster/save`;
  private getAllMasters = `${this.serverUrl.apiServerAddress}app/statusMaster/getList`;
  public updateStatusMaster = `${this.serverUrl.apiServerAddress}app/statusMaster/update`;
  public editStatusMaster = `${this.serverUrl.apiServerAddress}app/statusMaster/edit`;
  public deletesStatusMaster = `${this.serverUrl.apiServerAddress}app/statusMaster/delete`;
  public validateStatusURL = `${this.serverUrl.apiServerAddress}api/auth/app/commonServices/validateUniqueCopmanyBased`;


  get data(): StatusMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<StatusResultBean>(this.getAllMasters+"?companyId="+companyId).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.statusMasterDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }


  DeleteStatus(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deletesStatusMaster, obj);
  }

  addStatus(statusMaster: StatusMaster): Observable<any> {
    return this.httpClient.post<StatusMaster>(this.saveStatus, statusMaster);
  }

  statusMasterUpdate(statusMaster: StatusMaster): void {
    this.dialogData = statusMaster;
    this.httpService.post<StatusMaster>(this.updateStatusMaster, statusMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }


}

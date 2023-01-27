import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserGroupResultBean } from './user-resultbean';
import { UserGroupMaster } from './usergroup-model';

@Injectable({
  providedIn: 'root'
})
export class UsergroupService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<UserGroupMaster[]> = new BehaviorSubject<UserGroupMaster[]>(
    []
  );
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, 
    private httpService: HttpServiceService) {
      super();
     }


 public save = `${this.serverUrl.apiServerAddress}api/auth/app/userGroupMaster/save`;
  public editCompanyMaster = `${this.serverUrl.apiServerAddress}api/auth/app/company/edit`;
  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/userGroupMaster/getList`;



  get data(): UserGroupMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  editCompany(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editCompanyMaster, obj);
  }

  getAllCountrys(){
    this.subs.sink = this.httpService.get<UserGroupResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.userGroupList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  
}

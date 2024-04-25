import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserWiseAssetCount } from './User-wise-asset-count-model';

@Injectable({
  providedIn: 'root'
})
export class UserWiseAssetCountService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dialogData: any;
  dataChange: BehaviorSubject<UserWiseAssetCount[]> = new BehaviorSubject<UserWiseAssetCount[]>(
    []
  );
  UserId: String;

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService,  public tokenStorage: TokenStorageService
    ) {
    super();

    }
    public userListUrl = `${this.serverUrl.apiServerAddress}api/auth/app/reports/getUserList`;



    get data(): UserWiseAssetCount[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }


    getAllList(object): void {
      object.company = this.tokenStorage.getCompanyId();
      console.log(object);
      this.subs.sink = this.httpService.post<any>(this.userListUrl,object).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.userList);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
}
  }

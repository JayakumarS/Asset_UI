import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { schedule } from './schedulelist-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class SchedulelistService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;

   
  dataChange: BehaviorSubject<schedule[]> = new BehaviorSubject<schedule[]>(
    []
  );

  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService) {
    super();
  }
  public getNotificationDetails = `${this.serverUrl.apiServerAddress}app/schedulelist/getNotificationDetails`;

 get data(): schedule[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getNotificationList(): void {
    this.subs.sink = this.httpService.get<any>(this.getNotificationDetails+ "?userId=" +this.tokenStorage.getUserId()).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  
}

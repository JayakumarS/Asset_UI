import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { GroupHeadMaster } from "./group-head.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { GroupHeadResultBean } from './group-head-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupHeadService extends UnsubscribeOnDestroyAdapter{


  isTblLoading = true;
  dataChange: BehaviorSubject<GroupHeadMaster[]> = new BehaviorSubject<GroupHeadMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getSubGroupAccountMaster = `${this.serverUrl.apiServerAddress}api/auth/app/groupHeadMaster/getList`;
   get data(): GroupHeadMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllAccountHead(): void {
        this.subs.sink = this.httpService.get<GroupHeadResultBean>(this.getSubGroupAccountMaster).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.objGrpHeadMasterBean);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
}

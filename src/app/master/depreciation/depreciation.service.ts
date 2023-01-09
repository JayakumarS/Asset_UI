import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DepreciationMaster } from './depreciation-model';
import { DepreciationResultBean } from './depreciation-resultBean';

@Injectable({
  providedIn: 'root'
})
export class DepreciationService  extends UnsubscribeOnDestroyAdapter {
  
  isTblLoading = true;
  dataChange: BehaviorSubject<DepreciationMaster[]> = new BehaviorSubject<DepreciationMaster[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
     private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/depreciation/getList`;
  private saveDepreciation = `${this.serverUrl.apiServerAddress}api/auth/app/depreciation/save`;
  public editDepreciation = `${this.serverUrl.apiServerAddress}api/auth/app/depreciation/edit`;
  public updateDepreciation = `${this.serverUrl.apiServerAddress}api/auth/app/depreciation/update`;
  public deleteDepreciation = `${this.serverUrl.apiServerAddress}api/auth/app/depreciation/delete`;

  //public save = `${this.serverUrl.apiServerAddress}api/auth/app/manageLine/save`;
  
  get data(): DepreciationMaster[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllList(): void {
    this.subs.sink = this.httpService.get<DepreciationResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.depreciationList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}

save(depreciationMaster: DepreciationMaster): void {
    this.dialogData = depreciationMaster;
    this.httpClient.post<DepreciationMaster>(this.saveDepreciation, depreciationMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { usageMonitorResultBean } from './usage-monitor-ResultBean';
import { UsageMonitor } from './usageMonitor-model';

@Injectable({
  providedIn: 'root'
})
export class UsageMonitorService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;

  dataChange: BehaviorSubject<UsageMonitor[]> = new BehaviorSubject<UsageMonitor[]>(
    []
  );

  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  private saveUsageMonitor = `${this.serverUrl.apiServerAddress}api/auth/app/usageMonitor/save`; 
  public deleteUsageMonitor = `${this.serverUrl.apiServerAddress}api/auth/app/usageMonitor/delete`; 
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/usageMonitor/getList`;

  get data(): UsageMonitor[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllList(): void {
    this.subs.sink = this.httpService.get<usageMonitorResultBean>(this.getAllMasters).subscribe(
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


  save(usageMonitor : UsageMonitor): void {
    this.dialogData = usageMonitor;
    this.httpClient.post<UsageMonitor>(this.saveUsageMonitor, usageMonitor).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
}

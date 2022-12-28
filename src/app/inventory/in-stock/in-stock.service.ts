import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { InStockMaster } from './in-stock-model';
import { instockresultbean } from './in-stockresultbean';

@Injectable({
  providedIn: 'root'
})
export class InStockService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: InStockMaster;
  dataChange: BehaviorSubject<InStockMaster[]> = new BehaviorSubject<InStockMaster[]>(
    []
  );
 
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }

  private getInventoryList = `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/getInventoryList`;
  private saveInventory= `${this.serverUrl.apiServerAddress}api/auth/app/addAsset/saveInventory`;
  public locationserviceUrl= `${this.serverUrl.apiServerAddress}api/auth/app/locationMaster/getlocationList`;
  public activityserviceurl= `${this.serverUrl.apiServerAddress}api/auth/app/activitymaster/getactivityList`;
  public editScheduleMaster= `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/edit`;
  public updateSchedule =  `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/update`;
  public deleteschedule = `${this.serverUrl.apiServerAddress}api/auth/app/scheduleMaster/delete`;
  get data(): InStockMaster[] {
    return this.dataChange.value;
  }

  addScheduleActivity(inStockMaster: InStockMaster): void{

  }

  getAllList() {

    this.subs.sink = this.httpService.get<instockresultbean>(this.getInventoryList).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.assetList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
    
  }
  

  
}

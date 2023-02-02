import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { utilityReportResultBean } from './utility-report-resultBean'; 
import { UtilityReport } from './utility-report-model'; 

@Injectable({
  providedIn: 'root'
})
export class UtilityReportService  extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;

  dataChange: BehaviorSubject<UtilityReport[]> = new BehaviorSubject<UtilityReport[]>(
    []
  );

  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  private saveUtilityChangeLogReport = `${this.serverUrl.apiServerAddress}api/auth/app/utilityChangeLogReport/save`; 
  public deleteUtilityChangeLogReport = `${this.serverUrl.apiServerAddress}api/auth/app/utilityChangeLogReport/delete`; 
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/utilityChangeLogReport/getList`;

  get data(): UtilityReport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllList(): void {
    this.subs.sink = this.httpService.get<utilityReportResultBean>(this.getAllMasters).subscribe(
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


  save(utilityChangeLogReport : UtilityReport): void {
    this.dialogData = utilityChangeLogReport;
    this.httpClient.post<UtilityReport>(this.saveUtilityChangeLogReport, utilityChangeLogReport).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }
  
}

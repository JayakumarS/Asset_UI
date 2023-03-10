import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ReconciliationReport } from './reconciliation-report-model';
import { ReconciliationReportResultBean } from './reconciliation-report-resultBean';

@Injectable({
  providedIn: 'root'
})
export class ReconciliationReportService extends UnsubscribeOnDestroyAdapter{
  isTblLoading = true;

  dataChange: BehaviorSubject<ReconciliationReport[]> = new BehaviorSubject<ReconciliationReport[]>(
    []
  );

  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  private saveUtilityChangeLogReport = `${this.serverUrl.apiServerAddress}api/auth/app/utilityChangeLogReport/save`;
  public deleteReconciliationReport = `${this.serverUrl.apiServerAddress}api/auth/app/utilityChangeLogReport/delete`;
  public getAllMasters = `${this.serverUrl.apiServerAddress}app/reconciliationReport/getList`;

  get data(): ReconciliationReport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllList(object): void {
    this.subs.sink = this.httpService.post<ReconciliationReportResultBean>(this.getAllMasters,object).subscribe(

      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.reconciliationReportList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
}


  save(utilityChangeLogReport : ReconciliationReport): void {
    this.dialogData = utilityChangeLogReport;
    this.httpClient.post<ReconciliationReport>(this.saveUtilityChangeLogReport, utilityChangeLogReport).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {

    });
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service'
import { AuditReport } from './audit-report-model';
import { AuditReportResultBean } from './audit-report-result-bean';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuditReportService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dialogData: AuditReport;
  dataChange: BehaviorSubject<AuditReport[]> = new BehaviorSubject<AuditReport[]>(
    []
  );

  
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, private tokenStorage: TokenStorageService) {
    super();
  }
  public getAllMasters = `${this.serverUrl.apiServerAddress}app/auditReport/getList`;
 
  get data(): AuditReport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllLists(object): void {
    console.log(object);
    this.subs.sink = this.httpService.post<AuditReportResultBean>(this.getAllMasters,object).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.auditReportList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

 

}

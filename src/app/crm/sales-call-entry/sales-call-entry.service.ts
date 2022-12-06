import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { SalesCallEntry } from "./sales-call-entry.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { SalesCallEntryResultBean } from './sales-call-entry-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalesCallEntryService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<SalesCallEntry[]> = new BehaviorSubject<SalesCallEntry[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
  }
  private getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/salesCallEntry/getList`;
  private saveSalesEntry = `${this.serverUrl.apiServerAddress}api/auth/app/salesCallEntry/save`;
  public editSalesEntry = `${this.serverUrl.apiServerAddress}api/auth/app/salesCallEntry/edit`;
  public updateSalesEntry = `${this.serverUrl.apiServerAddress}api/auth/app/salesCallEntry/update`;
  private deleteSalesEntry = `${this.serverUrl.apiServerAddress}api/auth/app/salesCallEntry/delete`;


  get data(): SalesCallEntry[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
        this.subs.sink = this.httpService.get<SalesCallEntryResultBean>(this.getAllMasters).subscribe(
          (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data.salesCallEntryDetails);
          },
          (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + " " + error.message);
          }
        );
  }
  addSalesEntry(salesCallEntry: SalesCallEntry): void {
    this.dialogData = salesCallEntry;
    this.httpService.post<SalesCallEntry>(this.saveSalesEntry, salesCallEntry).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  DeleteSalesCallEntry(salesCallHdrId: any): void {
    this.httpService.get(this.deleteSalesEntry+"?salescallEntry="+salesCallHdrId).subscribe(data => {
      console.log(salesCallHdrId);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

  }
  
  salesCallEntryUpdate(salesCallEntry: SalesCallEntry): void {
    this.dialogData = salesCallEntry;
    this.httpService.post<SalesCallEntry>(this.updateSalesEntry, salesCallEntry).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

}

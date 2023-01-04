import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ItSupportresultbean } from "./it-support-result-bean";
import { Itsupport } from "./it-support.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  export class Itsupportservice extends UnsubscribeOnDestroyAdapter {
    deleteAsset(obj: { deletingId: any; }) {
      throw new Error('Method not implemented.');
    }
   
  
    isTblLoading = true;
    dataChange: BehaviorSubject<Itsupport[]> = new BehaviorSubject<Itsupport[]>(
      []
    );
    // Temporarily stores data from dialogs
    dialogData: any;
  
    itsupport: Itsupport;
    constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
      super();
    }

    public addticket = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/saveticket`;
    public getAlllist = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/list`;
    public deleteItSupport = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/delete`;

    
    public fetchassetlocaton
    
    get data(): Itsupport[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }

    addassetticket(itsupport: Itsupport): void {
      this.dialogData = itsupport;
      this.httpService.post<Itsupport>(this.addticket, itsupport).subscribe(data => {
        console.log(data);
        //this.dialogData = employees;
        },
        (err: HttpErrorResponse) => {
          
      });
    }
    
    
    getItList(): void {
      this.subs.sink = this.httpService.get<ItSupportresultbean>(this.getAlllist).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.getticketlist);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  
    }
    
    deleteitsupport(obj: any): Observable<any> {
      return this.httpClient.post<any>(this.deleteItSupport, obj);
    }
}
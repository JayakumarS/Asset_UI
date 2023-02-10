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
    constructor(private httpClient: HttpClient, private serverUrl: serverLocations,private tokenStorage: TokenStorageService, private httpService: HttpServiceService) {
      super();
    }
    

    public addticket = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/saveticket`;
    public getAlllist = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/list`;
    public getStatusList = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/statuslist`;
    public deleteItSupport = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/delete`;
    public editItSupport = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/edit`;
    public updateIT = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/update`;
    public closedListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/getClosedListCount`;
    public AssignedListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/getAssignedListCount`;
    public openListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/getopenListCount`;
    public holdListCountUrl = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/getholdListCount`;
    public fetchlocationlist = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/locationList`;
    public imageList = `${this.serverUrl.apiServerAddress}api/auth/app/itsupport/nonImageList`;
    
    
    
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
      let companyid=this.tokenStorage.getCompanyId();
      this.subs.sink = this.httpService.get<ItSupportresultbean>(this.getAlllist+"?companyid="+parseInt(companyid)).subscribe(
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

    getImageList(): void {
      let companyid=this.tokenStorage.getCompanyId();
      this.subs.sink = this.httpService.get<ItSupportresultbean>(this.imageList+"?companyid="+parseInt(companyid)).subscribe(
        (data:any) => {
          this.isTblLoading = false;
          this.dataChange.next(data.getlocationList);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  
    }


    // fetchlocationdetaillist(assetid: any): void {
    //   this.subs.sink = this.httpService.get<ItSupportresultbean>(this.fetchlocationlist + "?assetid=" + assetid).subscribe(
    //     (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(data.getlocationList);
    //   }),ng 
    //   (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + " " + error.message);
    //   }
    //   }


      getstatusList(ticketStatus: any): void {
        let companyId=this.tokenStorage.getCompanyId();
        this.subs.sink = this.httpService.get<ItSupportresultbean>(this.getStatusList + "?ticketStatus=" + ticketStatus + "&company_id=" + parseInt(companyId)).subscribe(
          (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.getstatusticketlist);
        }),
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        }
      
    
    
    

  
    ITsupportDelete(support_id: any): void {
      this.httpService.get(this.deleteItSupport + "?support_id=" + support_id).subscribe(data => {
        console.log(support_id);
      },
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
    }

    scheduleUpdate(itsupport: Itsupport,router,notificationService): void {
      this.dialogData = itsupport;
      this.httpService.post<Itsupport>(this.updateIT, itsupport).subscribe(data => {
        console.log(data);
        if(data.Success == true){
          notificationService.showNotification(
            "snackbar-success",
            "Add Record Successfully...!!!",
            "bottom",
            "center"
          );
          router.navigate(['/helpdesk/itsupport/listitsupport']);
        }
        else if(data.Success == false){
          notificationService.showNotification(
            "snackbar-danger",
            "Not Updated Successfully...!!!",
            "bottom",
            "center"
          );
        }
        },
        (err: HttpErrorResponse) => {
          
      });
    }
}
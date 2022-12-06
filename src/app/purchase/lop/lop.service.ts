import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { LopResultBean } from './lop-result-bean';
import { Lop } from './lop.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LopService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Lop[]> = new BehaviorSubject<Lop[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient:HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
   }
   getAllLop="";
   private getAllPurchase = `${this.serverUrl.apiServerAddress}api/auth/app/lop/getList`;

  get data(): Lop[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllList(): void {
    this.subs.sink = this.httpService.get<LopResultBean>(this.getAllPurchase).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.lopDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addLop(lop: Lop): void {
    this.dialogData = lop;
    /*  this.httpClient.post(this.API_URL, employees).subscribe(data => {
      this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateLop(lop: Lop): void {
    this.dialogData = lop;
    /* this.httpClient.put(this.API_URL + employees.id, employees).subscribe(data => {
      this.dialogData = employees;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteLop(id: number): void {
    console.log(id);
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}



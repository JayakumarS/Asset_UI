import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Grn } from './grn-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { GRNResultBean } from './grn-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GrnService extends UnsubscribeOnDestroyAdapter {

  isTblLoading = true;
  dataChange: BehaviorSubject<Grn[]> = new BehaviorSubject<Grn[]>(
    []
  );

  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations,
    private httpService: HttpServiceService) {
    super();
  }

  public getAllMasters = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getList`;
  public saveGrnMaster = `${this.serverUrl.apiServerAddress}api/auth/app/grn/save`;
  public editGrnMaster = `${this.serverUrl.apiServerAddress}api/auth/app/grn/edit`;
  public updateGrnMaster = `${this.serverUrl.apiServerAddress}api/auth/app/grn/update`;
  public deleteGrnMaster = `${this.serverUrl.apiServerAddress}api/auth/app/grn/delete`;
  public getGRNDetails = `${this.serverUrl.apiServerAddress}api/auth/app/grn/getGRNDetails`;

  get data(): Grn[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllGrns(): void {
    this.subs.sink = this.httpService.get<GRNResultBean>(this.getAllMasters).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.grnList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

  addGrn(grn: Grn): Observable<any> {
    return this.httpClient.post<Grn>(this.saveGrnMaster, grn);
  }

  editGrn(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editGrnMaster, obj);
  }

  updateGrn(grn: Grn): Observable<any> {
    return this.httpClient.post<Grn>(this.updateGrnMaster, grn);
  }

  deleteGrn(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteGrnMaster, obj);
  }

}

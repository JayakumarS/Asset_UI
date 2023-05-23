import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { serverLocations } from "src/app/auth/serverLocations";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { AssetReport } from './individual-asset-report-model';






const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class IndividualAssetReportService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;

  dataChange: BehaviorSubject<AssetReport[]> = new BehaviorSubject<AssetReport[]>(
    []
  );
  UserId: string;
  dialogData: any;


  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService, public tokenStorage: TokenStorageService) {
    super();
  }

  // public getAllAssets = `${this.serverUrl.apiServerAddress}app/assetMaster/getassetprintList`;

  // get data(): AssetReport[] {
  //   return this.dataChange.value;
  // }

  public getAllList = `${this.serverUrl.apiServerAddress}api/auth/app/individual-asset-report/getList`;
  public exportPdfQRcode =`${this.serverUrl.apiServerAddress}api/auth/app/individual-asset-report/ExportExcel`;
  
  getDialogData() {
    return this.dialogData;
  }
  get data(): AssetReport[] {
    return this.dataChange.value;
  }

  assetListUrl(object): void {
    console.log(object);
    this.subs.sink = this.httpService.post<any>(this.getAllList, object).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.individualreportList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }
 //FOR QR CODE PDF ADDED BY Gokul
 QRcodeExportPdf(obj: any): Observable<Blob> {
  var authorization = 'Bearer ' + sessionStorage.getItem("access_token");

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": authorization, responseType: 'blob'
  });

  return this.httpClient.post<Blob>(this.exportPdfQRcode, obj, {
    headers: headers, responseType:
      'blob' as 'json'
  });
}

}

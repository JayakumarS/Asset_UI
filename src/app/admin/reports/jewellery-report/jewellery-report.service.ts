import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';




@Injectable({
  providedIn: 'root'
})
export class JewelleryReportService  extends UnsubscribeOnDestroyAdapter  {

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
  }
    
    public jewelHistoryListUrl = `${this.serverUrl.apiServerAddress}app/jewellery/getjewelHistoryList`;
    public jewelHistoryListExcelUrl = `${this.serverUrl.apiServerAddress}app/jewellery/excelExport`;
    public getmateriallist = `${this.serverUrl.apiServerAddress}app/jewellery/getmateriallist`;
    public gettypelist = `${this.serverUrl.apiServerAddress}app/jewellery/gettypelist`;
   
    
}

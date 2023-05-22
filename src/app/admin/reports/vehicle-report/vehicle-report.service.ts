import { Injectable } from '@angular/core';
import { Vehiclereport } from './vehicle-report.model';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Reportscategory } from '../reports-model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleReportService extends UnsubscribeOnDestroyAdapter{
  vehicletype: string;
  fueltype: string;
  bodytype: string;
  ownertype: string;
  vehiclewheel: string;
  insurancetype : string;
  regno: string;
  engineno: string;
  // dataChange: any;
  dialogData: any;



  isTblLoading = true;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Vehiclereport[]> = new BehaviorSubject<Vehiclereport[]>(
    []
  );
  RoleId: string;
  companyId:String;
  
  // dialogData:any;
 
  
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }
  
  public VehicleListUrl = `${this.serverUrl.apiServerAddress}app/vehicle/getVehicleList`;
  public VehicleListExcelUrl = `${this.serverUrl.apiServerAddress}app/vehicle/excelExport`;


  public testList = `${this.serverUrl.apiServerAddress}app/vehicle/getvehicletypeList`;
  //public getvehicletypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getvehicletypeList`;
  public getfueltypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getfueltypeList`;
  public getbodytypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getbodytypeList`;
  public getownertypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getownertypeList`;
  public getinsurancetypeList = `${this.serverUrl.apiServerAddress}app/vehicle/getinsurancetypeList`;
  public getvehiclewheelList = `${this.serverUrl.apiServerAddress}app/vehicle/getvehiclewheelList`;
  public getregisternoList = `${this.serverUrl.apiServerAddress}app/vehicle/getregisternoList`;
  public getenginenoList = `${this.serverUrl.apiServerAddress}app/vehicle/getenginenoList`;
 
  get data(): Vehiclereport[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationMaster } from '../location-master.model';
import { LocationMasterService } from '../location-master.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.sass']
})
export class AddLocationComponent implements OnInit {
  locationMaster:LocationMaster;
  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;

  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  salesEntryData=[];
  salesDetailRowData = new SalesEntryDetailRowComponent;
  constructor(private fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private locationMasterService: LocationMasterService,
    private authService: AuthService,
    private httpService: HttpServiceService) {
    this.docForm = this.fb.group({
      locationId:[""],
      locationCode: ["", [Validators.required]],
      region: ["",[Validators.required]],
      cslLocationCode: ["", [Validators.required]],
      country: ["", [Validators.required]],
      active:[""],
      // locationType: ["", [Validators.required]],
      // portAgentName: ["", [Validators.required]],
      // locationName: ["",[Validators.required]],
      // depotVendorName: ["",[Validators.required]],
      // portCode: ["",[Validators.required]],
      // demDet: ["",[Validators.required, ]],
      // email: ["", [Validators.required,Validators.pattern ("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      // controllingBatch: ["",[Validators.required]],
      // transhipmentHub: ["",Validators.required],
      // blFreeDays: ["",[Validators.required]],
      // dischargeDwellTimeDry: ["",[Validators.required]],
      // loadDwellTimeDry: ["",[Validators.required]],
      // dischargeDwellTimeRfr: ["",[Validators.required]],
      // loadDwellTime: ["",[Validators.required]],
      // customTransportMode: ["",[Validators.required]],
      // carrierName: ["",[Validators.required]],
      // carrierCode: ["",[Validators.required]],
      // tpCustomsBondNo: ["",[Validators.required]],
      // portTransportMode: ["",[Validators.required]],
      // fpodPortCode: ["",[Validators.required]],
      // haulageType: ["",[Validators.required]],
      // fromDate: ["",[Validators.required]],
      // toDate: ["",[Validators.required]],
    });

   }
  //   !!
  // ngOnInit(): void {
  //   this.dataarray.push(this.salesDetailRowData)
  //   this.cusMasterData.push(this.docForm)
  //   this.cusMasterData.push(this.dataarray)
  // }
  onSubmit() {
    this.locationMaster = this.docForm.value;
    console.log(this.locationMaster);
    this.locationMasterService.addLocation(this.locationMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/location/listLocation']);
    console.log("Form Value", this.docForm.value);
    console.log(this.dataarray)
    console.log(this.cusMasterData)
    console.log(this.salesEntryData)
  }
  addRow(){
    this.salesDetailRowData=new SalesEntryDetailRowComponent()
    this.dataarray.push(this.salesDetailRowData)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }

 onCancel(){
     this.router.navigate(['/master/location/listLocation']);
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.dataarray.push(this.salesDetailRowData)
     this.cusMasterData.push(this.docForm)
     this.cusMasterData.push(this.dataarray)
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
  }



  fetchDetails(cslLocationCode: any): void {
    this.httpService.get(this.locationMasterService.editLocation+"?locationMaster="+cslLocationCode).subscribe((res: any)=> {
      console.log(cslLocationCode);

      this.docForm.patchValue({
        'locationId': res.locationMasterBean.locationId,
        'locationCode': res.locationMasterBean.locationCode,
        'region': res.locationMasterBean.region,
        'cslLocationCode': res.locationMasterBean.cslLocationCode,
        'country' : res.locationMasterBean.country,
        'active' : res.locationMasterBean.active,
        // 'locationType': res.locationMasterBean.locationType,
        // 'portAgentName': res.locationMasterBean.portAgentName,
        // 'demDet': res.locationMasterBean.demDet,
        // 'email' : res.locationMasterBean.email,
        // 'controllingBatch' : res.locationMasterBean.controllingBatch,
        // 'transhipmentHub': res.locationMasterBean.transhipmentHub,
        // 'blFreeDays': res.locationMasterBean.blFreeDays,
        // 'dischargeDwellTimeDry': res.locationMasterBean.dischargeDwellTimeDry,
        // 'loadDwellTimeDry': res.locationMasterBean.loadDwellTimeDry,
        // 'dischargeDwellTimeRfr' : res.locationMasterBean.dischargeDwellTimeRfr,
        // 'loadDwellTime': res.locationMasterBean.loadDwellTime,
        // 'customTransportMode': res.locationMasterBean.customTransportMode,
        // 'carrierName': res.locationMasterBean.carrierName,
        // 'carrierCode' : res.locationMasterBean.carrierCode,
        // 'tpCustomsBondNo' : res.locationMasterBean.tpCustomsBondNo,
        // 'portTransportMode' : res.locationMasterBean.portTransportMode,
        // 'fpodPortCode': res.locationMasterBean.fpodPortCode,
        // 'haulageType': res.locationMasterBean.haulageType,
        // 'fromDate': res.locationMasterBean.fromDate,
        // 'toDate' : res.locationMasterBean.toDate,
        // 'locationName': res.locationMasterBean.locationName,

     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }

  update(){

    this.locationMaster = this.docForm.value;
    this.locationMasterService.locationUpdate(this.locationMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/location/listLocation']);

  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
      locationCode: [""],
      region: [""],
      country: [""],
      active: [""],

    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}

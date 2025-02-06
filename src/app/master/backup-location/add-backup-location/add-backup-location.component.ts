import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {  MomentDateAdapter } from '@angular/material-moment-adapter';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackupLocation } from '../backup-location.model';
import { BackupLocationService } from '../backup-location.service';
import { HttpErrorResponse } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-backup-location',
  templateUrl: './add-backup-location.component.html',
  styleUrls: ['./add-backup-location.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class AddBackupLocationComponent implements OnInit {

  docForm: FormGroup; 
  proofDtl: any;
  requestId: any;
  edit:boolean=false;
  LocationId: any;
  LocationDdList:[];
  editflag:boolean=false;
  removedIds:any=[];
  backupLocation: BackupLocation;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private backupLocationService: BackupLocationService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl: serverLocations,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService, 
    private spinner: NgxSpinnerService,
    private commonService: CommonService,private cmnService: CommonService,
    private router:Router
  ) { 
    this.docForm = this.fb.group({
      removeId: [""],
      locationId: [""],
      backupName:["",[Validators.required]],
      serverIp:["",[Validators.required,Validators.pattern(
        /^((25[0-5]|(2[0-4][0-9])|(1[0-9][0-9])|([1-9]?[0-9]))\.){3}(25[0-5]|(2[0-4][0-9])|(1[0-9][0-9])|([1-9]?[0-9]))$/
        )]],
      proofDtl: this.fb.array([
        this.fb.group({
          locationListId:[""],
          locationName:["",[Validators.required]],
          location:["",[Validators.required]],
        })
      ])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
        this.requestId = params.id;
        this.edit=true;
        // For User login Editable mode
        this.fetchDetails(this.requestId);
        this.LocationId = this.requestId;
      }
    });
     // Parent Server dropdown
     this.httpService.get<any>(this.commonService.getAssetBackupLocationDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.LocationDdList = data;
      },
      error: (error) => {

      }
    }
    );



    if(this.docForm.value.userCode==''||this.docForm.value.userCode==null){
      this.editflag=true
    }else{
      this.editflag=false;
    }
  }

  fetchDetails(location_id: any){
    this.requestId = location_id;
  this.httpService.get(this.backupLocationService.editbackuplocation + "?location_id=" + location_id).subscribe((res: any) => {

    console.log(location_id);


    this.docForm.patchValue({
     
      'backupName': res.backupLocationBean.backupName,
      'serverIp': res.backupLocationBean.serverIp,
      'proofDtl': res.backupLocationBean.proofDtl,      

   })


   if (res.backupLocationBeanList != null && res.backupLocationBeanList.length > 0) {
    let dtlArray = this.docForm.controls.proofDtl as FormArray;
    dtlArray.clear();
    res.backupLocationBeanList.forEach(element => {
      let dtlArray = this.docForm.controls.proofDtl as FormArray;
      let arraylen = dtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        locationListId: [element.locationListId],
        locationName: [element.locationName],
        location: [element.location]
      })
      dtlArray.insert(arraylen, newUsergroup);
    });
  }

    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
  }

  removeRowSelf(data: any,index) {

    this.removedIds.push(data.value.locationListId);
      let dtlArray = this.docForm.controls.proofDtl as FormArray;
    dtlArray.removeAt(index);
  }

  onAddRow(){
    let dtlArray = this.docForm.controls.proofDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      locationName:["",[Validators.required]],
      location:["",[Validators.required]]
  
    })
    dtlArray.insert(arraylen, newUsergroup);

  }

  reset(){
    if (!this.edit){
      this.docForm = this.fb.group({
        backupName:[""],
        serverIp:[""],
        proofDtl: this.fb.array([
          this.fb.group({
            locationName:["",[Validators.required]],
            location:["",[Validators.required]],
          })
        ])
      })
    }else {
      this.fetchDetails(this.requestId);
    }
  }

  onSubmit():void{
    this.backupLocation = this.docForm.value;
    console.log(this.backupLocation);
    if(this.docForm.valid){
      console.log("Form Submitted:", this.docForm.value);
      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
      this.backupLocation = this.docForm.value;
      console.log(this.backupLocation);
      this.backupLocationService.addBackupLocation(this.backupLocation,this.router,this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
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

  update(){

    this.docForm.patchValue({
      'removeId': this.removedIds.join(',')
  });

    this.docForm.patchValue({
      'locationId': this.LocationId,
    })

    if(this.docForm.valid){
      this.backupLocation = this.docForm.value;
      this.backupLocationService.backupLocationUpdate(this.backupLocation,this.router,this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  onCancel(){
    this.router.navigate(['/master/backup-location/list-backup-location']);
  }

}

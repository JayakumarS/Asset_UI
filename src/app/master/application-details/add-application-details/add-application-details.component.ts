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
import { ApplicationDetails } from '../application-details.model';
import { ApplicationDetailsService } from '../application-details.service';
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
  selector: 'app-add-application-details',
  templateUrl: './add-application-details.component.html',
  styleUrls: ['./add-application-details.component.sass'],
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
export class AddApplicationDetailsComponent implements OnInit {

  docForm: FormGroup; 
  proofDtl: any;
  requestId: any;
  edit:boolean=false;
  ApplicationId: any;
  ApplicationDdList:[];
  editflag:boolean=false;
  removedIds:any=[];
  applicationDetails: ApplicationDetails;

  constructor(private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private applicationDetailsService: ApplicationDetailsService,
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
      applicationId: [""],
      applicationUrl:["",[Validators.required]],
      feCode:["",[Validators.required]],
      beCode:["",[Validators.required]],
      db:["",[Validators.required]],
      repository:["",[Validators.required]],
      proofDtl: this.fb.array([
        this.fb.group({
          applicationListId:[""],
          source:["",[Validators.required]],
          url:["",[Validators.required]],
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
        this.ApplicationId = this.requestId;
      }
    });
     // Parent Server dropdown
     this.httpService.get<any>(this.commonService.getAssetApplicationDetailsDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.ApplicationDdList = data;
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

  fetchDetails(application_id: any){
    this.requestId = application_id;
  this.httpService.get(this.applicationDetailsService.editapplicationdetails + "?application_id=" + application_id).subscribe((res: any) => {

    console.log(application_id);


    this.docForm.patchValue({
     
      'applicationUrl': res.applicationDetailsBean.applicationUrl,
      'feCode': res.applicationDetailsBean.feCode,
      'beCode': res.applicationDetailsBean.beCode,
      'db': res.applicationDetailsBean.db,
      'repository': res.applicationDetailsBean.repository,
      'proofDtl': res.applicationDetailsBean.proofDtl,      

   })


   if (res.applicationDetailsBeanList != null && res.applicationDetailsBeanList.length > 0) {
    let dtlArray = this.docForm.controls.proofDtl as FormArray;
    dtlArray.clear();
    res.applicationDetailsBeanList.forEach(element => {
      let dtlArray = this.docForm.controls.proofDtl as FormArray;
      let arraylen = dtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        applicationListId: [element.applicationListId],
        source: [element.source],
        url: [element.url]
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

    this.removedIds.push(data.value.applicationListId);
      let dtlArray = this.docForm.controls.proofDtl as FormArray;
    dtlArray.removeAt(index);
  }

  onAddRow(){
    let dtlArray = this.docForm.controls.proofDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      source:["",[Validators.required]],
      url:["",[Validators.required]]
  
    })
    dtlArray.insert(arraylen, newUsergroup);

  }

  reset(){
    if (!this.edit){
      this.docForm = this.fb.group({
        applicationUrl:[""],
        feCode:[""],
        beCode:[""],
        db:[""],
        repository:[""],
        proofDtl: this.fb.array([
          this.fb.group({
            source:["",[Validators.required]],
            url:["",[Validators.required]],
          })
        ])
      })
    }else {
      this.fetchDetails(this.requestId);
    }
  }

  onSubmit():void{
    this.applicationDetails = this.docForm.value;
    console.log(this.applicationDetails);
    if(this.docForm.valid){
      console.log("Form Submitted:", this.docForm.value);
      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
      this.applicationDetails = this.docForm.value;
      console.log(this.applicationDetails);
      this.applicationDetailsService.addApplicationDetails(this.applicationDetails,this.router,this.notificationService);
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
      'applicationId': this.ApplicationId,
    })

    if(this.docForm.valid){
      this.applicationDetails = this.docForm.value;
      this.applicationDetailsService.applicationDetailsUpdate(this.applicationDetails,this.router,this.notificationService);
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
    this.router.navigate(['/master/application-details/list-application-details']);
  }


}

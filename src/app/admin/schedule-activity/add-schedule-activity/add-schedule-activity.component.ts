import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ScheduleResultBean } from '../schedule-activity-resultbean';
import { ScheduleActivityService } from '../schedule-activity.service';
import { ScheduleActivityMaster } from '../schedule-acvtivity.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-add-schedule-activity',
  templateUrl: './add-schedule-activity.component.html',
  styleUrls: ['./add-schedule-activity.component.sass'],
  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
      },
  } },CommonService
  ]
})
export class AddScheduleActivityComponent implements OnInit {
  [x: string]: any;
  docForm: FormGroup;
  scheduleActivityMaster:ScheduleActivityMaster;
  locationList:[];
  activityList:[];

  constructor(private fb: FormBuilder,
    public scheduleActivityService:ScheduleActivityService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    private commonService: CommonService,
    public route: ActivatedRoute,) 
    {
    this.docForm = this.fb.group({
      activityType:[""],
      location:["",[Validators.required]],
      userGroup:["",[Validators.required]],
      description:["",[Validators.required]],
      assignee:["",[Validators.required]],
      attachFiles:["",[Validators.required]],
      occurs:["",[Validators.required]], 
      startdate:[""],
      startdateObj:[""],
      enddate:[""],
      enddateObj:[""],
      activityReminders:["",[Validators.required]],
      cc:[""],
      scheduleId:[""]
    });
  }
  

//  ngOnInit(): void {p

//   this.docForm= this.fb.group({
//     ActivityType:[''],
//     Location:[''],
//     UserGroup:[''],
//     Description:[''],
//     Assignee:[''],
//     AttachFiles:[''],
//     Occurs:[''],
//     StartDate:[''],
//     EndDate:[''],
//     ActivityReminders:[''],
//     CC:['']
//   })
// }

  submit() 
  {
    this.scheduleActivityMaster = this.docForm.value;
    console.log(this.scheduleActivityMaster);
    if(this.docForm.valid){
      this.scheduleActivityService.addSchedule(this.scheduleActivityMaster);
    //this.scheduleActivityService.addSchedule(this.scheduleActivityMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/admin/scheduler/list-schedule-activity']);

  }
}

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
  }


 ngOnInit(): void {


  this.docForm = this.fb.group({
    activityType:["",[Validators.required]],
    location:["",[Validators.required]],
    userGroup:["",[Validators.required]],
    description:["",[Validators.required]],
    assignee:["",[Validators.required]],
    attachFiles:["",[Validators.required]],
    occurs:["",[Validators.required]],
    startdate:[""],
    startdateObj:[""],
    enddate:[""],
    enddateObj:[""],
    activityReminders:["",[Validators.required]],
    cc:[""],
    scheduleId:[""]
  });
  this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
    next: (data) => {
      this.locationList = data;
    },
    error: (error) => {

    }
  }
  );
 
  this.httpService.get<any>(this.commonService.getactivityList).subscribe({
    next: (data) => {
      this.activityList = data;
    },
    error: (error) => {

    }
  }
  );
  
  this.route.params.subscribe(params => {
   if(params.id!=undefined && params.id!=0){
    this.requestId = params.id;
    this.edit=true;
    this.fetchDetails(this.requestId) ;

   }
  });


}



  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  fetchDetails(id: any): void {
    this.httpService.get(this.scheduleActivityService.editScheduleMaster+"?scheduleMaster="+id).subscribe((res: any)=> {
      console.log(id);
      let hdate = this.cmnService.getDateObj(res.scheduleMasterBean.startdate);
      this.activityList;
      let edate = this.cmnService.getDateObj(res.scheduleMasterBean.enddate);

     // let loacationtext = this.locationList.some(({locationList:id }) => id === res.scheduleMasterBean.location);
      
      this.docForm.patchValue({
        
        'activityType': res.scheduleMasterBean.activityType,
        'location': parseInt(res.scheduleMasterBean.location),
        'userGroup': res.scheduleMasterBean.userGroup,
        'description': res.scheduleMasterBean.description,
        'assignee' : res.scheduleMasterBean.assignee,
        'attachFiles' : res.scheduleMasterBean.attachFiles,
        'occurs' : res.scheduleMasterBean.occurs.replace(/\s/g,''),
        'startdateObj' :hdate,
        'startdate' : res.scheduleMasterBean.startdate,
        'enddate' : res.scheduleMasterBean.enddate,
        'enddateObj' : edate,
        'activityReminders' : res.scheduleMasterBean.activityReminders.replace(/\s/g,''),
        'cc' : res.scheduleMasterBean.cc,
        'scheduleId' : id
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

    this.scheduleActivityMaster = this.docForm.value;
    this.scheduleActivityService.scheduleUpdate(this.scheduleActivityMaster,this.router,this.notificationService);
    this.router.navigate(['/admin/scheduler/list-schedule-activity']);

  }

  onCancel(){
    this.router.navigate(['/admin/scheduler/list-schedule-activity']);
   }

   reset(){this.docForm = this.fb.group({
    activityType: [""],
    location: [""],
    userGroup: [""],
    description: [""],
    assignee: [""],
    attachFiles: [""],
    occurs: [""],
    startDate: [""],
    endDate: [""],
    activityReminders: [""],
    cc: [""],
    
  });}
  

  
}

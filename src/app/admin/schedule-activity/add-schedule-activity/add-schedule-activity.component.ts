import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ScheduleActivityService } from '../schedule-activity.service';
import { ScheduleActivityMaster } from '../schedule-acvtivity.model';

@Component({
  selector: 'app-add-schedule-activity',
  templateUrl: './add-schedule-activity.component.html',
  styleUrls: ['./add-schedule-activity.component.sass']
})
export class AddScheduleActivityComponent implements OnInit {
  scheduleActivityMaster:ScheduleActivityMaster;
  docForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private scheduleActivityService: ScheduleActivityService,
    private httpService: HttpServiceService) 
    {
    this.docForm = this.fb.group({
      ActivityType:[""],
      Location:["",[Validators.required]],
      UserGroup:["",[Validators.required]],
      Description:["",[Validators.required]],
      Assignee:["",[Validators.required]],
      AttachFiles:["",[Validators.required]],
      Occurs:["",[Validators.required]],
      StartDate:["",[Validators.required]],
      EndDate:["",[Validators.required]],
      ActivityReminders:["",[Validators.required]],
      CC:[""]
    });
  }
  

 ngOnInit(): void {

  this.docForm= this.fb.group({
    ActivityType:[''],
    Location:[''],
    UserGroup:[''],
    Description:[''],
    Assignee:[''],
    AttachFiles:[''],
    Occurs:[''],
    StartDate:[''],
    EndDate:[''],
    ActivityReminders:[''],
    CC:['']
  })
}

  submit()
  {this.scheduleActivityMaster = this.docForm.value;
    console.log(this.scheduleActivityMaster);
    this.scheduleActivityService.addScheduleActivity(this.scheduleActivityMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  Update()
  {

  }

  Cancel()
  {

  }

  Reset()
  {

  }

  
}

import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { FormBuilder } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatDialog } from '@angular/material/dialog';
  

import { PrePlanCalendarService } from '../pre-plan-calendar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateClickComponent } from './date-click/date-click.component';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-pre-plan-calendar-list',
  templateUrl: './pre-plan-calendar-list.component.html',
  styleUrls: ['./pre-plan-calendar-list.component.scss']
})
export class PrePlanCalendarListComponent implements OnInit {
  UserId: string;

  @Output() emitService  = new EventEmitter<string>();
  Events: any[] = [];

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  eventId: any;
  titleValue: any;
  dialogRef: any;


  constructor(private fb: FormBuilder,public router:Router,private notificationService: NotificationService,
    private httpService: HttpServiceService,public tokenStorage: TokenStorageService, public route: ActivatedRoute,public dialog: MatDialog,public prePlanCalendarService:PrePlanCalendarService) { 
    }

    handleCalendarToggle() {
      this.calendarVisible = !this.calendarVisible;
    }
  
    handleWeekendsToggle() {
      const { calendarOptions } = this;
      calendarOptions.weekends = !calendarOptions.weekends;
    }
  
    handleDateSelect(selectInfo: DateSelectArg) {
      let tempDirection;
      let detailData; 
      let isEdit;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    this.httpService.get(this.prePlanCalendarService.getEventId).subscribe((res: any)=> {
      //.eventId || res.prePlan.eventId==undefined
      if(res.prePlan==null){
        this.eventId=1;
        } else {
     this.eventId=res.prePlan.eventId;
        }

  // var start=selectInfo.startStr;
  // var end=selectInfo.endStr;
  // var allDay=selectInfo.allDay;
  // var eventId=this.eventId;

  // window.sessionStorage.setItem("Open", "true");
  // const dialogRef = this.dialog.open(DateClickComponent, {
  //   height: "415px",
  //   width: "900px",
  //   data: {start,end,allDay,eventId},
  //   direction: tempDirection
  // });
  },
  (err: HttpErrorResponse) => {
    // error code here
  });

setTimeout(() => {
  var start=selectInfo.startStr;
  var end=selectInfo.endStr;
  var allDay=selectInfo.allDay;
  var eventId=this.eventId;
  let val=window.sessionStorage.getItem("Open");
   if(val=='true') {
   window.sessionStorage.setItem("Open", "false");
  const dialogRef = this.dialog.open(DateClickComponent, {
    height: "415px",
    width: "900px",
    data: {start,end,allDay,eventId},
    direction: tempDirection
  });
}   
}, 700);

  this.httpService.get(this.prePlanCalendarService.getEventById+"?eventId"+this.eventId).subscribe((res: any)=> {
    this.titleValue=res.userName;

 //const title = prompt('Please enter a new title for your event');
 const title=this.titleValue;
 const calendarApi = selectInfo.view.calendar;

 calendarApi.unselect(); // clear date selection

 if (title) {
   calendarApi.addEvent({
     id: createEventId(),
     title,
     start: selectInfo.startStr,
     end: selectInfo.endStr,
     allDay: selectInfo.allDay 
   });
 }


  },
  (err: HttpErrorResponse) => {
    // error code here
  });

   
  }

  handleEventClick(clickInfo: EventClickArg) {

    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }

    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }

  var startEdit=clickInfo.event.startStr;
  var endEdit=clickInfo.event.endStr;
  var title=clickInfo.event.title;
  var isEdit=true;
 // var eventId=this.eventId;

  const dialogRef = this.dialog.open(DateClickComponent, {
    height: "415px",
    width: "900px",
    data: {startEdit,endEdit,title,isEdit},
    direction: tempDirection
  });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents =events;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.UserId=this.tokenStorage.getUserId();
      this.httpService.get(this.prePlanCalendarService.getAllEvents+"?UserId="+this.UserId).subscribe((res: any)=> {
        this.Events.push(res.listBean);

        this.calendarOptions = {
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            //right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          initialView: 'dayGridMonth',
          initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
          weekends: true,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          select: this.handleDateSelect.bind(this),
          eventClick: this.handleEventClick.bind(this),
          eventsSet: this.handleEvents.bind(this),
          events: this.Events[0],
        };
      },
      (err: HttpErrorResponse) => {
        // error code here
      });
    }, 2200);
    // setTimeout(() => {
    //   this.calendarOptions = {
    //     headerToolbar: {
    //       left: 'prev,next today',
    //       center: 'title',
    //       right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    //     },
    //     initialView: 'dayGridMonth',
    //     // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    //     weekends: true,
    //     editable: true,
    //     selectable: true,
    //     selectMirror: true,
    //     dayMaxEvents: true,
    //     select: this.handleDateSelect.bind(this),
    //     eventClick: this.handleEventClick.bind(this),
    //     eventsSet: this.handleEvents.bind(this),
    //     events: this.Events,
    //   };
    // }, 2500);

    window.sessionStorage.setItem("Open", "true");

  }

}














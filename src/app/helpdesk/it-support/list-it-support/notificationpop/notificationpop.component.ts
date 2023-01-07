import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ItSupportresultbean } from '../../it-support-result-bean';
import { Itsupportservice } from '../../it-support.service';

@Component({
  selector: 'app-notificationpop',
  templateUrl: './notificationpop.component.html',
  styleUrls: ['./notificationpop.component.sass']
})
export class NotificationpopComponent implements OnInit {
  closeCountValue: any;
  AssignedCountValue: any;
  OpenedCountValue: any;
  HoldCountValue: any;
  constructor(
   private itsupportservice:Itsupportservice,
   public httpClient: HttpClient,
   private httpService:HttpServiceService
   
  ) { }

  ngOnInit(): void {


    this.httpService.get<ItSupportresultbean>(this.itsupportservice.closedListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.closeCountValue = data.closedListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<ItSupportresultbean>(this.itsupportservice.openListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.OpenedCountValue = data.openedListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }

    );
    this.httpService.get<ItSupportresultbean>(this.itsupportservice.holdListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.HoldCountValue = data.holdListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<ItSupportresultbean>(this.itsupportservice.AssignedListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.AssignedCountValue = data.assignedListCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

}

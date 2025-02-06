

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ApplicationDetailsService } from '../application-details.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';


@Component({
  selector: 'app-view-application-details',
  templateUrl: './view-application-details.component.html',
  styleUrls: ['./view-application-details.component.sass']
})
export class ViewApplicationDetailsComponent implements OnInit {

  requestId: any;
  viewDtl: any;
  applicationDetailList: any = [];


  constructor(
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    private httpService : HttpServiceService,
    public dialog: MatDialog,
    public applicationDetailsService: ApplicationDetailsService,
    public tokenStorage: TokenStorageService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id !== undefined && params.id !== 0) {
        this.requestId = params.id;
        this.fetchDetails(this.requestId);
      }
    });
  }

  fetchDetails(applicationId: any): void {
    this.httpService.get<any>(`${this.applicationDetailsService.editapplicationdetails}?application_id=${applicationId}`).subscribe({
      next: (res: any) => {
        this.viewDtl = res.applicationDetailsBean;
        this.applicationDetailList = res.applicationDetailsBeanList;
      },
      error: (err) => console.log(err)
    });
  }

  back(){
    this.router.navigate(['/master/application-details/list-application-details']);
  }

}
